"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "none";
  rotate?: boolean;
  delay?: number;
  className?: string;
}

const offsets = {
  up: { y: 24, x: 0 },
  left: { y: 0, x: -24 },
  right: { y: 0, x: 24 },
  none: { y: 0, x: 0 },
};

/**
 * Wraps any content (including server-rendered children) in a
 * scroll-triggered fade/slide/rotate reveal. Fires once, respects
 * prefers-reduced-motion automatically (framer-motion + our global CSS
 * override both zero out the transition duration in that case).
 */
export function RevealOnScroll({
  children,
  direction = "up",
  rotate = false,
  delay = 0,
  className,
}: RevealOnScrollProps) {
  const offset = offsets[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: offset.y,
        x: offset.x,
        rotate: rotate ? -2 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

/** Use with StaggerItem children for a staggered grid reveal. */
export function StaggerGroup({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
