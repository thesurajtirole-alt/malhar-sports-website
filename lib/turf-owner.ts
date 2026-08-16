import type { Session } from "next-auth";
import { supabase, isSupabaseConfigured } from "./supabase";

function sessionIdentifiers(session: Session | null): {
  email: string | null;
  phoneDigits: string | null;
} {
  const email = session?.user?.email?.toLowerCase() ?? null;
  const id = session?.user?.id ?? "";
  const phoneDigits = id.startsWith("phone:")
    ? id.replace("phone:", "").replace(/\D/g, "")
    : null;
  return { email, phoneDigits };
}

/** Returns the turf IDs owned by this session, or [] if none / not signed in. */
export async function getOwnedTurfIds(session: Session | null): Promise<string[]> {
  if (!isSupabaseConfigured() || !supabase) return [];
  const { email, phoneDigits } = sessionIdentifiers(session);
  if (!email && !phoneDigits) return [];

  const orFilters: string[] = [];
  if (email) orFilters.push(`owner_email.eq.${email}`);
  if (phoneDigits) orFilters.push(`owner_phone.eq.${phoneDigits}`);
  if (orFilters.length === 0) return [];

  const { data } = await supabase
    .from("turfs")
    .select("id")
    .or(orFilters.join(","));

  return (data ?? []).map((t) => t.id);
}

/** Returns true if this session owns the specific turf. */
export async function ownsTurf(
  session: Session | null,
  turfId: string
): Promise<boolean> {
  const owned = await getOwnedTurfIds(session);
  return owned.includes(turfId);
}
