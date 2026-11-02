import { randomUUID } from "node:crypto";
import type { Redis } from "@upstash/redis";
import type { Post } from "@/lib/mockData";

export const PRESENCE_TTL_SECONDS = 120;
export const HEARTBEAT_INTERVAL_MS = 40_000;
const POST_RETENTION_SECONDS = 7 * 24 * 60 * 60;
const MAX_SHARED_POSTS = 30;

export function presencePrefix() {
  return `strictly-woofs:presence:v1:${process.env.VERCEL_ENV || process.env.NODE_ENV || "development"}`;
}

// The schedule and lock live in Redis so simultaneous visitors cannot create duplicate posts.
const HEARTBEAT = `
redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', ARGV[1])
redis.call('ZADD', KEYS[1], ARGV[2], ARGV[3])
redis.call('EXPIRE', KEYS[1], ARGV[4])
redis.call('SET', KEYS[2], ARGV[5], 'NX', 'EX', 86400)
local due = tonumber(redis.call('GET', KEYS[2]))
if due <= tonumber(ARGV[1]) and redis.call('SET', KEYS[3], ARGV[6], 'NX', 'EX', 60) then return 1 end
return 0
`;

const FINISH = `
if redis.call('GET', KEYS[3]) ~= ARGV[1] then return 0 end
redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', ARGV[2])
local published = 0
if ARGV[3] ~= '' and redis.call('ZCARD', KEYS[1]) > 0 then
  redis.call('LPUSH', KEYS[4], ARGV[3])
  redis.call('LTRIM', KEYS[4], 0, tonumber(ARGV[4]) - 1)
  redis.call('EXPIRE', KEYS[4], tonumber(ARGV[5]))
  published = 1
end
redis.call('SET', KEYS[2], ARGV[6], 'EX', 86400)
redis.call('DEL', KEYS[3])
return published
`;

function keys(prefix: string) {
  return [`${prefix}:visitors`, `${prefix}:next-post`, `${prefix}:lock`, `${prefix}:posts`];
}

export async function heartbeat(redis: Redis, visitorId: string, now = Date.now(), prefix = presencePrefix()) {
  const token = randomUUID();
  const result = await redis.eval<(string | number)[], number>(HEARTBEAT, keys(prefix).slice(0, 3), [
    now, now + PRESENCE_TTL_SECONDS * 1000, visitorId, PRESENCE_TTL_SECONDS + 60,
    now + 60_000 + Math.floor(Math.random() * 60_000), token,
  ]);
  return result === 1 ? token : null;
}

export async function finishPost(redis: Redis, token: string, post: Post | null, now = Date.now(), prefix = presencePrefix()) {
  const nextPost = now + (post ? 180_000 + Math.floor(Math.random() * 240_000) : 300_000);
  return redis.eval<(string | number)[], number>(FINISH, keys(prefix), [
    token, now, post ? JSON.stringify(post) : "", MAX_SHARED_POSTS, POST_RETENTION_SECONDS, nextPost,
  ]);
}

export async function activeVisitorsExist(redis: Redis, now = Date.now(), prefix = presencePrefix()) {
  const result = await redis.eval<number[], number>(
    "return redis.call('ZCOUNT', KEYS[1], '(' .. ARGV[1], '+inf')",
    [keys(prefix)[0]], [now],
  );
  return result > 0;
}

export async function removeVisitor(redis: Redis, visitorId: string, prefix = presencePrefix()) {
  await redis.zrem(keys(prefix)[0], visitorId);
}

export async function recentSharedPosts(redis: Redis, prefix = presencePrefix()) {
  const values = await redis.lrange<Post>(keys(prefix)[3], 0, MAX_SHARED_POSTS - 1);
  return values.filter((post) => post && typeof post.id === "number" && typeof post.content === "string" && typeof post.creatorId === "string");
}
