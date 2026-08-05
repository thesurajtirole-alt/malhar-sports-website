"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { business } from "@/lib/business";
import { sportMoods, type SportKey } from "@/lib/sports-data";
import { cn } from "@/lib/utils";

export function Hero() {
  const [active, setActive] = useState<SportKey>("cricket");
  const activeMood = sportMoods.find((m) => m.key === active)!;

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* Ambient scoreboard dot texture */}
      <div className="scoreboard-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-turf/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-20 md:px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-flex w-fit items-center gap-2 rounded-pill bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-paper/80"
        >
          <span className="h-2 w-2 rounded-full bg-turf" />
          Abhi Open — {business.hours.display}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl font-display text-5xl leading-[1.05] tracking-wide md:text-7xl"
        >
          Bhai... <span className="text-orange">Aaj</span> Kis Sport Ka{" "}
          <span className="text-orange">Mood</span> Hai?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-xl text-lg text-paper/70"
        >
          Apna sport choose karo, hum dikhate hai kya kaam ka hai — bina kisi
          bakwaas ke.
        </motion.p>

        {/* Sport picker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {sportMoods.map((mood) => (
            <button
              key={mood.key}
              onClick={() => setActive(mood.key)}
              className={cn(
                "flex items-center gap-2 rounded-pill border px-5 py-3 text-sm font-semibold transition-all",
                active === mood.key
                  ? "gradient-orange border-transparent text-white shadow-lg shadow-orange/20 scale-105"
                  : "border-white/15 bg-white/5 text-paper/80 hover:border-orange/50 hover:bg-white/10"
              )}
            >
              <span className="text-base">{mood.emoji}</span>
              {mood.label}
            </button>
          ))}
        </motion.div>

        {/* Reactive result line + chips */}
        <div className="mt-8 min-h-[104px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <p className="font-body text-base text-paper/90 md:text-lg">
                {activeMood.lineForYou}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeMood.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-paper/70"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href={business.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-turf px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Confuse Ho? Pucho Na 😄
          </a>
          <a
            href={business.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill border border-white/20 px-6 py-3 text-sm font-semibold text-paper hover:bg-white/10"
          >
            Dukaan Ka Raasta Dikhao
          </a>
        </motion.div>
      </div>
    </section>
  );
}
