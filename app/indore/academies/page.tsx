import type { Metadata } from "next";
import { indoreVenues } from "@/lib/indore-venues";
import { business } from "@/lib/business";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Indore Sports Academies & Grounds Directory",
  description:
    "Indore ke sports academies, grounds aur stadiums ki list — cricket, badminton, football aur zyada.",
  alternates: { canonical: "/indore/academies" },
};

interface Venue {
  id: string;
  name: string;
  type: "Academy" | "Ground/Stadium";
  sport: string[];
  area: string | null;
  note: string | null;
  is_verified: boolean;
}

async function getVenues(): Promise<Venue[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data } = await supabase
      .from("academies")
      .select("id, name, type, sport, area, note, is_verified")
      .eq("is_active", true)
      .order("name");
    if (data) return data;
  }
  // Fallback to the static seed list if Supabase isn't configured yet —
  // keeps the page working even before the admin CMS is wired up.
  return indoreVenues.map((v, i) => ({ ...v, id: String(i), is_verified: false }));
}

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="rounded-2xl border border-tape bg-paper p-5 transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 font-semibold">
            {venue.name}
            {venue.is_verified && (
              <span className="rounded-full bg-turf/10 px-2 py-0.5 text-xs font-semibold text-turf-deep">
                ✓ Verified
              </span>
            )}
          </h3>
          <p className="mt-1 text-sm text-ink/60">{venue.area}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {venue.sport.map((s) => (
            <span
              key={s}
              className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink/70"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      {venue.note && <p className="mt-3 text-sm text-ink/70">{venue.note}</p>}
    </div>
  );
}

export default async function IndoreAcademiesPage() {
  const venues = await getVenues();
  const grounds = venues.filter((v) => v.type === "Ground/Stadium");
  const academies = venues.filter((v) => v.type === "Academy");

  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="dots" grain={false} />
      <div className="relative mx-auto max-w-4xl px-4 py-16 md:px-6">
        <RevealOnScroll>
          <h1 className="text-center font-display text-4xl md:text-5xl">
            Indore Sports Directory
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-center text-ink/70">
            Indore ke grounds, stadiums aur academies — jaha khelna ya practice
            karna ho.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-orange/20 bg-orange/5 p-4 text-center text-sm text-ink/70">
            ⚠️ &ldquo;✓ Verified&rdquo; tag wali listings hum confirm kar chuke hai. Baaki
            publicly available info se hai — visit ya call karne se pehle
            details confirm kar lena.
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="mb-5 mt-14 font-display text-2xl normal-case tracking-normal">
            Grounds & Stadiums
          </h2>
        </RevealOnScroll>
        <StaggerGroup className="grid gap-4">
          {grounds.map((venue) => (
            <StaggerItem key={venue.id}>
              <VenueCard venue={venue} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <RevealOnScroll delay={0.1}>
          <h2 className="mb-5 mt-14 font-display text-2xl normal-case tracking-normal">
            Academies
          </h2>
        </RevealOnScroll>
        <StaggerGroup className="grid gap-4">
          {academies.map((venue) => (
            <StaggerItem key={venue.id}>
              <VenueCard venue={venue} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <RevealOnScroll delay={0.1}>
          <div className="mt-12 rounded-card bg-surface p-8 text-center">
            <p className="font-display text-xl normal-case tracking-normal">
              Apni Academy List Karwana Chahte Ho?
            </p>
            <p className="mt-2 text-ink/70">
              Agar aap Indore mein sports academy ya ground chalate hai, humein
              WhatsApp karo — free mein list kar dete hai.
            </p>
            <a
              href={business.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Explore →"
              className="mt-4 inline-block rounded-pill bg-turf px-6 py-3 text-sm font-semibold text-white"
            >
              WhatsApp Karo
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
