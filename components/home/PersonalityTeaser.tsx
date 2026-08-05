import Link from "next/link";

export function PersonalityTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="grid gap-8 rounded-card bg-surface p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange">
            2-Minute Quiz
          </p>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">
            Tu Kaunsa Sports Player Hai?
          </h2>
          <p className="mt-3 max-w-md text-ink/70">
            Weekend Warrior? Daily Grinder? Ya bas gym ke naam pe selfie
            leta hai? 4 sawaal, aur pata chal jayega tera sports avatar.
          </p>
          <Link
            href="/khelo/sports-personality"
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
                  className="rounded-2xl bg-white px-4 py-5 text-sm font-semibold shadow-sm"
                >
                  {badge}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
