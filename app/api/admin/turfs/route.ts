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
    .from("turfs")
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
  const {
    name,
    address,
    area,
    contact_phone,
    sport_types,
    price_per_hour,
    opening_time,
    closing_time,
    slot_duration_minutes,
    image_url,
    owner_email,
    owner_phone,
  } = body;

  if (!name || !address || !contact_phone || !price_per_hour) {
    return NextResponse.json(
      { error: "Name, address, contact phone, and price required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("turfs")
    .insert({
      name,
      address,
      area: area ?? null,
      contact_phone,
      sport_types: sport_types ?? [],
      price_per_hour,
      opening_time: opening_time ?? "06:00",
      closing_time: closing_time ?? "23:00",
      slot_duration_minutes: slot_duration_minutes ?? 60,
      image_url: image_url ?? null,
      owner_email: owner_email ? owner_email.toLowerCase().trim() : null,
      owner_phone: owner_phone ? owner_phone.replace(/\D/g, "") : null,
      is_active: true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
