import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { auth } from "@/auth";

function getUserId(
  session: { user?: { id?: string; email?: string | null } } | null
) {
  return session?.user?.id ?? session?.user?.email ?? null;
}

export async function GET() {
  const session = await auth();
  const userId = getUserId(session);
  if (!userId) return NextResponse.json(null, { status: 401 });
  if (!isSupabaseConfigured() || !supabase) return NextResponse.json(null);

  try {
    const { data, error } = await supabase
      .from("user_streaks")
      .select("points, badges, streak_count, streak_last_date")
      .eq("user_id", userId)
      .maybeSingle();

    if (error || !data) return NextResponse.json(null);

    return NextResponse.json({
      points: data.points,
      badges: data.badges,
      streak: {
        count: data.streak_count,
        lastDate: data.streak_last_date,
      },
    });
  } catch {
    return NextResponse.json(null);
  }
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = getUserId(session);
  if (!userId) return NextResponse.json({ ok: false }, { status: 401 });

  let body: {
    points?: number;
    badges?: string[];
    streak?: { count: number; lastDate: string | null };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const { error } = await supabase.from("user_streaks").upsert({
      user_id: userId,
      points: body.points ?? 0,
      badges: body.badges ?? [],
      streak_count: body.streak?.count ?? 0,
      streak_last_date: body.streak?.lastDate ?? null,
      updated_at: new Date().toISOString(),
    });

    if (error) return NextResponse.json({ ok: true, persisted: false });
    return NextResponse.json({ ok: true, persisted: true });
  } catch {
    return NextResponse.json({ ok: true, persisted: false });
  }
}
