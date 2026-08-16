import Link from "next/link";
import { auth } from "@/auth";
import { getOwnedTurfIds } from "@/lib/turf-owner";
import { supabase } from "@/lib/supabase";

export default async function TurfOwnerDashboard() {
  const session = await auth();
  const ownedTurfIds = await getOwnedTurfIds(session);

  const turfs = supabase
    ? (
        await supabase
          .from("turfs")
          .select("id, name, area, price_per_hour, is_active")
          .in("id", ownedTurfIds)
      ).data ?? []
    : [];

  return (
    <div>
      <h1 className="font-display text-3xl normal-case tracking-normal">
        Tera Turf Dashboard
      </h1>
      <p className="mt-1 text-ink/60">
        {turfs.length === 1
          ? "Apna turf yaha manage karo."
          : "Apne turfs yaha manage karo."}
      </p>

      <div className="mt-8 grid gap-4">
        {turfs.map((t) => (
          <Link
            key={t.id}
            href={`/turf-owner/${t.id}`}
            className="flex items-center justify-between rounded-2xl border border-tape p-5 transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-ink/60">
                {t.area} · ₹{t.price_per_hour}/hour
              </p>
            </div>
            <span
              className={`rounded-pill px-3 py-1 text-xs font-semibold ${
                t.is_active ? "bg-turf/10 text-turf-deep" : "bg-surface text-ink/50"
              }`}
            >
              {t.is_active ? "Live" : "Hidden"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
