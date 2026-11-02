import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

export const CREATOR_RATE_LIMITS = { perMinute: 15, perDay: 500 } as const;

// Check and increment both counters in a single Redis operation across all instances.
const SCRIPT = `
local userCount = tonumber(redis.call('GET', KEYS[1]) or '0')
local dailyCount = tonumber(redis.call('GET', KEYS[2]) or '0')
if userCount >= tonumber(ARGV[1]) then return {0, tonumber(ARGV[3])} end
if dailyCount >= tonumber(ARGV[2]) then return {0, tonumber(ARGV[4])} end
if redis.call('INCR', KEYS[1]) == 1 then redis.call('EXPIRE', KEYS[1], tonumber(ARGV[5])) end
if redis.call('INCR', KEYS[2]) == 1 then redis.call('EXPIRE', KEYS[2], tonumber(ARGV[6])) end
return {1, 0}
`;

export async function checkCreatorRateLimit(
  redis: Redis,
  client: string,
  now = Date.now(),
  limits: { perMinute: number; perDay: number } = CREATOR_RATE_LIMITS,
  prefix = "creator-limit:v1",
) {
  const minute = Math.floor(now / 60_000);
  const day = Math.floor(now / 86_400_000);
  const minuteRetry = Math.max(1, Math.ceil(((minute + 1) * 60_000 - now) / 1000));
  const dayRetry = Math.max(1, Math.ceil(((day + 1) * 86_400_000 - now) / 1000));
  const clientHash = createHash("sha256").update(client).digest("hex");
  const result = await redis.eval<number[], [number, number]>(
    SCRIPT,
    [`${prefix}:minute:${minute}:${clientHash}`, `${prefix}:day:${day}`],
    [limits.perMinute, limits.perDay, minuteRetry, dayRetry, minuteRetry + 60, dayRetry + 60],
  );
  if (!Array.isArray(result) || result.length !== 2 || ![0, 1].includes(Number(result[0]))) {
    throw new Error("Invalid rate limiter response");
  }
  return { allowed: Number(result[0]) === 1, retryAfter: Math.max(1, Number(result[1]) || 1) };
}

export function creatorRateLimitStore() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Shared rate limit store is not configured");
  return new Redis({ url, token, signal: () => AbortSignal.timeout(3000), retry: false });
}
