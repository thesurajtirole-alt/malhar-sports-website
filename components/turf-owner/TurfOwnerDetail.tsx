"use client";

import { useEffect, useState } from "react";

interface Turf {
  id: string;
  name: string;
  price_per_hour: number;
  opening_time: string;
  closing_time: string;
  slot_duration_minutes: number;
  is_active: boolean;
  is_approved: boolean;
}

interface Booking {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  customer_name: string;
  customer_phone: string;
  status: "confirmed" | "cancelled";
}

export function TurfOwnerDetail({ turf: initialTurf }: { turf: Turf }) {
  const [turf, setTurf] = useState(initialTurf);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Standard data-fetch-on-mount pattern — same category as other
    // legitimate effect-based loading elsewhere in this codebase.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingBookings(true);
    fetch(`/api/turf-owner/turfs/${turf.id}/bookings`)
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .finally(() => setLoadingBookings(false));
  }, [turf.id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch(`/api/turf-owner/turfs/${turf.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price_per_hour: turf.price_per_hour,
        opening_time: turf.opening_time,
        closing_time: turf.closing_time,
        is_active: turf.is_active,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <h1 className="font-display text-3xl normal-case tracking-normal">
        {turf.name}
      </h1>

      {!turf.is_approved && (
        <div className="mt-4 rounded-2xl border border-orange/30 bg-orange/5 p-4 text-sm text-orange-deep">
          ⏳ Ye turf abhi Malhar Sports team ke approval ka wait kar raha
          hai. Approve hone ke baad hi customers ko dikhega aur book kar
          payenge — tab tak tum settings adjust kar sakte ho.
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="mt-6 grid gap-4 rounded-card border border-tape p-6 sm:grid-cols-2"
      >
        <label className="text-sm text-ink/70">
          Price per hour (₹)
          <input
            type="number"
            value={turf.price_per_hour}
            onChange={(e) =>
              setTurf({ ...turf, price_per_hour: Number(e.target.value) })
            }
            className="mt-1 w-full rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={turf.is_active}
            onChange={(e) => setTurf({ ...turf, is_active: e.target.checked })}
            className="h-4 w-4"
          />
          Bookings ke liye visible (uncheck karo temporarily band karne ke liye)
        </label>
        <label className="text-sm text-ink/70">
          Opening time
          <input
            type="time"
            value={turf.opening_time}
            onChange={(e) => setTurf({ ...turf, opening_time: e.target.value })}
            className="mt-1 w-full rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
          />
        </label>
        <label className="text-sm text-ink/70">
          Closing time
          <input
            type="time"
            value={turf.closing_time}
            onChange={(e) => setTurf({ ...turf, closing_time: e.target.value })}
            className="mt-1 w-full rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="rounded-pill bg-orange px-6 py-2.5 text-sm font-semibold text-white sm:col-span-2"
        >
          {saving ? "Saving..." : saved ? "✓ Saved" : "Save Changes"}
        </button>
      </form>

      <h2 className="mb-4 mt-10 font-display text-xl normal-case tracking-normal">
        Bookings
      </h2>
      <div className="overflow-x-auto rounded-card border border-tape">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loadingBookings && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-ink/50">
                  Loading...
                </td>
              </tr>
            )}
            {!loadingBookings && bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-ink/50">
                  Koi bookings nahi hai abhi.
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-tape">
                <td className="p-3">{b.booking_date}</td>
                <td className="p-3">
                  {b.start_time}–{b.end_time}
                </td>
                <td className="p-3">{b.customer_name}</td>
                <td className="p-3">{b.customer_phone}</td>
                <td className="p-3">
                  <span
                    className={
                      b.status === "confirmed"
                        ? "text-turf-deep"
                        : "text-ink/40 line-through"
                    }
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
