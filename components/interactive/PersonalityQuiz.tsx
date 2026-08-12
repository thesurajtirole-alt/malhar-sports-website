"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  quizQuestions,
  calculateResult,
  type PersonalityKey,
} from "@/lib/quiz-data";
import { unlockBadge, addPoints, BADGES } from "@/lib/gamification";
import { business } from "@/lib/business";
import { trackEvent } from "@/lib/analytics";

export function PersonalityQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Partial<Record<PersonalityKey, number>>>(
    {}
  );
  const [justUnlocked, setJustUnlocked] = useState(false);

  const done = step >= quizQuestions.length;
  const result = done ? calculateResult(scores) : null;

  function choose(points: Partial<Record<PersonalityKey, number>>) {
    setScores((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(points) as PersonalityKey[]) {
        next[key] = (next[key] ?? 0) + (points[key] ?? 0);
      }
      return next;
    });

    if (step === quizQuestions.length - 1) {
      addPoints(10);
      trackEvent("quiz_completed", { quiz: "sports_personality" });
    }
    setStep((s) => s + 1);
  }

  if (done && result) {
    if (!justUnlocked) {
      const unlocked = unlockBadge(result.badge);
      if (unlocked) setJustUnlocked(true);
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-card border border-tape bg-surface p-8 text-center md:p-12"
      >
        <span className="text-5xl">{result.emoji}</span>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-orange">
          Tera Result
        </p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">
          {result.title}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-ink/70">
          {result.description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-2 text-sm font-semibold text-white">
          <span>{BADGES[result.badge].emoji}</span>
          Badge Unlocked: {BADGES[result.badge].label}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              setStep(0);
              setScores({});
              setJustUnlocked(false);
            }}
            className="rounded-pill border border-tape px-6 py-3 text-sm font-semibold hover:bg-tape"
          >
            Dobara Try Karo
          </button>
          <a
            href={`${business.whatsappLink}?text=${encodeURIComponent(
              `Main "${result.title}" nikla Malhar Sports ke quiz mein! Tu bhi try kar.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-turf px-6 py-3 text-sm font-semibold text-white"
          >
            Result Share Karo
          </a>
        </div>
      </motion.div>
    );
  }

  const question = quizQuestions[step];

  return (
    <div className="rounded-card border border-tape p-8 md:p-12">
      <div className="mb-6 flex items-center gap-2">
        {quizQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i <= step ? "bg-orange" : "bg-tape"
            }`}
          />
        ))}
      </div>
      <p className="mb-1 text-sm font-medium text-ink/50">
        Sawaal {step + 1} / {quizQuestions.length}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <h2 className="font-display text-2xl normal-case tracking-normal md:text-3xl">
            {question.question}
          </h2>
          <div className="mt-6 grid gap-3">
            {question.options.map((opt) => (
              <button
                key={opt.text}
                onClick={() => choose(opt.points)}
                className="rounded-2xl border border-tape p-4 text-left font-medium transition-all hover:border-orange hover:bg-orange/5"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
