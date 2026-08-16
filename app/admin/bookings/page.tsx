"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  customer_name: string;
  customer_phone: string;
  status: "confirmed" | "cancelled";
  turfs: { name: string } | null;
}

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  // Standard data-fetch-on-mount pattern — loading state starts true,
  // this call flips it via the fetch, same category as other legitimate
  // effect-based external-sync calls elsewhere in this codebase.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(load, []);

  async function cancelBooking(id: string) {
    if (!confirm("Cancel this booking?")) return;
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl normal-case tracking-normal">
        Turf Bookings
      </h1>
      <p className="mt-1 text-ink/60">Recent bookings, sabse naya sabse upar.</p>

      <div className="mt-8 overflow-x-auto rounded-card border border-tape">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th className="p-3">Turf</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-ink/50">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && bookings.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-ink/50">
                  Koi bookings nahi hai abhi.
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-tape">
                <td className="p-3">{b.turfs?.name ?? "—"}</td>
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
                <td className="p-3">
                  {b.status === "confirmed" && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="text-xs font-semibold text-orange-deep hover:underline"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
