"use client";

import { useEffect, useRef, useState } from "react";

export interface ScrollState {
  direction: "up" | "down" | null;
  scrollY: number;
  pastThreshold: boolean;
  isScrolling: boolean;
}

export function useScrollDirection(threshold = 200): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: null,
    scrollY: 0,
    pastThreshold: false,
    isScrolling: false,
  });
  const lastY = useRef(0);
  const ticking = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    function handleScroll() {
      if (settleTimer.current) clearTimeout(settleTimer.current);

      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const direction =
          currentY > lastY.current
            ? "down"
            : currentY < lastY.current
              ? "up"
              : null;

        setState({
          direction,
          scrollY: currentY,
          pastThreshold: currentY > threshold,
          isScrolling: true,
        });

        lastY.current = currentY;
        ticking.current = false;
      });

      // Once scrolling settles (no scroll event for 150ms), drop the
      // "isScrolling" flag so a lingering "down" direction from the last
      // tick doesn't keep the button hidden forever — most people scroll
      // down, then stop, and expect it to reappear once they stop.
      settleTimer.current = setTimeout(() => {
        setState((prev) => ({ ...prev, isScrolling: false }));
      }, 150);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [threshold]);

  return state;
}
