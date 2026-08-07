import type { Metadata } from "next";
import { business } from "@/lib/business";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Store Visit Karo",
  description:
    "Malhar Sports and Shoes ka address, timings aur contact — Dravid Nagar, Indore.",
  alternates: { canonical: "/store" },
};

export default function StorePage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="aurora-soft" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 md:px-6">
        <RevealOnScroll>
          <h1 className="text-center font-display text-4xl md:text-5xl">
            Store Pe Milte Hai
          </h1>
          <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
            Aao, gear feel karo, sahi advice lo — online kabhi wo feeling nahi
            de sakta.
          </p>
        </RevealOnScroll>

        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2">
          <StaggerItem>
            <div className="rounded-2xl border border-tape p-6 transition-all hover:-translate-y-1 hover:shadow-md">
          <MapPin className="h-6 w-6 text-orange" />
          <p className="mt-3 font-semibold">Address</p>
          <p className="mt-1 text-sm text-ink/70">{business.address.full}</p>
          <a
            href={business.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Explore →"
            className="mt-3 inline-block text-sm font-semibold text-orange hover:underline"
          >
            Google Maps Pe Kholo →
          </a>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-2xl border border-tape p-6 transition-all hover:-translate-y-1 hover:shadow-md">
          <Clock className="h-6 w-6 text-orange" />
          <p className="mt-3 font-semibold">Timings</p>
          <p className="mt-1 text-sm text-ink/70">{business.hours.display}</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-2xl border border-tape p-6 transition-all hover:-translate-y-1 hover:shadow-md">
          <Phone className="h-6 w-6 text-orange" />
          <p className="mt-3 font-semibold">Call Karo</p>
          <a
            href={business.telLink}
            className="mt-1 block text-sm font-semibold text-ink hover:text-orange"
          >
            {business.phone}
          </a>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-2xl border border-tape bg-turf/10 p-6 transition-all hover:-translate-y-1 hover:shadow-md">
          <MessageCircle className="h-6 w-6 text-turf-deep" />
          <p className="mt-3 font-semibold">WhatsApp</p>
          <p className="mt-1 text-sm text-ink/70">
            Sabse fast reply yahi milega.
          </p>
          <a
            href={business.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Explore →"
            className="mt-3 inline-block rounded-pill bg-turf px-5 py-2 text-sm font-semibold text-white"
          >
            WhatsApp Karo
          </a>
            </div>
          </StaggerItem>

        {business.social.instagram && (
            <StaggerItem>
              <div className="rounded-2xl border border-tape p-6 transition-all hover:-translate-y-1 hover:shadow-md">
            <InstagramIcon className="h-6 w-6 text-orange" />
            <p className="mt-3 font-semibold">Instagram</p>
            <p className="mt-1 text-sm text-ink/70">
              Naye arrivals aur offers yaha dekho.
            </p>
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Explore →"
              className="mt-3 inline-block text-sm font-semibold text-orange hover:underline"
            >
              @malhar_sports_and_shoes_ →
            </a>
              </div>
            </StaggerItem>
        )}
        </StaggerGroup>

        <RevealOnScroll delay={0.1}>
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
        </RevealOnScroll>
      </div>
    </div>
  );
}
