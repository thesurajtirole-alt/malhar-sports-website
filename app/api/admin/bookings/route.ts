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
    .from("turf_bookings")
    .select("*, turfs(name)")
    .order("booking_date", { ascending: false })
    .order("start_time", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
