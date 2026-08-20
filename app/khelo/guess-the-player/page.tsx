import type { Metadata } from "next";
import { GuessThePlayer } from "@/components/interactive/GuessThePlayer";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Guess The Player — Aaj Ka Sports Star Kaun Hai?",
  description:
    "3 clues, ek player. Kya tum bata sakte ho ye sports legend kaun hai? Roz naya player, roz naya challenge.",
  alternates: { canonical: "/khelo/guess-the-player" },
};

export default function GuessThePlayerPage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="dots" grain={false} />
      <div className="relative mx-auto max-w-2xl px-4 py-16 md:px-6">
        <RevealOnScroll>
      <h1 className="text-center font-display text-4xl md:text-5xl">
        Guess The Player
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
        Jitna kam clue se guess karega, utne zyada points milenge.
      </p>
      <div className="mt-10">
        <GuessThePlayer />
      </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
