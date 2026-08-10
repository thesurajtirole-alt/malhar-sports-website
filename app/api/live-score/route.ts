import { NextResponse } from "next/server";
import type { LiveScoreData } from "@/hooks/useLiveScore";

// CricAPI (https://cricapi.com) free tier — set CRICKET_API_KEY in your
// Vercel project's Environment Variables. Without a key, this route
// always returns the safe "none" fallback below, so the widget never
// breaks — it just quietly shows "No Live Match Currently."
const API_KEY = process.env.CRICKET_API_KEY;
const CRICAPI_BASE = "https://api.cricapi.com/v1";

const NO_MATCH_FALLBACK: LiveScoreData = { status: "none" };

// Cache the last good response for 30s server-side so repeated client
// polls (and multiple visitors) don't multiply API calls against a
// rate-limited free tier.
let cache: { data: LiveScoreData; expiresAt: number } | null = null;
const CACHE_MS = 30_000;

export async function GET() {
  if (cache && cache.expiresAt > Date.now()) {
    return NextResponse.json(cache.data);
  }

  if (!API_KEY) {
    return NextResponse.json(NO_MATCH_FALLBACK);
  }

  try {
    const liveRes = await fetch(
      `${CRICAPI_BASE}/currentMatches?apikey=${API_KEY}&offset=0`,
      { next: { revalidate: 0 } }
    );

    if (!liveRes.ok) throw new Error(`CricAPI status ${liveRes.status}`);
    const liveJson = await liveRes.json();
    const matches = liveJson?.data ?? [];

    const liveMatch = matches.find(
      (m: { matchStarted?: boolean; matchEnded?: boolean }) =>
        m.matchStarted && !m.matchEnded
    );

    if (liveMatch) {
      const result = mapLiveMatch(liveMatch);
      cache = { data: result, expiresAt: Date.now() + CACHE_MS };
      return NextResponse.json(result);
    }

    // No live match — try today's upcoming
    const upcoming = matches.find(
      (m: { matchStarted?: boolean }) => !m.matchStarted
    );
    if (upcoming) {
      const result: LiveScoreData = {
        status: "upcoming",
        team1: { name: upcoming.teams?.[0] ?? "TBD", score: "" },
        team2: { name: upcoming.teams?.[1] ?? "TBD", score: "" },
        matchTime: upcoming.dateTimeGMT,
        scorecardUrl: `https://cricapi.com/matches/${upcoming.id}`,
      };
      cache = { data: result, expiresAt: Date.now() + CACHE_MS };
      return NextResponse.json(result);
    }

    // Last completed match
    const completed = matches.find(
      (m: { matchEnded?: boolean }) => m.matchEnded
    );
    if (completed) {
      const result: LiveScoreData = {
        status: "completed",
        team1: { name: completed.teams?.[0] ?? "", score: "" },
        team2: { name: completed.teams?.[1] ?? "", score: "" },
        summary: completed.status,
        scorecardUrl: `https://cricapi.com/matches/${completed.id}`,
      };
      cache = { data: result, expiresAt: Date.now() + CACHE_MS };
      return NextResponse.json(result);
    }

    cache = { data: NO_MATCH_FALLBACK, expiresAt: Date.now() + CACHE_MS };
    return NextResponse.json(NO_MATCH_FALLBACK);
  } catch {
    // API down, rate-limited, or key invalid — never surface an error to
    // the widget, just fall back quietly.
    return NextResponse.json(NO_MATCH_FALLBACK);
  }
}

function mapLiveMatch(match: {
  teams?: string[];
  teamInfo?: unknown;
  score?: {
    inning: string;
    r: number;
    w: number;
    o: number;
  }[];
  id: string;
  status?: string;
}): LiveScoreData {
  const scores = match.score ?? [];
  const team1Name = match.teams?.[0] ?? "Team 1";
  const team2Name = match.teams?.[1] ?? "Team 2";

  const s1 = scores[0];
  const s2 = scores[1];

  return {
    status: "live",
    team1: {
      name: team1Name,
      score: s1 ? `${s1.r}/${s1.w} (${s1.o})` : "Yet to bat",
    },
    team2: {
      name: team2Name,
      score: s2 ? `${s2.r}/${s2.w} (${s2.o})` : "Yet to bat",
    },
    summary: match.status,
    scorecardUrl: `https://cricapi.com/matches/${match.id}`,
  };
}
