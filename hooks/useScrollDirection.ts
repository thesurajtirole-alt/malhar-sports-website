"use client";

import { useEffect, useRef, useState } from "react";

export interface ScrollState {
  direction: "up" | "down" | null;
  scrollY: number;
  pastThreshold: boolean;
}

export function useScrollDirection(threshold = 200): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: null,
    scrollY: 0,
    pastThreshold: false,
  });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    function handleScroll() {
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
        });

        lastY.current = currentY;
        ticking.current = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return state;
}
