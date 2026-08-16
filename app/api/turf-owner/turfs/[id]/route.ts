import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ownsTurf } from "@/lib/turf-owner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// Turf owners can only edit these fields — name/address/contact_phone
// stay admin-controlled so an owner account can't silently change the
// listing's identity or hijack the contact number shown to customers.
const OWNER_EDITABLE_FIELDS = [
  "price_per_hour",
  "opening_time",
  "closing_time",
  "slot_duration_minutes",
  "is_active",
] as const;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  if (!(await ownsTurf(session, id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const body = await req.json();
  const update: Record<string, unknown> = {};
  for (const field of OWNER_EDITABLE_FIELDS) {
    if (field in body) update[field] = body[field];
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No editable fields provided" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("turfs")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
