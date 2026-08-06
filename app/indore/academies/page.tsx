import type { Metadata } from "next";
import { indoreVenues } from "@/lib/indore-venues";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Indore Sports Academies & Grounds Directory",
  description:
    "Indore ke sports academies, grounds aur stadiums ki list — cricket, badminton, football aur zyada.",
  alternates: { canonical: "/indore/academies" },
};

export default function IndoreAcademiesPage() {
  const grounds = indoreVenues.filter((v) => v.type === "Ground/Stadium");
  const academies = indoreVenues.filter((v) => v.type === "Academy");

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      <h1 className="text-center font-display text-4xl md:text-5xl">
        Indore Sports Directory
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-center text-ink/70">
        Indore ke grounds, stadiums aur academies — jaha khelna ya practice
        karna ho.
      </p>

      <h2 className="mb-5 mt-14 font-display text-2xl normal-case tracking-normal">
        Grounds & Stadiums
      </h2>
      <div className="grid gap-4">
        {grounds.map((venue) => (
          <div key={venue.name} className="rounded-2xl border border-tape p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{venue.name}</h3>
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
            <p className="mt-3 text-sm text-ink/70">{venue.note}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-5 mt-14 font-display text-2xl normal-case tracking-normal">
        Academies
      </h2>
      <div className="grid gap-4">
        {academies.map((venue) => (
          <div key={venue.name} className="rounded-2xl border border-tape p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{venue.name}</h3>
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
            <p className="mt-3 text-sm text-ink/70">{venue.note}</p>
          </div>
        ))}
      </div>

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
          className="mt-4 inline-block rounded-pill bg-turf px-6 py-3 text-sm font-semibold text-white"
        >
          WhatsApp Karo
        </a>
      </div>
    </div>
  );
}
