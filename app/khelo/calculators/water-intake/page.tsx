import type { Metadata } from "next";
import { WaterCalculator } from "@/components/interactive/WaterCalculator";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Water Intake Calculator — Roz Kitna Paani Peena Chahiye",
  description: "Weight aur activity level ke hisaab se apna daily water intake target nikaalo.",
  alternates: { canonical: "/khelo/calculators/water-intake" },
};

export default function WaterCalcPage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="dots" grain={false} />
      <div className="relative mx-auto max-w-2xl px-4 py-16 md:px-6">
        <RevealOnScroll>
      <h1 className="text-center font-display text-4xl md:text-5xl">Water Intake Calculator</h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
        Roz kitna paani peena chahiye — apne weight aur activity ke hisaab se.
      </p>
      <div className="mt-10"><WaterCalculator /></div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
