import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, Clock } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TurfBookingWidget } from "@/components/turf/TurfBookingWidget";

interface Turf {
  id: string;
  name: string;
  address: string;
  area: string | null;
  contact_phone: string;
  sport_types: string[];
  price_per_hour: number;
  opening_time: string;
  closing_time: string;
  image_url: string | null;
}

async function getTurf(id: string): Promise<Turf | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  const { data } = await supabase
    .from("turfs")
    .select(
      "id, name, address, area, contact_phone, sport_types, price_per_hour, opening_time, closing_time, image_url"
    )
    .eq("id", id)
    .eq("is_active", true)
    .maybeSingle();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const turf = await getTurf(id);
  if (!turf) return {};
  return {
    title: `${turf.name} — Book Karo`,
    description: `${turf.name} book karo — ${turf.sport_types.join(", ")}. ₹${turf.price_per_hour}/hour.`,
  };
}

export default async function TurfDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const turf = await getTurf(id);
  if (!turf) notFound();

  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="aurora-soft" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 md:px-6">
        <RevealOnScroll>
          {turf.image_url && (
            <div className="mb-6 aspect-[16/9] overflow-hidden rounded-card bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={turf.image_url}
                alt={turf.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <h1 className="font-display text-4xl md:text-5xl">{turf.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {turf.sport_types.map((s) => (
              <span
                key={s}
                className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-2 text-sm text-ink/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              {turf.address}
            </div>
            <div className="flex items-start gap-2 text-sm text-ink/70">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              {turf.opening_time}–{turf.closing_time}
            </div>
            <div className="flex items-start gap-2 text-sm text-ink/70">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              {turf.contact_phone}
            </div>
          </div>

          <p className="mt-4 font-display text-2xl text-orange">
            ₹{turf.price_per_hour}
            <span className="text-base font-normal text-ink/60"> /hour</span>
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mt-8">
            <TurfBookingWidget turfId={turf.id} turfName={turf.name} />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <p className="mt-6 text-center text-xs text-ink/50">
            Ye turf Malhar Sports ka nahi hai — hum sirf booking mein madad
            kar rahe hai. Koi confusion ho to seedha turf ko call karo:{" "}
            {turf.contact_phone}
          </p>
        </RevealOnScroll>
      </div>
    </div>
  );
}
