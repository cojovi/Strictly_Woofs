import { NextResponse } from "next/server";
import { getCreator } from "@/lib/mockData";
import { checkCreatorRateLimit, creatorRateLimitStore } from "@/lib/creatorRateLimit";
import { generateCreatorText } from "@/lib/creatorAI";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "AI replies are not configured yet." }, { status: 503 });
  }
  let body: { creatorId?: unknown; mode?: unknown; messages?: unknown };
  try {
    if (Number(request.headers.get("content-length")) > 12000) throw new Error("Request too large");
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const creator = typeof body.creatorId === "string" ? getCreator(body.creatorId) : undefined;
  const mode = body.mode === "post" ? "post" : body.mode === "chat" ? "chat" : null;
  if (!creator || !mode || (mode === "chat" && !Array.isArray(body.messages))) {
    return NextResponse.json({ error: "Invalid creator or message." }, { status: 400 });
  }
  const messages = Array.isArray(body.messages) ? body.messages.slice(-12).flatMap((item: unknown) => {
    if (!item || typeof item !== "object") return [];
    const message = item as { role?: unknown; content?: unknown };
    if ((message.role !== "user" && message.role !== "assistant") || typeof message.content !== "string") return [];
    return [{ role: message.role, content: message.content.slice(0, 1000) }];
  }) : [];
  if (mode === "chat" && (!messages.length || messages[messages.length - 1].role !== "user")) {
    return NextResponse.json({ error: "A message is required." }, { status: 400 });
  }
  const client = process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    : "local-development";
  if (!client) return NextResponse.json({ error: "Unable to verify the request." }, { status: 503 });
  try {
    const limit = await checkCreatorRateLimit(creatorRateLimitStore(), client);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "The creators are taking a break. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter), "Cache-Control": "no-store" } },
      );
    }
  } catch {
    return NextResponse.json({ error: "Creator replies are temporarily unavailable. Please try again later." }, { status: 503 });
  }
  try {
    const text = await generateCreatorText(creator, mode, messages as { role: "user" | "assistant"; content: string }[]);
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "The creator is taking a break. Try again shortly." }, { status: 502 });
  }
}
