import { afterAll, beforeEach, expect, mock, test } from "bun:test";

let limitResult = { allowed: true, retryAfter: 1 };
let storeUnavailable = false;
let upstreamCalls = 0;
const originalFetch = globalThis.fetch;
const originalKey = process.env.OPENAI_API_KEY;

mock.module("@/lib/creatorRateLimit", () => ({
  creatorRateLimitStore: () => ({}),
  checkCreatorRateLimit: async () => {
    if (storeUnavailable) throw new Error("store unavailable");
    return limitResult;
  },
}));

const { POST } = await import("../src/app/api/creator/route");

function request(body) {
  return new Request("http://localhost:3000/api/creator/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  process.env.OPENAI_API_KEY = "test-key";
  limitResult = { allowed: true, retryAfter: 1 };
  storeUnavailable = false;
  upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls++;
    return Response.json({ output: [{ content: [{ type: "output_text", text: "Hello!" }] }] });
  };
});

afterAll(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
  else process.env.OPENAI_API_KEY = originalKey;
  mock.restore();
});

const validBody = { creatorId: "tankthicc", mode: "chat", messages: [{ role: "user", content: "Hello" }] };

test("allowed requests reach the model", async () => {
  const response = await POST(request(validBody));
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ text: "Hello!" });
  expect(upstreamCalls).toBe(1);
});

test("rate-limited requests return Retry-After without calling the model", async () => {
  limitResult = { allowed: false, retryAfter: 42 };
  const response = await POST(request(validBody));
  expect(response.status).toBe(429);
  expect(response.headers.get("Retry-After")).toBe("42");
  expect(upstreamCalls).toBe(0);
});

test("unavailable storage fails closed without calling the model", async () => {
  storeUnavailable = true;
  const response = await POST(request(validBody));
  expect(response.status).toBe(503);
  expect(upstreamCalls).toBe(0);
});

test("invalid requests are rejected before calling the model", async () => {
  const response = await POST(request({ ...validBody, creatorId: "does-not-exist" }));
  expect(response.status).toBe(400);
  expect(upstreamCalls).toBe(0);
});
