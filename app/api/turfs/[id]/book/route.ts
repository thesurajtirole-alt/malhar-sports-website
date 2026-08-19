import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { auth } from "@/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json(
      { error: "Booking is not available right now. WhatsApp karo directly." },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { date, startTime, endTime, customerName, customerPhone } = body;

  if (!date || !startTime || !endTime || !customerName || !customerPhone) {
    return NextResponse.json(
      { error: "Saari details bharo — naam, phone, date, aur time." },
      { status: 400 }
    );
  }

  const session = await auth();
  const userId = session?.user?.id ?? session?.user?.email ?? null;

  // Confirm the turf is actually live before accepting money-free but
  // still-real bookings against it — prevents booking an unapproved or
  // hidden turf via a direct API call, even though the UI already hides it.
  const { data: turf } = await supabase
    .from("turfs")
    .select("id")
    .eq("id", id)
    .eq("is_active", true)
    .eq("is_approved", true)
    .maybeSingle();

  if (!turf) {
    return NextResponse.json(
      { error: "Ye turf abhi available nahi hai." },
      { status: 404 }
    );
  }

  const { data, error } = await supabase
    .from("turf_bookings")
    .insert({
      turf_id: id,
      booking_date: date,
      start_time: startTime,
      end_time: endTime,
      customer_name: customerName,
      customer_phone: customerPhone,
      user_id: userId,
      status: "confirmed",
    })
    .select()
    .single();

  if (error) {
    // Postgres unique_violation — someone else grabbed this exact slot
    // in the moment between this person loading the page and submitting.
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Ye slot abhi kisi aur ne book kar liya. Doosra slot try karo." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
