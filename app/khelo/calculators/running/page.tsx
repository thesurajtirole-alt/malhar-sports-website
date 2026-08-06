import type { Metadata } from "next";
import { RunningCalculator } from "@/components/interactive/RunningCalculator";

export const metadata: Metadata = {
  title: "Running Pace Calculator — 5K, 10K, Marathon Time",
  description: "Apna running pace daalo aur 5K, 10K, half marathon, full marathon ka estimated time dekho.",
  alternates: { canonical: "/khelo/calculators/running" },
};

export default function RunningCalcPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <h1 className="text-center font-display text-4xl md:text-5xl">Running Calculator</h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
        Pace set karo, race distances ka time instantly dekho.
      </p>
      <div className="mt-10"><RunningCalculator /></div>
    </div>
  );
}
