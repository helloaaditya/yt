"use client";

import Link from "next/link";
import { AssetImage } from "@/components/AssetImage";
import { getEffectivePrice } from "@/lib/supabase/types";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  short_description: string | null;
  price_inr: number;
  offer_price_inr?: number | null;
  image_url: string | null;
}

export function FeaturedGrid({ products, placeholderFiles = [], placeholderFolder = "channel-dashboard" }: { products: Product[]; placeholderFiles?: string[]; placeholderFolder?: string }) {
  if (!products?.length) {
    return (
      <div className="col-span-full rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)]/50 p-12 text-center text-[var(--foreground)]/60 opacity-0-init animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
        No featured products yet. Add some in the admin panel.
      </div>
    );
  }

  return (
    <>
      {products.map((p, i) => (
        <Link
          key={p.id}
          href={`/product/${p.slug}`}
          className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition hover:border-[var(--primary)]/50 hover-lift opacity-0-init animate-fade-in-up"
          style={{ animationDelay: `${0.1 + i * 0.08}s`, animationFillMode: "forwards" }}
        >
          <div className="relative h-40 rounded-xl overflow-hidden bg-[var(--muted)] flex items-center justify-center text-4xl hover-zoom">
            {p.image_url ? (
              <img src={p.image_url} alt="" className="h-full w-full object-contain" />
            ) : (
              <>
                <span className="absolute inset-0 flex items-center justify-center text-[var(--primary)]/80" aria-hidden>▶</span>
                <AssetImage folder={placeholderFolder} file={placeholderFiles[i % placeholderFiles.length]} alt={p.name} className="relative z-10" />
              </>
            )}
          </div>
          <h3 className="mt-4 font-semibold group-hover:text-[var(--primary)]">{p.name}</h3>
          <p className="mt-1 text-sm text-[var(--foreground)]/70 line-clamp-2">{p.short_description || p.description}</p>
          <p className="mt-4 font-medium text-[var(--primary)]">
            {p.offer_price_inr != null ? (
              <>
                <span className="text-[var(--foreground)]/60 line-through mr-2">₹{Number(p.price_inr).toLocaleString()}</span>
                ₹{Number(p.offer_price_inr).toLocaleString()}
              </>
            ) : (
              <>₹{Number(getEffectivePrice(p)).toLocaleString()}</>
            )}
          </p>
        </Link>
      ))}
    </>
  );
}
