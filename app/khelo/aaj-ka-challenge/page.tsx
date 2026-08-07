import type { Metadata } from "next";
import { DailyChallengeQuiz } from "@/components/interactive/DailyChallengeQuiz";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Aaj Ka Challenge — Daily Sports Quiz",
  description: "Roz ek naya sawaal. Streak banao, points aur badges jeeto.",
  alternates: { canonical: "/khelo/aaj-ka-challenge" },
};

export default function AajKaChallengePage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="dots" grain={false} />
      <div className="relative mx-auto max-w-2xl px-4 py-16 md:px-6">
        <RevealOnScroll>
      <h1 className="text-center font-display text-4xl md:text-5xl">
        Aaj Ka Challenge
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
        Roz naya sawaal, roz nayi chance streak badhane ki.
      </p>
      <div className="mt-10">
        <DailyChallengeQuiz />
      </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
