"use client";

import { motion } from "framer-motion";
import { useLiveScore } from "@/hooks/useLiveScore";

export function LiveScoreWidget() {
  const { data, loading } = useLiveScore();

  if (loading || !data) {
    return (
      <div className="glass hidden animate-pulse rounded-pill px-4 py-2 text-xs text-white/60 md:block">
        Score load ho raha hai...
      </div>
    );
  }

  if (data.status === "none") {
    return (
      <a
        href="https://www.cricbuzz.com"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Explore →"
        className="glass hidden items-center gap-2 rounded-pill px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:text-white md:flex"
      >
        🏏 No Live Match Currently
      </a>
    );
  }

  if (data.status === "upcoming") {
    return (
      <a
        href={data.scorecardUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Explore →"
        className="glass hidden items-center gap-2 rounded-pill px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:text-white md:flex"
      >
        <span>🏏 Upcoming:</span>
        <span className="font-score">
          {data.team1?.name} vs {data.team2?.name}
        </span>
      </a>
    );
  }

  const isLive = data.status === "live";

  return (
    <a
      href={data.scorecardUrl ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Explore →"
      className="glass hidden max-w-sm items-center gap-3 rounded-pill px-4 py-2 text-xs text-white/90 transition-transform hover:scale-105 md:flex"
    >
      {isLive ? (
        <span className="flex items-center gap-1 font-semibold text-orange">
          <motion.span
            className="h-2 w-2 rounded-full bg-orange animate-live-pulse"
            aria-hidden="true"
          />
          LIVE
        </span>
      ) : (
        <span className="font-semibold text-white/60">FT</span>
      )}
      <span className="font-score">
        {data.team1?.name} {data.team1?.score}
      </span>
      <span className="text-white/40">vs</span>
      <span className="font-score">
        {data.team2?.name} {data.team2?.score}
      </span>
      {data.summary && (
        <span className="hidden truncate text-white/60 lg:inline">
          · {data.summary}
        </span>
      )}
    </a>
  );
}
