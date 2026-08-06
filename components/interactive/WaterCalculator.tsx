"use client";

import { useState } from "react";

const activityMultiplier = {
  low: 0.033,
  moderate: 0.04,
  high: 0.05,
} as const;

type Activity = keyof typeof activityMultiplier;

export function WaterCalculator() {
  const [weightKg, setWeightKg] = useState(65);
  const [activity, setActivity] = useState<Activity>("moderate");

  const liters = weightKg * activityMultiplier[activity];

  return (
    <div className="rounded-card border border-tape p-8 md:p-12">
      <label className="block">
        <span className="text-sm font-medium text-ink/70">Weight (kg)</span>
        <input
          type="number"
          value={weightKg}
          onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
          className="mt-2 w-full rounded-xl border border-tape px-4 py-3 outline-none focus:border-orange"
        />
      </label>

      <div className="mt-5">
        <span className="text-sm font-medium text-ink/70">
          Aaj activity level kaisa hai?
        </span>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(["low", "moderate", "high"] as Activity[]).map((level) => (
            <button
              key={level}
              onClick={() => setActivity(level)}
              className={`rounded-xl border px-3 py-2 text-sm font-semibold capitalize transition-colors ${
                activity === level
                  ? "border-orange bg-orange/10 text-orange-deep"
                  : "border-tape hover:border-orange/50"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {weightKg > 0 && (
        <div className="mt-8 rounded-2xl bg-surface p-6 text-center">
          <p className="text-sm font-medium text-ink/60">
            Aaj ka target
          </p>
          <p className="mt-1 font-display text-4xl">
            {liters.toFixed(1)} L
          </p>
          <p className="mt-1 text-sm text-ink/60">
            ≈ {Math.round((liters * 1000) / 250)} glasses (250ml each)
          </p>
        </div>
      )}
    </div>
  );
}
