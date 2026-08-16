"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface Slot {
  startTime: string;
  endTime: string;
  available: boolean;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function nextNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function formatDayLabel(iso: string) {
  const d = new Date(iso + "T00:00:00");
  const isToday = iso === todayISO();
  if (isToday) return "Aaj";
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" });
}

export function TurfBookingWidget({
  turfId,
  turfName,
}: {
  turfId: string;
  turfName: string;
}) {
  const days = nextNDays(7);
  const [selectedDate, setSelectedDate] = useState(days[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    // Standard data-fetch-on-mount/dependency-change pattern: kicks off
    // a fetch for the newly selected date's slots. Same category as
    // other legitimate effect-based data-loading elsewhere in this app.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingSlots(true);
    setSelectedSlot(null);
    fetch(`/api/turfs/${turfId}/slots?date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .finally(() => setLoadingSlots(false));
  }, [turfId, selectedDate]);

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/turfs/${turfId}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          customerName: name,
          customerPhone: phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Booking fail hui, dobara try karo.");
        setSubmitting(false);
        // Refresh slots since this one might now be taken
        fetch(`/api/turfs/${turfId}/slots?date=${selectedDate}`)
          .then((r) => r.json())
          .then((d) => setSlots(d.slots ?? []));
        return;
      }
      trackEvent("turf_booking_confirmed", { turf_id: turfId });
      setConfirmed(true);
    } catch {
      setError("Kuch gadbad hui — dobara try karo.");
      setSubmitting(false);
    }
  }

  if (confirmed && selectedSlot) {
    return (
      <div className="rounded-card border border-turf/30 bg-turf/5 p-8 text-center">
        <span className="text-4xl">🎉</span>
        <h3 className="mt-3 font-display text-2xl normal-case tracking-normal">
          Booking Confirm Ho Gayi!
        </h3>
        <p className="mt-2 text-ink/70">
          {turfName} — {formatDayLabel(selectedDate)}, {selectedSlot.startTime}
          –{selectedSlot.endTime}
        </p>
        <p className="mt-4 text-sm text-ink/60">
          {name}, {phone} ke naam pe book hua hai. Waqt pe pahunch jaana.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-tape p-6 md:p-8">
      <h3 className="font-display text-xl normal-case tracking-normal">
        Slot Book Karo
      </h3>

      {/* Day picker */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDate(day)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold ${
              selectedDate === day
                ? "bg-ink text-white"
                : "bg-surface text-ink/70 hover:bg-tape"
            }`}
          >
            {formatDayLabel(day)}
          </button>
        ))}
      </div>

      {/* Slot grid */}
      <div className="mt-4">
        {loadingSlots ? (
          <p className="text-sm text-ink/50">Slots load ho rahe hai...</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-ink/50">Is din koi slots available nahi.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {slots.map((slot) => (
              <button
                key={slot.startTime}
                disabled={!slot.available}
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${
                  !slot.available
                    ? "cursor-not-allowed bg-surface text-ink/30 line-through"
                    : selectedSlot?.startTime === slot.startTime
                      ? "bg-orange text-white"
                      : "border border-tape text-ink/80 hover:border-orange"
                }`}
              >
                {slot.startTime}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Booking form */}
      {selectedSlot && (
        <form onSubmit={handleBook} className="mt-6 space-y-3 border-t border-tape pt-6">
          <p className="text-sm font-semibold text-ink">
            {formatDayLabel(selectedDate)}, {selectedSlot.startTime}–
            {selectedSlot.endTime} ke liye book karo:
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Naam"
            required
            className="w-full rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile number"
            required
            type="tel"
            className="w-full rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
          />
          {error && <p className="text-sm text-orange-deep">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-pill bg-orange py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Booking ho rahi hai..." : "Slot Confirm Karo"}
          </button>
        </form>
      )}
    </div>
  );
}
