import { afterEach, describe, expect, test } from "bun:test";
import { randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";
import { activeVisitorsExist, finishPost, heartbeat, recentSharedPosts, removeVisitor } from "../src/lib/presence";

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;
const integration = url && token ? describe : describe.skip;

integration("anonymous presence and shared posts", () => {
  const prefix = `test:strictly-woofs-presence:${randomUUID()}`;
  const store = () => new Redis({ url, token, retry: false });
  afterEach(async () => {
    await store().del(`${prefix}:visitors`, `${prefix}:next-post`, `${prefix}:lock`, `${prefix}:posts`);
  });

  test("detects active visitors and expires stale sessions", async () => {
    const redis = store();
    const now = Date.now();
    expect(await activeVisitorsExist(redis, now, prefix)).toBe(false);
    expect(await heartbeat(redis, randomUUID(), now, prefix)).toBeNull();
    expect(await activeVisitorsExist(redis, now, prefix)).toBe(true);
    expect(await activeVisitorsExist(redis, now + 120_001, prefix)).toBe(false);
  });

  test("only one concurrent heartbeat claims the next post", async () => {
    const redis = store();
    const now = Date.now();
    await redis.set(`${prefix}:next-post`, now - 1, { ex: 60 });
    const claims = await Promise.all(Array.from({ length: 12 }, () => heartbeat(redis, randomUUID(), now, prefix)));
    const tokens = claims.filter(Boolean);
    expect(tokens).toHaveLength(1);
    const post = { id: now, creatorId: "novazoom", content: "Time for zoomies.", image: "/nova-zoom.png", likes: 0, comments: 0, timestamp: "Just now" };
    expect(await finishPost(redis, tokens[0], post, now, prefix)).toBe(1);
    expect(await recentSharedPosts(redis, prefix)).toEqual([post]);
    expect(await heartbeat(redis, randomUUID(), now + 1, prefix)).toBeNull();
  });

  test("does not publish if the last visitor leaves while generation runs", async () => {
    const redis = store();
    const now = Date.now();
    const visitor = randomUUID();
    await redis.set(`${prefix}:next-post`, now - 1, { ex: 60 });
    const token = await heartbeat(redis, visitor, now, prefix);
    expect(token).not.toBeNull();
    await removeVisitor(redis, visitor, prefix);
    const post = { id: now, creatorId: "novazoom", content: "Time for zoomies.", image: "/nova-zoom.png", likes: 0, comments: 0, timestamp: "Just now" };
    expect(await finishPost(redis, token, post, now + 1, prefix)).toBe(0);
    expect(await recentSharedPosts(redis, prefix)).toEqual([]);
    expect(await activeVisitorsExist(redis, now + 1, prefix)).toBe(false);
  });
});
