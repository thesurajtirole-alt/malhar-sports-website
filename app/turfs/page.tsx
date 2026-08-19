import type { Metadata } from "next";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Turf Booking Indore — Slots Book Karo",
  description:
    "Indore ke turfs — football, cricket aur zyada ke liye. Live availability dekho, seedha book karo.",
  alternates: { canonical: "/turfs" },
};

interface Turf {
  id: string;
  name: string;
  address: string;
  area: string | null;
  sport_types: string[];
  price_per_hour: number;
  image_url: string | null;
}

async function getTurfs(): Promise<Turf[]> {
  if (!isSupabaseConfigured() || !supabase) return [];
  const { data } = await supabase
    .from("turfs")
    .select("id, name, address, area, sport_types, price_per_hour, image_url")
    .eq("is_active", true)
    .eq("is_approved", true)
    .order("name");
  return data ?? [];
}

export default async function TurfsPage() {
  const turfs = await getTurfs();

  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="conic-soft" />
      <div className="relative mx-auto max-w-5xl px-4 py-16 md:px-6">
        <RevealOnScroll>
          <h1 className="text-center font-display text-4xl md:text-5xl">
            Turf Book Karo
          </h1>
          <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
            Indore ke turfs — live slots dekho, seedha book karo. Koi
            payment nahi, bas confirm karo aur pahunch jao.
          </p>
          <p className="mt-4 text-center">
            <Link
              href="/turfs/list-your-turf"
              className="text-sm font-semibold text-orange hover:underline"
            >
              Turf Owner Ho? Apna Turf List Karo →
            </Link>
          </p>
        </RevealOnScroll>

        {turfs.length === 0 ? (
          <p className="mt-12 text-center text-ink/50">
            Abhi Match Baaki Hai 😄 — turfs jaldi add ho rahe hai.
          </p>
        ) : (
          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
            {turfs.map((turf) => (
              <StaggerItem key={turf.id}>
                <Link
                  href={`/turfs/${turf.id}`}
                  data-cursor="Play →"
                  className="group block overflow-hidden rounded-card border border-tape transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[16/9] bg-surface">
                    {turf.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={turf.image_url}
                        alt={turf.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-display text-xl normal-case tracking-normal">
                      {turf.name}
                    </h2>
                    <p className="mt-1 text-sm text-ink/60">
                      {turf.area ?? turf.address}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {turf.sport_types.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 font-semibold text-orange">
                      ₹{turf.price_per_hour}/hour
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </div>
  );
}
