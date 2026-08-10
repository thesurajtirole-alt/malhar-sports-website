import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { auth } from "@/auth";

// Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel's
// Environment Variables (free tier: Vercel dashboard → Storage → create
// a Redis database via the Marketplace, or upstash.com directly).
// Without these, GET returns null and POST reports persisted:false —
// the site keeps working, it just can't sync streaks across devices.
const hasRedisConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const redis = hasRedisConfig
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

function getUserId(session: { user?: { id?: string; email?: string | null } } | null) {
  return session?.user?.id ?? session?.user?.email ?? null;
}

export async function GET() {
  const session = await auth();
  const userId = getUserId(session);
  if (!userId) return NextResponse.json(null, { status: 401 });
  if (!redis) return NextResponse.json(null);

  try {
    const data = await redis.get(`streak:${userId}`);
    return NextResponse.json(data ?? null);
  } catch {
    return NextResponse.json(null);
  }
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = getUserId(session);
  if (!userId) return NextResponse.json({ ok: false }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!redis) return NextResponse.json({ ok: true, persisted: false });

  try {
    await redis.set(`streak:${userId}`, body);
    return NextResponse.json({ ok: true, persisted: true });
  } catch {
    return NextResponse.json({ ok: true, persisted: false });
  }
}
