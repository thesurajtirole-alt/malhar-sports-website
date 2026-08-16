"use client";

import { useEffect, useState } from "react";

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
  slot_duration_minutes: number;
  owner_email: string | null;
  owner_phone: string | null;
  is_active: boolean;
}

export default function TurfsAdminPage() {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [sportTypes, setSportTypes] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [openingTime, setOpeningTime] = useState("06:00");
  const [closingTime, setClosingTime] = useState("23:00");
  const [slotDuration, setSlotDuration] = useState("60");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");

  function load() {
    setLoading(true);
    fetch("/api/admin/turfs")
      .then((r) => r.json())
      .then((data) => setTurfs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  // Standard data-fetch-on-mount pattern — loading state starts true,
  // this call flips it via the fetch, same category as other legitimate
  // effect-based external-sync calls elsewhere in this codebase.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(load, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/turfs", {
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
        slot_duration_minutes: Number(slotDuration),
        owner_email: ownerEmail || undefined,
        owner_phone: ownerPhone || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to add");
      return;
    }
    setName("");
    setAddress("");
    setArea("");
    setContactPhone("");
    setSportTypes("");
    setPricePerHour("");
    setOwnerEmail("");
    setOwnerPhone("");
    load();
  }

  async function toggleActive(turf: Turf) {
    await fetch(`/api/admin/turfs/${turf.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !turf.is_active }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this turf? Existing bookings will also be removed.")) return;
    await fetch(`/api/admin/turfs/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl normal-case tracking-normal">
        Turfs
      </h1>
      <p className="mt-1 text-ink/60">
        Booking ke liye turfs add karo — ye tere apne nahi, doosro ke turfs hai jo tu list kar raha hai.
      </p>

      <form
        onSubmit={handleAdd}
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
          placeholder="Turf owner's contact number"
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
        <input
          value={slotDuration}
          onChange={(e) => setSlotDuration(e.target.value)}
          type="number"
          placeholder="Slot length in minutes (default 60)"
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
        />
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
          <p className="mb-2 text-sm font-semibold text-ink">
            Turf Owner Login (optional)
          </p>
          <p className="mb-2 text-xs text-ink/50">
            Agar diya, ye owner apna khud ka dashboard dekh payega —{" "}
            <code>/turf-owner</code> pe sign in karke. Google email ya phone
            number, jo bhi wo login ke liye use karega.
          </p>
        </div>
        <input
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          placeholder="Owner's Google email (optional)"
          type="email"
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
        />
        <input
          value={ownerPhone}
          onChange={(e) => setOwnerPhone(e.target.value)}
          placeholder="Owner's phone number (optional)"
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
        />
        {error && <p className="text-sm text-orange-deep sm:col-span-2">{error}</p>}
        <button
          type="submit"
          className="rounded-pill bg-orange px-6 py-2.5 text-sm font-semibold text-white sm:col-span-2"
        >
          Add Turf
        </button>
      </form>

      <div className="mt-8 grid gap-3">
        {loading && <p className="text-ink/50">Loading...</p>}
        {!loading && turfs.length === 0 && (
          <p className="text-ink/50">Koi turfs nahi hai abhi.</p>
        )}
        {turfs.map((t) => (
          <div key={t.id} className="rounded-2xl border border-tape p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-ink/60">{t.address}</p>
                <p className="mt-1 text-sm text-ink/70">
                  {t.sport_types.join(", ")} · ₹{t.price_per_hour}/hr ·{" "}
                  {t.opening_time}–{t.closing_time} · {t.slot_duration_minutes}min slots
                </p>
                <p className="text-sm text-ink/50">Contact: {t.contact_phone}</p>
                {(t.owner_email || t.owner_phone) && (
                  <p className="mt-1 text-xs text-turf-deep">
                    Owner login: {t.owner_email || t.owner_phone}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button
                  onClick={() => toggleActive(t)}
                  className={`rounded-pill px-3 py-1 text-xs font-semibold ${
                    t.is_active ? "bg-turf/10 text-turf-deep" : "bg-surface text-ink/50"
                  }`}
                >
                  {t.is_active ? "Live" : "Hidden"}
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-xs font-semibold text-orange-deep hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
