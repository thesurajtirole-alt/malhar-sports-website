import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json([], { status: 200 });
  }

  const { data, error } = await supabase
    .from("academies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const body = await req.json();
  const { name, type, sport, area, note, is_verified } = body;

  if (!name || !type) {
    return NextResponse.json(
      { error: "Name and type required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("academies")
    .insert({
      name,
      type,
      sport: sport ?? [],
      area: area ?? null,
      note: note ?? null,
      is_verified: is_verified ?? false,
      is_active: true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
