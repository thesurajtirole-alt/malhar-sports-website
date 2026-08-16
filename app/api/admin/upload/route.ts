import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json(
      { error: "Storage not configured (missing Supabase env vars)" },
      { status: 503 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files allowed" },
      { status: 400 }
    );
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Image too large (max 5MB)" },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filename, buffer, { contentType: file.type });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(filename);

  return NextResponse.json({ url: publicUrlData.publicUrl });
}
