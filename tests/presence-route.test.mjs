import { afterAll, beforeEach, expect, mock, test } from "bun:test";
import { randomUUID } from "node:crypto";

let active = false;
let claim = null;
let budgetAllowed = true;
let generations = 0;
let completedPost = undefined;
let removed = false;
const originalKey = process.env.OPENAI_API_KEY;

mock.module("@/lib/creatorRateLimit", () => ({
  creatorRateLimitStore: () => ({}),
  checkCreatorRateLimit: async () => ({ allowed: budgetAllowed, retryAfter: 1 }),
}));
mock.module("@/lib/creatorAI", () => ({
  generateCreatorText: async () => { generations++; return "A freshly generated update."; },
}));
mock.module("@/lib/presence", () => ({
  activeVisitorsExist: async () => active,
  heartbeat: async () => claim,
  finishPost: async (_redis, _token, post) => { completedPost = post; },
  recentSharedPosts: async () => [],
  removeVisitor: async () => { removed = true; },
}));

const { GET, POST } = await import("../src/app/api/presence/route");
const visitorId = randomUUID();
const request = (action, id = visitorId) => new Request("http://localhost:3000/api/presence/", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitorId: id, action }),
});

beforeEach(() => {
  process.env.OPENAI_API_KEY = "test-key";
  active = false; claim = null; budgetAllowed = true; generations = 0; completedPost = undefined; removed = false;
});
afterAll(() => {
  if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
  else process.env.OPENAI_API_KEY = originalKey;
  mock.restore();
});

test("status reports zero active visitors without generating", async () => {
  expect(await (await GET()).json()).toEqual({ active: false });
  expect(generations).toBe(0);
});

test("a claimed heartbeat generates a shared post when a visitor is present", async () => {
  active = true; claim = "lock-token";
  const response = await POST(request("heartbeat"));
  expect(response.status).toBe(200);
  expect(generations).toBe(1);
  expect(completedPost.content).toBe("A freshly generated update.");
});

test("a visitor leaving or a full AI budget prevents generation", async () => {
  claim = "lock-token";
  await POST(request("heartbeat"));
  expect(generations).toBe(0);
  expect(completedPost).toBeNull();
  active = true; budgetAllowed = false;
  await POST(request("heartbeat"));
  expect(generations).toBe(0);
});

test("a leave removes the visitor and invalid identifiers are rejected", async () => {
  expect((await POST(request("leave"))).status).toBe(200);
  expect(removed).toBe(true);
  expect((await POST(request("heartbeat", "not-a-uuid"))).status).toBe(400);
});
