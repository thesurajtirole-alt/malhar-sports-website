"use client";

import { useEffect, useState } from "react";

export type MatchStatus = "live" | "upcoming" | "completed" | "none";

export interface LiveScoreData {
  status: MatchStatus;
  team1?: { name: string; score: string };
  team2?: { name: string; score: string };
  summary?: string; // e.g. "Need 18 from 16 balls" or "IND won by 6 wickets"
  matchTime?: string; // for upcoming matches
  scorecardUrl?: string;
}

const POLL_INTERVAL_MS = 60_000;

export function useLiveScore() {
  const [data, setData] = useState<LiveScoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchScore() {
      try {
        const res = await fetch("/api/live-score", { cache: "no-store" });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const json: LiveScoreData = await res.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          // Fall back to a safe "no live match" state rather than a broken widget
          setData((prev) => prev ?? { status: "none" });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchScore();
    const interval = setInterval(fetchScore, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, error };
}
