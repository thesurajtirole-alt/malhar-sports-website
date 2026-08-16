import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ownsTurf } from "@/lib/turf-owner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  if (!(await ownsTurf(session, id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json([], { status: 200 });
  }

  const { data, error } = await supabase
    .from("turf_bookings")
    .select("id, booking_date, start_time, end_time, customer_name, customer_phone, status")
    .eq("turf_id", id)
    .order("booking_date", { ascending: false })
    .order("start_time", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
