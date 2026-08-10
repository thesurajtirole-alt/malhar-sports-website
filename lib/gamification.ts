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

// --- Server sync (only active once a session exists — see AuthSync) ---
// Kept as a simple module-level flag rather than React context so the
// plain getter/setter functions below don't need to become hooks.
let authSyncEnabled = false;

export function setAuthSyncEnabled(value: boolean) {
  authSyncEnabled = value;
}

function pushToServer() {
  if (!authSyncEnabled) return;
  fetch("/api/streak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      points: getPoints(),
      badges: getBadges(),
      streak: getStreak(),
    }),
  }).catch(() => {
    // Best-effort only — localStorage already has the source of truth
    // for this device, so a failed sync isn't user-visible.
  });
}

export interface ServerStreakData {
  points?: number;
  badges?: BadgeKey[];
  streak?: { count: number; lastDate: string | null };
}

/**
 * Called once on login (see AuthSync). Merges server data into
 * localStorage by taking the higher value on each field, so logging in
 * on a fresh device pulls down prior progress, and logging in on a
 * device that already has local progress doesn't lose it.
 */
export function hydrateFromServer(serverData: ServerStreakData | null) {
  if (typeof window === "undefined" || !serverData) return;

  if (typeof serverData.points === "number") {
    const merged = Math.max(getPoints(), serverData.points);
    localStorage.setItem(POINTS_KEY, JSON.stringify(merged));
  }

  if (Array.isArray(serverData.badges)) {
    const merged = Array.from(new Set([...getBadges(), ...serverData.badges]));
    localStorage.setItem(BADGES_KEY, JSON.stringify(merged));
  }

  if (serverData.streak) {
    const local = getStreak();
    const useServer = serverData.streak.count > local.count;
    localStorage.setItem(
      STREAK_KEY,
      JSON.stringify(useServer ? serverData.streak : local)
    );
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
  pushToServer();
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
  pushToServer();
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
  pushToServer();
  return next;
}
