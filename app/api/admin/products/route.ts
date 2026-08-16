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
    .from("products")
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
  const { name, description, category, price, image_url } = body;

  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      description: description ?? null,
      category: category ?? null,
      price: price ?? null,
      image_url: image_url ?? null,
      is_active: true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
