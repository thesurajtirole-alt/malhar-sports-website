"use client";

import { useState } from "react";

const distances = [
  { label: "5K", km: 5 },
  { label: "10K", km: 10 },
  { label: "Half Marathon", km: 21.1 },
  { label: "Full Marathon", km: 42.2 },
];

function formatTime(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.floor(totalMinutes % 60);
  const s = Math.round((totalMinutes % 1) * 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;
}

export function RunningCalculator() {
  const [paceMinPerKm, setPaceMinPerKm] = useState(6);

  return (
    <div className="rounded-card border border-tape p-8 md:p-12">
      <label className="block">
        <span className="text-sm font-medium text-ink/70">
          Tera pace (minutes per km)
        </span>
        <input
          type="range"
          min="3"
          max="12"
          step="0.5"
          value={paceMinPerKm}
          onChange={(e) => setPaceMinPerKm(Number(e.target.value))}
          className="mt-3 w-full"
        />
        <p className="mt-2 text-center font-display text-2xl">
          {paceMinPerKm.toFixed(1)} min/km
        </p>
      </label>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {distances.map((d) => (
          <div
            key={d.label}
            className="flex items-center justify-between rounded-2xl bg-surface p-4"
          >
            <span className="font-semibold">{d.label}</span>
            <span className="font-score text-orange">
              {formatTime(paceMinPerKm * d.km)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
