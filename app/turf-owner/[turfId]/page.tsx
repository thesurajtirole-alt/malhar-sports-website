import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { ownsTurf } from "@/lib/turf-owner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { TurfOwnerDetail } from "@/components/turf-owner/TurfOwnerDetail";

export default async function TurfOwnerTurfPage({
  params,
}: {
  params: Promise<{ turfId: string }>;
}) {
  const { turfId } = await params;
  const session = await auth();

  if (!(await ownsTurf(session, turfId))) {
    notFound();
  }

  if (!isSupabaseConfigured() || !supabase) {
    notFound();
  }

  const { data: turf } = await supabase
    .from("turfs")
    .select("*")
    .eq("id", turfId)
    .single();

  if (!turf) notFound();

  return <TurfOwnerDetail turf={turf} />;
}
