import Link from "next/link";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function PersonalityTeaser() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 md:px-6">
      <RevealOnScroll>
        <div className="relative overflow-hidden rounded-card bg-surface p-8 md:p-12">
          <BackgroundEffects variant="conic-soft" />
          <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange">
                2-Minute Quiz
              </p>
              <h2 className="font-display text-3xl leading-tight md:text-4xl">
                Tum Kaunsa Sports Player Ho?
              </h2>
              <p className="mt-3 max-w-md text-ink/70">
                Weekend Warrior? Daily Grinder? Ya bas gym ke naam pe selfie
                leta hai? 4 sawaal, aur pata chal jayega tumhara sports avatar.
              </p>
              <Link
                href="/khelo/sports-personality"
                data-cursor="Explore →"
                className="mt-6 inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Quiz Shuru Karo →
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3 text-center">
                {["🏆 Champion", "🏃 Runner", "🎒 Explorer", "🔥 Guru"].map(
                  (badge) => (
                    <div
                      key={badge}
                      className="rounded-2xl bg-white px-4 py-5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                      {badge}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
