import type { Metadata } from "next";
import { business } from "@/lib/business";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export const metadata: Metadata = {
  title: "Store Visit Karo",
  description:
    "Malhar Sports and Shoes ka address, timings aur contact — Dravid Nagar, Indore.",
  alternates: { canonical: "/store" },
};

export default function StorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="text-center font-display text-4xl md:text-5xl">
        Store Pe Milte Hai
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
        Aao, gear feel karo, sahi advice lo — online kabhi wo feeling nahi
        de sakta.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-tape p-6">
          <MapPin className="h-6 w-6 text-orange" />
          <p className="mt-3 font-semibold">Address</p>
          <p className="mt-1 text-sm text-ink/70">{business.address.full}</p>
          <a
            href={business.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-orange hover:underline"
          >
            Google Maps Pe Kholo →
          </a>
        </div>

        <div className="rounded-2xl border border-tape p-6">
          <Clock className="h-6 w-6 text-orange" />
          <p className="mt-3 font-semibold">Timings</p>
          <p className="mt-1 text-sm text-ink/70">{business.hours.display}</p>
        </div>

        <div className="rounded-2xl border border-tape p-6">
          <Phone className="h-6 w-6 text-orange" />
          <p className="mt-3 font-semibold">Call Karo</p>
          <a
            href={business.telLink}
            className="mt-1 block text-sm font-semibold text-ink hover:text-orange"
          >
            {business.phone}
          </a>
        </div>

        <div className="rounded-2xl border border-tape bg-turf/10 p-6">
          <MessageCircle className="h-6 w-6 text-turf-deep" />
          <p className="mt-3 font-semibold">WhatsApp</p>
          <p className="mt-1 text-sm text-ink/70">
            Sabse fast reply yahi milega.
          </p>
          <a
            href={business.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-pill bg-turf px-5 py-2 text-sm font-semibold text-white"
          >
            WhatsApp Karo
          </a>
        </div>

        {business.social.instagram && (
          <div className="rounded-2xl border border-tape p-6">
            <InstagramIcon className="h-6 w-6 text-orange" />
            <p className="mt-3 font-semibold">Instagram</p>
            <p className="mt-1 text-sm text-ink/70">
              Naye arrivals aur offers yaha dekho.
            </p>
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-orange hover:underline"
            >
              @malhar_sports_and_shoes_ →
            </a>
          </div>
        )}
      </div>

      <div className="mt-8 overflow-hidden rounded-card border border-tape">
        <iframe
          title="Malhar Sports and Shoes location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            business.address.full
          )}&output=embed`}
          width="100%"
          height="360"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
