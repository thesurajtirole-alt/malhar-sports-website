import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const { id } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("products")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const { id } = await params;
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
