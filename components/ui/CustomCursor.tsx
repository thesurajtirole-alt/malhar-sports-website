"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIdleCursor } from "@/hooks/useIdleCursor";

const SPORT_LABELS: Record<string, string> = {
  cricket: "🏏 Cricket",
  football: "⚽ Football",
  badminton: "🏸 Smash",
  running: "🏃 Run",
  gym: "💪 Lift",
  school: "🎒 Explore",
};

/**
 * Renders a glass cursor that replaces the native pointer, but only when
 * it's safe to: fine pointer (mouse, not touch), hover-capable, and the
 * person hasn't asked for reduced motion. Any element can opt in to a
 * hover label via `data-cursor="Explore →"` or `data-cursor-sport="cricket"`.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const { x, y } = useMousePosition();
  const { isIdle, idleIcon } = useIdleCursor();

  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });

  useEffect(() => {
    // One-time capability check on mount (window/matchMedia don't exist
    // during SSR, so this can't be computed as a lazy initial state).
    const canUseCustomCursor =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(canUseCustomCursor);
    if (process.env.NODE_ENV !== "production") {
      console.log("[CustomCursor] enabled:", canUseCustomCursor, {
        pointerFine: window.matchMedia("(pointer: fine)").matches,
        hoverHover: window.matchMedia("(hover: hover)").matches,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches,
      });
    }
    if (canUseCustomCursor) {
      document.documentElement.classList.add("custom-cursor-active");
    }

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    springX.set(x);
    springY.set(y);
  }, [x, y, springX, springY]);

  useEffect(() => {
    if (!enabled) return;

    function handleOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], [data-cursor-sport], button, a"
      );
      if (!target) {
        setLabel(null);
        return;
      }

      const sportKey = target.getAttribute("data-cursor-sport");
      const customLabel = target.getAttribute("data-cursor");

      if (sportKey && SPORT_LABELS[sportKey]) {
        setLabel(SPORT_LABELS[sportKey]);
      } else if (customLabel) {
        setLabel(customLabel);
      } else if (target.tagName === "BUTTON" || target.tagName === "A") {
        setLabel("Explore →");
      } else {
        setLabel(null);
      }
    }

    function handleOut(e: MouseEvent) {
      const related = e.relatedTarget as HTMLElement | null;
      if (
        !related?.closest?.("[data-cursor], [data-cursor-sport], button, a")
      ) {
        setLabel(null);
      }
    }

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  const showIdleIcon = isIdle && !label;

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    (window as unknown as { __cursorDebug?: unknown }).__cursorDebug = {
      isIdle,
      label,
      showIdleIcon,
    };
  }, [isIdle, label, showIdleIcon]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2"
    >
      <AnimatePresence mode="wait">
        {showIdleIcon ? (
          <motion.div
            key={idleIcon}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="gradient-orange flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-xl ring-2 ring-white/40"
          >
            {idleIcon}
          </motion.div>
        ) : (
          <motion.div
            key={label ?? "dot"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={
              label
                ? "flex items-center gap-1 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-xl ring-1 ring-white/10"
                : "h-3 w-3 rounded-full bg-orange shadow-md ring-2 ring-white"
            }
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
