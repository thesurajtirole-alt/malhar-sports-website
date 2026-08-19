"use client";

import { useState } from "react";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function ListYourTurfPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [sportTypes, setSportTypes] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [openingTime, setOpeningTime] = useState("06:00");
  const [closingTime, setClosingTime] = useState("23:00");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!ownerEmail && !ownerPhone) {
      setError("Login ke liye apna email ya phone number zaroor daalo.");
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/turfs/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        address,
        area: area || undefined,
        contact_phone: contactPhone,
        sport_types: sportTypes.split(",").map((s) => s.trim()).filter(Boolean),
        price_per_hour: Number(pricePerHour),
        opening_time: openingTime,
        closing_time: closingTime,
        owner_email: ownerEmail || undefined,
        owner_phone: ownerPhone || undefined,
      }),
    });
    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "Submit nahi hua, dobara try karo.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="relative overflow-hidden">
        <BackgroundEffects variant="conic-soft" />
        <div className="relative mx-auto max-w-lg px-4 py-24 text-center md:px-6">
          <span className="text-5xl">✅</span>
          <h1 className="mt-4 font-display text-3xl normal-case tracking-normal">
            Submit Ho Gaya!
          </h1>
          <p className="mt-3 text-ink/70">
            Tera turf review ke liye submit ho gaya hai. Malhar Sports team
            check karke approve karegi — usके baad customers ko dikhna shuru
            ho jayega.
          </p>
          <p className="mt-4 text-sm text-ink/60">
            Abhi bhi tu apna dashboard access kar sakta hai — jis email/phone
            se sign in kiya tha, wahi se{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">
              /turf-owner
            </code>{" "}
            pe jaake dekh sakta hai (status pending dikhega jab tak approve
            nahi hota).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="conic-soft" />
      <div className="relative mx-auto max-w-2xl px-4 py-16 md:px-6">
        <RevealOnScroll>
          <h1 className="text-center font-display text-4xl md:text-5xl">
            Apna Turf List Karo
          </h1>
          <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
            Details bharo — Malhar Sports team review karke approve karegi,
            phir customers seedha book kar payenge.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-3 rounded-card border border-tape p-6 sm:grid-cols-2"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Turf name"
              required
              className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
            />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address"
              required
              className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
            />
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area (e.g. Vijay Nagar)"
              className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
            />
            <input
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Contact number (customers ke liye)"
              required
              className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
            />
            <input
              value={sportTypes}
              onChange={(e) => setSportTypes(e.target.value)}
              placeholder="Sports, comma-separated (Football, Cricket)"
              className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
            />
            <input
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              type="number"
              placeholder="Price per hour (₹)"
              required
              className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
            />
            <div />
            <label className="text-sm text-ink/70">
              Opening time
              <input
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                type="time"
                className="mt-1 w-full rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
              />
            </label>
            <label className="text-sm text-ink/70">
              Closing time
              <input
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                type="time"
                className="mt-1 w-full rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
              />
            </label>

            <div className="sm:col-span-2">
              <p className="mb-2 mt-2 text-sm font-semibold text-ink">
                Tera Login (dashboard access ke liye)
              </p>
              <p className="mb-2 text-xs text-ink/50">
                Ye tera email ya phone hoga jisse tu apna dashboard{" "}
                <code>/turf-owner</code> pe login karega — bookings dekhne
                aur price/timing badalne ke liye. Kam se kam ek zaroor bharo.
              </p>
            </div>
            <input
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              placeholder="Tera Google email"
              type="email"
              className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
            />
            <input
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              placeholder="Ya tera phone number"
              className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
            />

            {error && (
              <p className="text-sm text-orange-deep sm:col-span-2">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-pill bg-orange px-6 py-3 text-sm font-semibold text-white sm:col-span-2"
            >
              {submitting ? "Submit ho raha hai..." : "Review Ke Liye Submit Karo"}
            </button>
          </form>
        </RevealOnScroll>
      </div>
    </div>
  );
}
