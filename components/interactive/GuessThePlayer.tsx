"use client";

import { useState } from "react";
import { guessThePlayerPool, dayIndex } from "@/lib/daily-content";
import { addPoints, unlockBadge } from "@/lib/gamification";

export function GuessThePlayer() {
  const item = guessThePlayerPool[dayIndex(guessThePlayerPool.length)];
  const [cluesShown, setCluesShown] = useState(1);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  function checkGuess() {
    const isCorrect =
      guess.trim().toLowerCase() === item.answer.toLowerCase();
    setResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      const points = cluesShown === 1 ? 15 : cluesShown === 2 ? 10 : 5;
      addPoints(points);
      unlockBadge("explorer");
    }
  }

  function revealClue() {
    setCluesShown((c) => Math.min(c + 1, 3));
  }

  return (
    <div className="rounded-card border border-tape p-8 md:p-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange">
        {item.sport}
      </p>
      <h2 className="mt-2 font-display text-2xl normal-case tracking-normal md:text-3xl">
        Ye Player Kaun Hai?
      </h2>

      <ul className="mt-6 space-y-3">
        {[item.clue1, item.clue2, item.clue3].slice(0, cluesShown).map((clue, i) => (
          <li key={i} className="flex gap-3 rounded-2xl bg-surface p-4">
            <span className="font-display text-orange">{i + 1}</span>
            <span>{clue}</span>
          </li>
        ))}
      </ul>

      {cluesShown < 3 && result === null && (
        <button
          onClick={revealClue}
          className="mt-4 text-sm font-semibold text-orange hover:underline"
        >
          Ek Aur Clue Do →
        </button>
      )}

      {result === null && (
        <div className="mt-6 flex flex-wrap gap-3">
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Naam type karo..."
            className="flex-1 rounded-pill border border-tape px-5 py-3 text-sm outline-none focus:border-orange"
            onKeyDown={(e) => e.key === "Enter" && checkGuess()}
          />
          <button
            onClick={checkGuess}
            className="rounded-pill bg-orange px-6 py-3 text-sm font-semibold text-white"
          >
            Guess Karo
          </button>
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-2xl bg-surface p-5">
          {result === "correct" ? (
            <p className="font-semibold text-turf">
              🎉 Sahi jawab! Ye hai {item.answer}.
            </p>
          ) : (
            <p className="font-semibold text-orange-deep">
              Galat guess. Sahi jawab tha: {item.answer}
            </p>
          )}
          <button
            onClick={() => {
              setCluesShown(1);
              setGuess("");
              setResult(null);
            }}
            className="mt-3 text-sm font-semibold text-ink underline"
          >
            Kal Naya Player Aayega — Abhi Dobara Try Karo
          </button>
        </div>
      )}
    </div>
  );
}
