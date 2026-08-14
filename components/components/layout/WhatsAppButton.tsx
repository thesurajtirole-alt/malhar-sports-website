"use client";

import { MessageCircle } from "lucide-react";
import { business } from "@/lib/business";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppButton() {
  return (
    <a
      href={`${business.whatsappLink}?text=${encodeURIComponent(
        "Namaste! Malhar Sports se kuch pucchna tha — "
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp par Malhar Sports ko message karo"
      onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-turf px-4 py-3 font-body font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95 md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
      <span className="hidden sm:inline">Confuse Ho? Pucho Na</span>
    </a>
  );
}
