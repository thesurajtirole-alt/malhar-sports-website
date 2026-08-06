import type { Metadata } from "next";
import { BmiCalculator } from "@/components/interactive/BmiCalculator";

export const metadata: Metadata = {
  title: "BMI Calculator — Body Mass Index Nikalo",
  description: "Apna BMI seconds mein calculate karo. Height aur weight daalo, category dekho.",
  alternates: { canonical: "/khelo/calculators/bmi" },
};

export default function BmiPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <h1 className="text-center font-display text-4xl md:text-5xl">BMI Calculator</h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
        Height aur weight daalo, apna Body Mass Index nikaalo.
      </p>
      <div className="mt-10"><BmiCalculator /></div>
    </div>
  );
}
