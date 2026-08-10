"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIdleCursor } from "@/hooks/useIdleCursor";

/**
 * Renders a custom cursor that replaces the native pointer, but only when
 * it's safe to: reduced motion is off, and — critically — the person is
 * actually using a mouse right now.
 *
 * We deliberately do NOT rely on `(pointer: fine)` / `(hover: hover)`
 * media queries as the gate. Those report the device's static hardware
 * capability, and on touchscreen laptops/2-in-1s, Chrome and Edge on
 * Windows often report `hover: none` / `pointer: coarse` any time touch
 * hardware is present at all — even while the person is using a mouse.
 * Instead we listen for real Pointer Events and react to `pointerType`
 * directly: a "mouse" event turns the cursor on, a "touch" event turns
 * it off. This is correct on every device, hybrid or not.
 *
 * Two visual states only, by design: a tennis ball follows the pointer
 * at rest, and after 3s of no movement it morphs into a cycling sport
 * emoji (handled by useIdleCursor). There is intentionally no hover
 * state — no label swap, no size change on buttons/links.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { x, y } = useMousePosition();
  const { isIdle, idleIcon } = useIdleCursor();

  // Tighter spring than before — less "floaty" lag, closer to 1:1 tracking
  // while still smoothing out raw mousemove jitter.
  const springX = useSpring(x, { stiffness: 700, damping: 50, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 700, damping: 50, mass: 0.2 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(prefersReducedMotion);

    if (process.env.NODE_ENV !== "production") {
      console.log("[CustomCursor] reducedMotion:", prefersReducedMotion);
    }

    if (prefersReducedMotion) return;

    function handlePointerDown(e: PointerEvent) {
      const isMouse = e.pointerType === "mouse";
      setEnabled(isMouse);
      document.documentElement.classList.toggle("custom-cursor-active", isMouse);
    }

    // Some browsers fire a pointermove for the very first mouse motion
    // before any click — catch that too so the cursor can turn on without
    // requiring a click first.
    function handlePointerMove(e: PointerEvent) {
      if (e.pointerType === "mouse") {
        setEnabled(true);
        document.documentElement.classList.add("custom-cursor-active");
      }
    }

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove, {
      once: true,
    });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    springX.set(x);
    springY.set(y);
  }, [x, y, springX, springY]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    (window as unknown as { __cursorDebug?: unknown }).__cursorDebug = {
      enabled,
      reducedMotion,
      isIdle,
    };
  }, [enabled, reducedMotion, isIdle]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2"
    >
      <AnimatePresence mode="wait">
        {isIdle ? (
          <motion.div
            key={idleIcon}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="gradient-orange flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-xl ring-2 ring-white/40"
          >
            {idleIcon}
          </motion.div>
        ) : (
          <motion.div
            key="tennis-ball"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <TennisBall />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TennisBall() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="drop-shadow-md"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" fill="#d4f000" stroke="#a8c400" strokeWidth="0.75" />
      <path
        d="M2.5 5 Q9 10 2.5 15"
        stroke="#ffffff"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M17.5 5 Q11 10 17.5 15"
        stroke="#ffffff"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
