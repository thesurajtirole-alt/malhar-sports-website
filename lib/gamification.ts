"use client";

export type BadgeKey =
  | "explorer"
  | "runner"
  | "champion"
  | "weekend-warrior"
  | "sports-guru";

export const BADGES: Record<BadgeKey, { label: string; emoji: string }> = {
  explorer: { label: "Explorer", emoji: "🎒" },
  runner: { label: "Runner", emoji: "🏃" },
  champion: { label: "Champion", emoji: "🏆" },
  "weekend-warrior": { label: "Weekend Warrior", emoji: "🎯" },
  "sports-guru": { label: "Sports Guru", emoji: "🔥" },
};

const POINTS_KEY = "malhar:points";
const BADGES_KEY = "malhar:badges";
const STREAK_KEY = "malhar:streak"; // { count, lastDate }

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getPoints(): number {
  if (typeof window === "undefined") return 0;
  return safeParse<number>(localStorage.getItem(POINTS_KEY), 0);
}

export function addPoints(amount: number): number {
  if (typeof window === "undefined") return 0;
  const next = getPoints() + amount;
  localStorage.setItem(POINTS_KEY, JSON.stringify(next));
  return next;
}

export function getBadges(): BadgeKey[] {
  if (typeof window === "undefined") return [];
  return safeParse<BadgeKey[]>(localStorage.getItem(BADGES_KEY), []);
}

export function unlockBadge(badge: BadgeKey): boolean {
  if (typeof window === "undefined") return false;
  const current = getBadges();
  if (current.includes(badge)) return false;
  localStorage.setItem(BADGES_KEY, JSON.stringify([...current, badge]));
  return true; // true = newly unlocked
}

export function getStreak(): { count: number; lastDate: string | null } {
  if (typeof window === "undefined") return { count: 0, lastDate: null };
  return safeParse(localStorage.getItem(STREAK_KEY), {
    count: 0,
    lastDate: null as string | null,
  });
}

export function bumpStreak(): { count: number; lastDate: string | null } {
  if (typeof window === "undefined") return { count: 0, lastDate: null };
  const today = new Date().toISOString().slice(0, 10);
  const current = getStreak();
  if (current.lastDate === today) return current; // already counted today

  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .slice(0, 10);
  const nextCount = current.lastDate === yesterday ? current.count + 1 : 1;
  const next = { count: nextCount, lastDate: today };
  localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  return next;
}
