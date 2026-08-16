import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { generateSlots } from "@/lib/turf-slots";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date"); // "YYYY-MM-DD"

  if (!date) {
    return NextResponse.json({ error: "date query param required" }, { status: 400 });
  }

  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const { data: turf, error: turfError } = await supabase
    .from("turfs")
    .select("opening_time, closing_time, slot_duration_minutes")
    .eq("id", id)
    .single();

  if (turfError || !turf) {
    return NextResponse.json({ error: "Turf not found" }, { status: 404 });
  }

  const allSlots = generateSlots(
    turf.opening_time,
    turf.closing_time,
    turf.slot_duration_minutes
  );

  const { data: bookings } = await supabase
    .from("turf_bookings")
    .select("start_time")
    .eq("turf_id", id)
    .eq("booking_date", date)
    .eq("status", "confirmed");

  const bookedTimes = new Set((bookings ?? []).map((b) => b.start_time));

  // Also hide past time-slots if the requested date is today
  const now = new Date();
  const isToday = date === now.toISOString().slice(0, 10);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const slots = allSlots.map((slot) => {
    const [h, m] = slot.startTime.split(":").map(Number);
    const slotMinutes = h * 60 + m;
    const isPast = isToday && slotMinutes <= currentMinutes;
    return {
      ...slot,
      available: !bookedTimes.has(slot.startTime) && !isPast,
    };
  });

  return NextResponse.json({ slots });
}
