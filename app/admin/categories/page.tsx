"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  parent_id: string | null;
}

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  function load() {
    setLoading(true);
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  // Standard data-fetch-on-mount pattern — same category as other
  // legitimate effect-based loading elsewhere in this codebase.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(load, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, parent_id: parentId || undefined }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to add");
      return;
    }
    setName("");
    setParentId("");
    load();
  }

  async function handleDelete(id: string, hasChildren: boolean) {
    const msg = hasChildren
      ? "Ye category delete karne se iski saari subcategories bhi delete ho jayengi. Sure ho?"
      : "Delete this category?";
    if (!confirm(msg)) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    load();
  }

  const topLevel = categories.filter((c) => !c.parent_id);
  const childrenOf = (parentId: string) =>
    categories.filter((c) => c.parent_id === parentId);

  return (
    <div>
      <h1 className="font-display text-3xl normal-case tracking-normal">
        Categories
      </h1>
      <p className="mt-1 text-ink/60">
        Products ko organize karne ke liye categories aur subcategories
        banao. Ye dropdown mein New Arrivals form mein dikhengi.
      </p>

      <form
        onSubmit={handleAdd}
        className="mt-8 grid gap-3 rounded-card border border-tape p-6 sm:grid-cols-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name (e.g. Cricket, Running Shoes)"
          required
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
        />
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
        >
          <option value="">— Top-level category (no parent) —</option>
          {topLevel.map((c) => (
            <option key={c.id} value={c.id}>
              Subcategory under: {c.name}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-orange-deep sm:col-span-2">{error}</p>}
        <button
          type="submit"
          className="rounded-pill bg-orange px-6 py-2.5 text-sm font-semibold text-white sm:col-span-2"
        >
          Add Category
        </button>
      </form>

      <div className="mt-8 grid gap-3">
        {loading && <p className="text-ink/50">Loading...</p>}
        {!loading && topLevel.length === 0 && (
          <p className="text-ink/50">Koi categories nahi hai abhi.</p>
        )}
        {topLevel.map((cat) => {
          const children = childrenOf(cat.id);
          return (
            <div key={cat.id} className="rounded-2xl border border-tape p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{cat.name}</p>
                <button
                  onClick={() => handleDelete(cat.id, children.length > 0)}
                  className="text-xs font-semibold text-orange-deep hover:underline"
                >
                  Delete
                </button>
              </div>
              {children.length > 0 && (
                <div className="mt-3 space-y-2 border-l-2 border-tape pl-4">
                  {children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-ink/70">↳ {child.name}</span>
                      <button
                        onClick={() => handleDelete(child.id, false)}
                        className="text-xs font-semibold text-orange-deep hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
