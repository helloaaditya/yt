"use client";

import Link from "next/link";

const ONE_TO_ONE_SLUG = "1-1-breakthrough-session"; // create this product in admin for ₹2,999

export function ThankYouUpsell() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border-2 border-amber-500/50 bg-amber-500/5 p-6">
        <h2 className="text-xl font-bold">🚨 WAIT — THIS IS DIFFERENT</h2>
        <p className="mt-4 text-[var(--foreground)]/90">
          Most people buy courses. Very few implement them properly. That&apos;s
          why some move fast… and most stay stuck.
        </p>
        <p className="mt-4 font-semibold">
          So I&apos;m offering something I normally don&apos;t.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold">🎯 PRIVATE 1:1 CHANNEL BREAKTHROUGH SESSION</h2>
        <p className="mt-2 text-[var(--foreground)]/90">
          This is a LIVE strategy session with me. We will break down:
        </p>
        <ul className="mt-4 space-y-2">
          {["Your niche", "Your channel positioning", "Your content structure", "Your monetization path", "Your scaling plan"].map(
            (item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[var(--accent)]">✔</span> {item}
              </li>
            )
          )}
        </ul>
        <p className="mt-4 font-medium">
          From zero → to structured roadmap. This is not theory. This is direct
          implementation guidance.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="font-bold">🧠 WHAT HAPPENS INSIDE THIS SESSION</h3>
        <p className="mt-2 text-sm text-[var(--foreground)]/80">
          In 60–90 minutes, we will:
        </p>
        <ul className="mt-3 space-y-1 text-sm">
          {[
            "Validate your faceless niche",
            "Design your content architecture",
            "Build your first 30-video roadmap",
            "Structure retention strategy",
            "Plan monetization eligibility",
            "Create your scaling blueprint",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span>🔹</span> {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-medium">
          You won&apos;t leave with &quot;motivation.&quot; You&apos;ll leave with
          direction.
        </p>
      </div>

      <div>
        <h3 className="font-bold">⚡ WHY THIS MATTERS</h3>
        <p className="mt-2 text-sm text-[var(--foreground)]/80">
          Most creators: watch content, feel inspired, take partial action, lose
          momentum. But with direct breakout planning you eliminate confusion,
          delay, wrong moves — and speed increases.
        </p>
      </div>

      <div>
        <h3 className="font-bold">💎 WHO THIS IS FOR</h3>
        <p className="mt-2 text-sm">This is only for:</p>
        <ul className="mt-2 space-y-1">
          {["Serious creators", "People ready to execute", "Those who want structured growth", "Those who want accountability"].map(
            (item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--accent)]">✔</span> {item}
              </li>
            )
          )}
        </ul>
        <p className="mt-2 text-sm italic text-[var(--foreground)]/70">
          Not for casual experimenters.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <p className="text-sm text-[var(--foreground)]/70">💰 NORMAL VALUE</p>
        <p className="mt-1 font-medium">
          Private YouTube Strategy Consulting: ₹9,999 – ₹19,999
        </p>
        <p className="mt-2 text-sm text-[var(--foreground)]/70">
          Because it requires direct time and involvement.
        </p>
      </div>

      <div className="rounded-xl border-2 border-[var(--primary)] bg-[var(--primary)]/10 p-6 text-center">
        <p className="text-sm font-semibold uppercase text-[var(--primary)]">
          🔥 TODAY ONLY (POST-PURCHASE OFFER)
        </p>
        <p className="mt-2 text-[var(--foreground)]/90">
          Since you already joined… You can book this private breakout session
          for:
        </p>
        <p className="mt-4 text-3xl font-bold text-[var(--primary)]">
          ₹2,999
        </p>
        <p className="mt-2 text-sm text-[var(--foreground)]/80">
          (One-time upgrade. Limited availability.)
        </p>
        <p className="mt-2 text-sm font-medium text-amber-500">
          Once you leave this page, this pricing disappears.
        </p>

        <div className="mt-8 space-y-4">
          <Link
            href={`/product/${ONE_TO_ONE_SLUG}`}
            className="block w-full rounded-lg bg-[var(--primary)] py-4 font-bold text-white hover:opacity-90"
          >
            YES, BOOK MY 1:1 BREAKTHROUGH SESSION
          </Link>
          <p className="text-xs text-[var(--foreground)]/60">
            Limited slots. Direct calendar booking.
          </p>
          <Link
            href="/dashboard"
            className="block text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
          >
            ❌ No thanks, I&apos;ll implement alone.
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="font-bold">🛡️ CLARITY GUARANTEE</h3>
        <p className="mt-2 text-sm text-[var(--foreground)]/80">
          If after the session you don&apos;t feel clear, structured, confident
          about execution — then it didn&apos;t do its job. This is about
          acceleration.
        </p>
      </div>

      <div className="text-center">
        <p className="font-semibold">🚀 FINAL DECISION</p>
        <p className="mt-2 text-sm text-[var(--foreground)]/80">
          You have two paths: figure everything out alone — or build your channel
          with direct architectural guidance.
        </p>
      </div>
    </div>
  );
}
