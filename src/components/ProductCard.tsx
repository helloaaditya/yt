"use client";

import Link from "next/link";
import { AssetImage } from "@/components/AssetImage";
import { getEffectivePrice } from "@/lib/supabase/types";

interface ProductCardProps {
  slug: string;
  name: string;
  description: string | null;
  short_description: string | null;
  price_inr: number;
  offer_price_inr?: number | null;
  image_url: string | null;
  type: "course" | "one_to_one";
  index: number;
  /** Filename from assets manifest for placeholder (e.g. "screenshot.png") */
  placeholderFile?: string;
  /** Actual folder path for URL (e.g. "channel dashboard") */
  placeholderFolder?: string;
}

export function ProductCard(p: ProductCardProps) {
  const placeholder = p.type === "course" ? "channel-dashboard" : "viral-video-engineering";
  const fallbackIcon = p.type === "course" ? "▶" : "1:1";

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition hover:border-[var(--primary)]/50 hover-lift opacity-0-init animate-fade-in-up"
      style={{ animationDelay: `${Math.min(p.index, 12) * 0.06}s`, animationFillMode: "forwards" }}
    >
      <div className="relative aspect-video bg-[var(--muted)] flex items-center justify-center overflow-hidden">
        {p.image_url ? (
          <img src={p.image_url} alt="" className="h-full w-full object-contain hover-zoom" />
        ) : (
          <>
            <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl text-[var(--primary)]/80 z-0">
              {fallbackIcon}
            </span>
            <AssetImage
              folder={p.placeholderFolder ?? placeholder}
              file={p.placeholderFile}
              alt={p.name}
              className="relative z-10 h-full w-full"
              hoverZoom
            />
          </>
        )}
      </div>
      <div className="p-5">
        <h2 className="font-semibold group-hover:text-[var(--primary)]">{p.name}</h2>
        <p className="mt-2 text-sm text-[var(--foreground)]/70 line-clamp-2">{p.short_description || p.description}</p>
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
      </div>
    </Link>
  );
}
