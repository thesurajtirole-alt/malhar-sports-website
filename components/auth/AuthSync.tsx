"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  setAuthSyncEnabled,
  hydrateFromServer,
  getPoints,
  getBadges,
  getStreak,
} from "@/lib/gamification";

/**
 * Mounted once in the root layout. Renders nothing — it just wires
 * localStorage-based gamification (lib/gamification.ts) up to the
 * server-side streak API whenever a session exists.
 */
export function AuthSync() {
  const { status } = useSession();
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (status !== "authenticated") {
      setAuthSyncEnabled(false);
      return;
    }

    setAuthSyncEnabled(true);
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    fetch("/api/streak")
      .then((res) => (res.ok ? res.json() : null))
      .then((serverData) => {
        hydrateFromServer(serverData);
        // Push the merged result back so the server reflects any
        // local-only progress from before this device was signed in.
        return fetch("/api/streak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            points: getPoints(),
            badges: getBadges(),
            streak: getStreak(),
          }),
        });
      })
      .catch(() => {
        // No internet / API down — localStorage still works standalone.
      });
  }, [status]);

  return null;
}
