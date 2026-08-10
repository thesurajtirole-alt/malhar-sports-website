"use client";

import { useState } from "react";
import { dailyChallengePool, dayIndex } from "@/lib/daily-content";
import { addPoints, bumpStreak, unlockBadge } from "@/lib/gamification";

export function DailyChallengeQuiz() {
  const q = dailyChallengePool[dayIndex(dailyChallengePool.length)];
  const [selected, setSelected] = useState<number | null>(null);
  const [streak, setStreak] = useState<number | null>(null);

  function pick(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctIndex) {
      addPoints(20);
      unlockBadge("champion");
      const s = bumpStreak();
      setStreak(s.count);
    }
  }

  return (
    <div className="rounded-card border border-tape p-8 md:p-12">
      <h2 className="font-display text-2xl normal-case tracking-normal md:text-3xl">
        {q.question}
      </h2>
      <div className="mt-6 grid gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isSelected = i === selected;
          let style =
            "border-tape hover:border-orange hover:bg-orange/5";
          if (selected !== null && isCorrect) {
            style = "border-turf bg-turf/10 text-turf-deep";
          } else if (selected !== null && isSelected && !isCorrect) {
            style = "border-orange-deep bg-orange/10 text-orange-deep";
          }
          return (
            <button
              key={opt}
              onClick={() => pick(i)}
              className={`rounded-2xl border p-4 text-left font-medium transition-all ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-6 rounded-2xl bg-surface p-5">
          {selected === q.correctIndex ? (
            <p className="font-semibold text-turf-deep">
              🎯 Sahi jawab! +20 points.{" "}
              {streak && streak > 1
                ? `${streak} din ka streak chal raha hai!`
                : "Streak shuru ho gaya!"}
            </p>
          ) : (
            <p className="font-semibold text-orange-deep">
              Galat. Sahi jawab tha: {q.options[q.correctIndex]}
            </p>
          )}
          <p className="mt-2 text-sm text-ink/60">
            Kal naya challenge aayega — streak zinda rakhne ke liye kal bhi
            aana.
          </p>
        </div>
      )}
    </div>
  );
}
