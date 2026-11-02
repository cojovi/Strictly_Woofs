import { describe, expect, test } from "bun:test";
import { randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";
import { checkCreatorRateLimit } from "../src/lib/creatorRateLimit";

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;
const integration = url && token ? describe : describe.skip;

integration("shared creator rate limit", () => {
  const store = () => new Redis({ url, token, retry: false });

  test("concurrent requests cannot exceed a visitor's limit", async () => {
    const prefix = `test:strictly-woofs:${randomUUID()}`;
    const now = Date.now();
    const redis = store();
    const results = await Promise.all(Array.from({ length: 15 }, () =>
      checkCreatorRateLimit(redis, "same-visitor", now, { perMinute: 5, perDay: 50 }, prefix),
    ));
    expect(results.filter((result) => result.allowed)).toHaveLength(5);
    expect(results.filter((result) => !result.allowed)).toHaveLength(10);
    expect(results.find((result) => !result.allowed).retryAfter).toBeGreaterThan(0);
  });

  test("the daily budget is shared across different visitors", async () => {
    const prefix = `test:strictly-woofs:${randomUUID()}`;
    const now = Date.now();
    const redis = store();
    const results = await Promise.all(Array.from({ length: 10 }, (_, index) =>
      checkCreatorRateLimit(redis, `visitor-${index}`, now, { perMinute: 5, perDay: 3 }, prefix),
    ));
    expect(results.filter((result) => result.allowed)).toHaveLength(3);
    expect(results.filter((result) => !result.allowed)).toHaveLength(7);
  });
});
