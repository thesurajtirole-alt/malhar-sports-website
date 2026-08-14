"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="scroll-progress-bar fixed left-0 top-0 z-[60] w-full"
      aria-hidden="true"
    />
  );
}
