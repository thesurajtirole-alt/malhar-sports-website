import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json(
      { error: "Abhi ye feature available nahi hai. WhatsApp karo directly." },
      { status: 503 }
    );
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
    owner_email,
    owner_phone,
  } = body;

  if (!name || !address || !contact_phone || !price_per_hour) {
    return NextResponse.json(
      { error: "Name, address, contact phone, aur price zaroori hai." },
      { status: 400 }
    );
  }

  // Required so the owner can actually log in and manage it afterward —
  // unlike the admin-created path, self-signup has no other way to link
  // a turf to whoever submitted it.
  if (!owner_email && !owner_phone) {
    return NextResponse.json(
      { error: "Login ke liye apna email ya phone number zaroor daalo." },
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
      owner_email: owner_email ? owner_email.toLowerCase().trim() : null,
      owner_phone: owner_phone ? owner_phone.replace(/\D/g, "") : null,
      is_active: true,
      is_approved: false, // stays hidden from customers until admin approves
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
