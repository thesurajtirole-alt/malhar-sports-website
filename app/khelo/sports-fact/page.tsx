import type { Metadata } from "next";
import { sportsFactPool, dayIndex } from "@/lib/daily-content";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Sports Fact of the Day",
  description: "Roz ek naya sports fact — jo tu apne dost ko bhi bolega.",
  alternates: { canonical: "/khelo/sports-fact" },
};

export default function SportsFactPage() {
  const fact = sportsFactPool[dayIndex(sportsFactPool.length)];

  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="dots" grain={false} />
      <div className="relative mx-auto max-w-2xl px-4 py-16 md:px-6">
        <RevealOnScroll>
      <h1 className="text-center font-display text-4xl md:text-5xl">
        Sports Fact of the Day
      </h1>
      <div className="mt-10 rounded-card bg-ink p-10 text-center text-white md:p-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange">
          {fact.sport}
        </p>
        <p className="mt-4 text-xl leading-relaxed md:text-2xl">
          💡 {fact.fact}
        </p>
      </div>
      <p className="mt-6 text-center text-sm text-ink/60">
        Kal ek naya fact aayega. Roz check karte raho.
      </p>
        </RevealOnScroll>
      </div>
    </div>
  );
}
