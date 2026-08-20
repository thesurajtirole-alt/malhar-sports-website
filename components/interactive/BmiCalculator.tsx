"use client";

import { useState } from "react";

function getCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "text-orange-deep" };
  if (bmi < 25) return { label: "Healthy Range", color: "text-turf-deep" };
  if (bmi < 30) return { label: "Overweight", color: "text-orange-deep" };
  return { label: "Obese", color: "text-orange-deep" };
}

export function BmiCalculator() {
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(65);

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const category = getCategory(bmi);

  return (
    <div className="rounded-card border border-tape p-8 md:p-12">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Height (cm)</span>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-xl border border-tape px-4 py-3 outline-none focus:border-orange"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Weight (kg)</span>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-xl border border-tape px-4 py-3 outline-none focus:border-orange"
          />
        </label>
      </div>

      {heightCm > 0 && weightKg > 0 && (
        <div className="mt-8 rounded-2xl bg-surface p-6 text-center">
          <p className="text-sm font-medium text-ink/60">Tumhara BMI</p>
          <p className="mt-1 font-display text-4xl">{bmi.toFixed(1)}</p>
          <p className={`mt-2 font-semibold ${category.color}`}>
            {category.label}
          </p>
        </div>
      )}

      <p className="mt-6 text-sm text-ink/50">
        BMI ek general indicator hai, medical diagnosis nahi. Health goals ke
        liye doctor ya certified trainer se baat karna best rehta hai.
      </p>
    </div>
  );
}
