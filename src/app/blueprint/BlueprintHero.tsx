"use client";

import Link from "next/link";
import { AssetImage } from "@/components/AssetImage";

export function BlueprintHero({ firstImage, folderPath }: { firstImage?: string; folderPath: string }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--card)] py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 to-transparent z-10 pointer-events-none" />
      <div className="relative z-20 mx-auto max-w-5xl px-4">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              FACELESS YOUTUBE GROWTH BLUEPRINT
            </h1>
            <p className="mt-6 text-xl text-[var(--foreground)]/90 opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              The System Behind Multi-Channel, Multi-Play-Button Growth
            </p>
            <Link
              href="/product/faceless-youtube-growth-blueprint"
              className="mt-10 inline-block rounded-lg bg-[var(--primary)] px-8 py-4 text-lg font-bold text-white hover:opacity-90 hover-lift transition"
              style={{ animationDelay: "0.35s" }}
            >
              👉 Get Instant Access Now
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden opacity-0-init animate-scale-in hover-zoom" style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
            <div className="aspect-video max-h-80 bg-[var(--muted)]">
              <AssetImage folder={folderPath} file={firstImage} alt="Blueprint proof" animate hoverZoom priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
