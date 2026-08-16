"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number | null;
  image_url: string | null;
  is_active: boolean;
}

export default function NewArrivalsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function loadProducts() {
    setLoading(true);
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  // Standard data-fetch-on-mount pattern — loading state starts true,
  // this call flips it via the fetch, same category as other legitimate
  // effect-based external-sync calls elsewhere in this codebase.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(loadProducts, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setImageUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description: description || undefined,
        category: category || undefined,
        price: price ? Number(price) : undefined,
        image_url: imageUrl || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to add");
      return;
    }
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setImageUrl("");
    loadProducts();
  }

  async function toggleActive(p: Product) {
    await fetch(`/api/admin/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    loadProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  return (
    <div>
      <h1 className="font-display text-3xl normal-case tracking-normal">
        New Arrivals
      </h1>
      <p className="mt-1 text-ink/60">
        Homepage pe dikhne wale naye products yaha manage karo.
      </p>

      <form
        onSubmit={handleAdd}
        className="mt-8 grid gap-3 rounded-card border border-tape p-6 sm:grid-cols-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          required
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g. Cricket, Running)"
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price (₹, optional)"
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description (optional)"
          rows={2}
          className="rounded-xl border border-tape px-4 py-2.5 text-sm outline-none focus:border-orange sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink/70">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 text-sm"
          />
          {uploading && <p className="mt-1 text-sm text-ink/50">Uploading...</p>}
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-2 h-20 w-20 rounded-lg object-cover"
            />
          )}
        </div>
        {error && <p className="text-sm text-orange-deep sm:col-span-2">{error}</p>}
        <button
          type="submit"
          disabled={uploading}
          className="rounded-pill bg-orange px-6 py-2.5 text-sm font-semibold text-white sm:col-span-2"
        >
          Add Product
        </button>
      </form>

      <div className="mt-8 grid gap-3">
        {loading && <p className="text-ink/50">Loading...</p>}
        {!loading && products.length === 0 && (
          <p className="text-ink/50">Koi products nahi hai abhi.</p>
        )}
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-2xl border border-tape p-4"
          >
            {p.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image_url}
                alt={p.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-lg bg-surface" />
            )}
            <div className="flex-1">
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-ink/60">
                {p.category} {p.price ? `· ₹${p.price}` : ""}
              </p>
            </div>
            <button
              onClick={() => toggleActive(p)}
              className={`rounded-pill px-3 py-1.5 text-xs font-semibold ${
                p.is_active
                  ? "bg-turf/10 text-turf-deep"
                  : "bg-surface text-ink/50"
              }`}
            >
              {p.is_active ? "Active" : "Hidden"}
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-sm font-semibold text-orange-deep hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
