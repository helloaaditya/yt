"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id?: string;
  slug: string;
  name: string;
  description: string | null;
  short_description: string | null;
  product_type: "course" | "one_to_one";
  price_inr: number;
  offer_price_inr?: number | null;
  image_url: string | null;
  featured: boolean;
  is_active: boolean;
  sort_order: number;
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    slug: product?.slug ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    short_description: product?.short_description ?? "",
    product_type: (product?.product_type ?? "course") as "course" | "one_to_one",
    price_inr: product?.price_inr ?? 0,
    offer_price_inr: product?.offer_price_inr ?? "",
    image_url: product?.image_url ?? "",
    featured: product?.featured ?? false,
    is_active: product?.is_active ?? true,
    sort_order: product?.sort_order ?? 0,
  });

  function slugify(s: string) {
    return s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch(product ? `/admin/products/${product.id}/api` : "/admin/products/new/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        slug: form.slug || slugify(form.name),
        price_inr: Number(form.price_inr),
        offer_price_inr: form.offer_price_inr !== "" && form.offer_price_inr != null ? Number(form.offer_price_inr) : null,
        sort_order: Number(form.sort_order),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to save");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Slug (URL)</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          placeholder={slugify(form.name) || "course-name"}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={form.product_type}
          onChange={(e) => setForm((f) => ({ ...f, product_type: e.target.value as "course" | "one_to_one" }))}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2"
        >
          <option value="course">Course</option>
          <option value="one_to_one">One-to-One</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Price (₹) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price_inr || ""}
            onChange={(e) => setForm((f) => ({ ...f, price_inr: e.target.value ? Number(e.target.value) : 0 }))}
            required
            placeholder="4999"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2"
          />
          <p className="mt-0.5 text-xs text-[var(--foreground)]/60">Regular / MRP</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Offer price (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.offer_price_inr ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, offer_price_inr: e.target.value === "" ? "" : Number(e.target.value) }))}
            placeholder="99"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2"
          />
          <p className="mt-0.5 text-xs text-[var(--foreground)]/60">Optional; customer pays this when set</p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Short description</label>
        <input
          type="text"
          value={form.short_description}
          onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={4}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="url"
          value={form.image_url}
          onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2"
        />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            className="rounded"
          />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
            className="rounded"
          />
          Active
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sort order</label>
        <input
          type="number"
          value={form.sort_order}
          onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) || 0 }))}
          className="w-32 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--primary)] px-6 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save"}
        </button>
        <Link
          href="/admin/products"
          className="rounded-lg border border-[var(--border)] px-6 py-2 font-medium hover:bg-[var(--muted)]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
