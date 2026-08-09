"use client";

import { useEffect, useRef, useState } from "react";

const IDLE_ICONS = ["🏏", "⚽", "🏸", "🏃", "🏋️", "🎾"];

export interface IdleCursorState {
  isIdle: boolean;
  idleIcon: string;
}

/**
 * After `idleMs` of no mouse movement, `isIdle` flips true and `idleIcon`
 * cycles through IDLE_ICONS every `cycleMs` (default: 3s idle wait, 0.75s
 * per icon). Any movement resets it.
 */
export function useIdleCursor(
  idleMs = 3000,
  cycleMs = 750
): IdleCursorState {
  const [isIdle, setIsIdle] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function resetIdleTimer() {
      setIsIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsIdle(true), idleMs);
    }

    resetIdleTimer();
    window.addEventListener("mousemove", resetIdleTimer, { passive: true });
    window.addEventListener("mousedown", resetIdleTimer, { passive: true });

    return () => {
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("mousedown", resetIdleTimer);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [idleMs]);

  useEffect(() => {
    if (!isIdle) return;
    cycleTimer.current = setInterval(() => {
      setIconIndex((i) => (i + 1) % IDLE_ICONS.length);
    }, cycleMs);
    return () => {
      if (cycleTimer.current) clearInterval(cycleTimer.current);
    };
  }, [isIdle, cycleMs]);

  return { isIdle, idleIcon: IDLE_ICONS[iconIndex] };
}
