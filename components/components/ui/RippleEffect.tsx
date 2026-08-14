"use client";

import { useEffect } from "react";

/**
 * Mounted once in the root layout. Listens for pointerdown anywhere,
 * and if the target is (or is inside) a button/anchor, spawns a
 * short-lived ripple span inside it — temporarily forcing
 * position:relative + overflow:hidden on that element if it doesn't
 * already have them, then restoring the original values afterward.
 */
export function RippleEffect() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    function handlePointerDown(e: PointerEvent) {
      const target = (e.target as HTMLElement)?.closest?.(
        "button, a"
      ) as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.8;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const prevPosition = target.style.position;
      const prevOverflow = target.style.overflow;
      const computedPosition = getComputedStyle(target).position;
      if (computedPosition === "static") {
        target.style.position = "relative";
      }
      target.style.overflow = "hidden";

      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.35)";
      ripple.style.pointerEvents = "none";
      ripple.style.transform = "scale(0)";
      ripple.style.opacity = "1";
      ripple.style.transition =
        "transform 500ms ease-out, opacity 500ms ease-out";
      ripple.setAttribute("aria-hidden", "true");

      target.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.transform = "scale(1)";
        ripple.style.opacity = "0";
      });

      setTimeout(() => {
        ripple.remove();
        target.style.position = prevPosition;
        target.style.overflow = prevOverflow;
      }, 550);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return null;
}
