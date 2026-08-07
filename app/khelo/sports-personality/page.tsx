import type { Metadata } from "next";
import { PersonalityQuiz } from "@/components/interactive/PersonalityQuiz";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Tu Kaunsa Sports Player Hai? — Sports Personality Quiz",
  description:
    "4 sawaal, 2 minute, aur pata chal jayega tu Weekend Warrior hai ya Daily Grinder. Malhar Sports ka Sports Personality Quiz try karo.",
  alternates: { canonical: "/khelo/sports-personality" },
};

export default function SportsPersonalityPage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="dots" grain={false} />
      <div className="relative mx-auto max-w-2xl px-4 py-16 md:px-6">
        <RevealOnScroll>
      <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-orange">
        2-Minute Quiz
      </p>
      <h1 className="text-center font-display text-4xl md:text-5xl">
        Tu Kaunsa Sports Player Hai?
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
        4 sawaal. Honest jawab dena — warna result bhi jhoota niklega.
      </p>
      <div className="mt-10">
        <PersonalityQuiz />
      </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
