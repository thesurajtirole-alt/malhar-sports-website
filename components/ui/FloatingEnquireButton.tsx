"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const FORM_URL = "https://forms.gle/TS1SeFwtdFJTKLEe6";

export function FloatingEnquireButton() {
  const { direction, pastThreshold, isScrolling } = useScrollDirection(200);

  // Visible once past 200px. Hidden only while actively scrolling down;
  // reappears the moment scrolling stops OR reverses to scrolling up.
  const visible = pastThreshold && !(isScrolling && direction === "down");

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Enquire →"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="animate-enquire-pulse gradient-orange fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-pill border border-white/20 px-5 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md md:bottom-28 md:right-8
            max-md:bottom-20 max-md:left-4 max-md:right-4 max-md:justify-center max-md:rounded-2xl"
        >
          📋 Enquire Now
        </motion.a>
      )}
    </AnimatePresence>
  );
}
