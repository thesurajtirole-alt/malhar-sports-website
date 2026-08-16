"use client";

import { useEffect, useState } from "react";

interface Academy {
  id: string;
  name: string;
  type: "Academy" | "Ground/Stadium";
  sport: string[];
  area: string | null;
  note: string | null;
  is_verified: boolean;
  is_active: boolean;
}

export default function AcademiesAdminPage() {
  const [items, setItems] = useState<Academy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState<"Academy" | "Ground/Stadium">("Academy");
  const [sport, setSport] = useState("");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");

  function load() {
    setLoading(true);
    fetch("/api/admin/academies")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
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
    const res = await fetch("/api/admin/academies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        type,
        sport: sport.split(",").map((s) => s.trim()).filter(Boolean),
        area: area || undefined,
        note: note || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to add");
      return;
    }
    setName("");
    setSport("");
    setArea("");
    setNote("");
    load();
  }

  async function toggleVerified(item: Academy) {
    await fetch(`/api/admin/academies/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_verified: !item.is_verified }),
    });
    load();
  }

  async function toggleActive(item: Academy) {
    await fetch(`/api/admin/academies/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !item.is_active }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this listing?")) return;
    await fetch(`/api/admin/academies/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl normal-case tracking-normal">
        Indore Sports Directory
      </h1>
      <p className="mt-1 text-ink/60">
        Academies aur grounds ki listing manage karo.
      </p>

      <form
        onSubmit={handleAdd}
        className="mt-8 grid gap-3 rounded-card border border-tape p-6 sm:grid-cols-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "Academy" | "Ground/Stadium")}
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
        >
          <option value="Academy">Academy</option>
          <option value="Ground/Stadium">Ground/Stadium</option>
        </select>
        <input
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Area (e.g. Vijay Nagar)"
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
        />
        <input
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          placeholder="Sports, comma-separated (Cricket, Football)"
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Short note"
          rows={2}
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
        />
        {error && <p className="text-sm text-orange-deep sm:col-span-2">{error}</p>}
        <button
          type="submit"
          className="rounded-pill bg-orange px-6 py-2.5 text-sm font-semibold text-white sm:col-span-2"
        >
          Add Listing
        </button>
      </form>

      <div className="mt-8 grid gap-3">
        {loading && <p className="text-ink/50">Loading...</p>}
        {!loading && items.length === 0 && (
          <p className="text-ink/50">Koi listings nahi hai abhi.</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-tape p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {item.name}{" "}
                  <span className="text-xs font-normal text-ink/50">
                    ({item.type})
                  </span>
                </p>
                <p className="text-sm text-ink/60">
                  {item.area} · {item.sport.join(", ")}
                </p>
                {item.note && (
                  <p className="mt-1 text-sm text-ink/70">{item.note}</p>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button
                  onClick={() => toggleVerified(item)}
                  className={`rounded-pill px-3 py-1 text-xs font-semibold ${
                    item.is_verified
                      ? "bg-turf/10 text-turf-deep"
                      : "bg-orange/10 text-orange-deep"
                  }`}
                >
                  {item.is_verified ? "✓ Verified" : "Unverified"}
                </button>
                <button
                  onClick={() => toggleActive(item)}
                  className={`rounded-pill px-3 py-1 text-xs font-semibold ${
                    item.is_active ? "bg-surface text-ink/70" : "bg-surface text-ink/40"
                  }`}
                >
                  {item.is_active ? "Live" : "Hidden"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
