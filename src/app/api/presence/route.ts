import { NextResponse } from "next/server";
import { creators, type Post } from "@/lib/mockData";
import { generateCreatorText } from "@/lib/creatorAI";
import { checkCreatorRateLimit, creatorRateLimitStore } from "@/lib/creatorRateLimit";
import { activeVisitorsExist, finishPost, heartbeat, recentSharedPosts, removeVisitor } from "@/lib/presence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (value: unknown, status = 200) => NextResponse.json(value, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  try {
    return json({ active: await activeVisitorsExist(creatorRateLimitStore()) });
  } catch {
    return json({ error: "Presence is temporarily unavailable." }, 503);
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  try {
    if (origin && new URL(origin).host !== request.headers.get("host")) return json({ error: "Invalid request origin." }, 403);
  } catch {
    return json({ error: "Invalid request origin." }, 403);
  }
  let input: { visitorId?: unknown; action?: unknown };
  try {
    const body = await request.text();
    if (body.length > 512) throw new Error("Request too large");
    input = JSON.parse(body);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  if (!input || typeof input.visitorId !== "string" || !/^[a-f0-9-]{36}$/i.test(input.visitorId) || !["heartbeat", "leave"].includes(String(input.action))) {
    return json({ error: "Invalid request." }, 400);
  }
  try {
    const redis = creatorRateLimitStore();
    if (input.action === "leave") {
      await removeVisitor(redis, input.visitorId);
      return json({ ok: true });
    }
    const lock = await heartbeat(redis, input.visitorId);
    if (lock) {
      let post: Post | null = null;
      try {
        if (process.env.OPENAI_API_KEY && await activeVisitorsExist(redis)) {
          const budget = await checkCreatorRateLimit(redis, "automated-creator-posts");
          if (budget.allowed) {
            const creator = creators[Math.floor(Math.random() * creators.length)];
            const content = await generateCreatorText(creator, "post");
            post = {
              id: Date.now(), creatorId: creator.id, content, image: creator.gallery[0],
              likes: 0, comments: 0, timestamp: "Just now", createdAt: new Date().toISOString(),
            };
          }
        }
      } catch {
        // A failed generation is retried on a later heartbeat, not spun in a loop.
      }
      await finishPost(redis, lock, post);
    }
    return json({ active: true, posts: await recentSharedPosts(redis) });
  } catch {
    return json({ error: "Presence is temporarily unavailable." }, 503);
  }
}
