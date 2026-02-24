"use client";

import Link from "next/link";
import { AssetImage } from "@/components/AssetImage";

export function HomeHero({
  firstImages = {},
  firstImageFolders = {},
}: {
  firstImages?: { buttons?: string; channelDashboard?: string; revenue?: string };
  firstImageFolders?: { buttons?: string; channelDashboard?: string; revenue?: string };
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/5" />
      <div className="absolute inset-0 flex items-center justify-end opacity-[0.08] max-md:opacity-[0.05] pointer-events-none">
        <div className="relative w-full max-w-2xl h-full -mr-32">
          <AssetImage folder={firstImageFolders.buttons ?? "buttons"} file={firstImages.buttons} alt="" className="object-contain object-right" />
        </div>
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          Grow your YouTube channel
          <br />
          <span className="text-[var(--primary)]">with proven courses</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--foreground)]/80 opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          Professional courses and one-to-one channel setup from experienced creators. Learn strategy, monetization, and growth—then get your channel set up with expert help.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
          <Link
            href="/blueprint"
            className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:opacity-90 transition hover-lift"
          >
            Get the Blueprint
          </Link>
          <Link
            href="/courses"
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-medium hover:bg-[var(--muted)] transition hover-lift"
          >
            Browse courses
          </Link>
          <Link
            href="/one-to-one"
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-medium hover:bg-[var(--muted)] transition hover-lift"
          >
            One-to-One setup
          </Link>
        </div>
        {/* Proof strip: small images from assets */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
          <div className="h-16 w-28 rounded-lg overflow-hidden bg-[var(--muted)] hover-zoom">
            <AssetImage folder={firstImageFolders.channelDashboard ?? "channel-dashboard"} file={firstImages.channelDashboard} alt="Growth proof" />
          </div>
          <div className="h-16 w-28 rounded-lg overflow-hidden bg-[var(--muted)] hover-zoom">
            <AssetImage folder={firstImageFolders.revenue ?? "revenue"} file={firstImages.revenue} alt="Revenue proof" />
          </div>
          <div className="h-16 w-28 rounded-lg overflow-hidden bg-[var(--muted)] hover-zoom">
            <AssetImage folder={firstImageFolders.buttons ?? "buttons"} file={firstImages.buttons} alt="Play button" />
          </div>
        </div>
      </div>
    </section>
  );
}
