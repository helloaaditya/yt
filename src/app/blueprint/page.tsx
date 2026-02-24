import Link from "next/link";
import { ProofGallery } from "./ProofGallery";
import { BlueprintHero } from "./BlueprintHero";
import { getAssetFiles, getAssetFolder, ASSET_KEYS } from "@/lib/assets";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faceless YouTube Growth Blueprint | System Behind Multi-Play-Button Growth",
  description: "The system behind multi-channel, multi-play-button growth. Structure, retention, thumbnails — not motivation.",
};

const BONUSES = [
  { name: "Viral Acceleration Framework", value: "₹7,999", desc: "High-CTR growth triggers & format amplification system" },
  { name: "Passive Income Architecture Blueprint", value: "₹8,499", desc: "Monetization layering & revenue stacking strategy" },
  { name: "Channel Growth Domination Playbook", value: "₹9,999", desc: "Scalable niche positioning & algorithm leverage" },
  { name: "Income Boost Execution System", value: "₹8,999", desc: "RPM optimization & revenue stability framework" },
  { name: "Executive Social Positioning Guide", value: "₹6,999", desc: "Authority branding & long-term dominance strategy" },
  { name: "Ultimate YouTube Growth Master Guide", value: "₹9,499", desc: "Complete growth roadmap & scaling structure" },
  { name: "Channel Creation & Launch Blueprint", value: "₹6,999", desc: "Monetization-ready setup architecture" },
];

export default function BlueprintPage() {
  return (
    <div className="min-h-screen">
      <BlueprintHero
        firstImage={getAssetFiles(ASSET_KEYS.buttons)[0]}
        folderPath={getAssetFolder(ASSET_KEYS.buttons)}
      />

      {/* Remove the fantasy */}
      <section className="mx-auto max-w-3xl px-4 py-16 opacity-0-init animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
        <h2 className="text-2xl font-bold">🚨 Let&apos;s Remove the Fantasy First</h2>
        <p className="mt-4 text-[var(--foreground)]/90">
          You don&apos;t need another &quot;YouTube hack.&quot; You don&apos;t need another &quot;viral trick.&quot; You need leverage. Because faceless YouTube is not about motivation. It&apos;s about: Structure. Retention engineering. Thumbnail psychology. System replication. Without that? You&apos;re gambling. And gambling doesn&apos;t scale. Systems do.
        </p>
        <Link
          href="/product/faceless-youtube-growth-blueprint"
          className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:opacity-90"
        >
          👉 Get Instant Access Now
        </Link>
      </section>

      {/* Why this page is different */}
      <section className="border-y border-[var(--border)] bg-[var(--card)] py-16 opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold">🏆 Why This Page Is Different</h2>
          <p className="mt-4 text-[var(--foreground)]/90">
            Most YouTube course sellers show lifestyle pictures, revenue claims, &quot;Students making 10K.&quot; I&apos;m showing you: 📊 Channel dashboards • 📈 Impression curves • 💰 Revenue screenshots • 📉 Retention graphs • 🔁 Repeatable growth patterns. Because growth leaves data. And data doesn&apos;t lie.
          </p>
        </div>
      </section>

      {/* Proof section - dominant */}
      <section className="mx-auto max-w-5xl px-4 py-16 opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}>
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          📊 BEFORE WE TALK ABOUT WHAT YOU GET… LOOK AT WHAT STRUCTURE DOES.
        </h2>
        <p className="mt-4 text-center text-[var(--foreground)]/80">
          Not theory. Not motivation. Not luck. Data.
        </p>
        <div className="mt-12 flex justify-center">
          <Link
            href="/product/faceless-youtube-growth-blueprint"
            className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:opacity-90"
          >
            👉 Get Instant Access Now
          </Link>
        </div>

        <ProofGallery folder={getAssetFolder(ASSET_KEYS.channelDashboard)} files={getAssetFiles(ASSET_KEYS.channelDashboard)} title="This Is What Predictable Growth Looks Like" captions={["Exploding impressions after retention optimization.", "Subscriber velocity after CTR engineering.", "Watch-time compounding from structured uploads.", "Traffic consistency — not random spikes.", "Systemized uploads → measurable growth."]} tagline="This is not a viral accident. This is engineered performance." aspiration="If this can happen here… it can happen on your channel too." />

        <ProofGallery folder={getAssetFolder(ASSET_KEYS.channelAnalytics)} files={getAssetFiles(ASSET_KEYS.channelAnalytics)} title="Growth Is Mathematical — Not Emotional" captions={["Retention curves improved.", "Audience engagement increasing.", "Traffic sources diversified.", "Shorts feeding long-form ecosystem.", "Session time extended."]} tagline="This is what happens when uploads are built around metrics — not guesses." aspiration="Imagine logging into your Studio and seeing this pattern weekly." />

        <ProofGallery folder={getAssetFolder(ASSET_KEYS.revenue)} files={getAssetFiles(ASSET_KEYS.revenue)} title="Monetization Becomes Easier When Structure Is Right" captions={["Consistent monetized months.", "Stable RPM performance.", "Revenue per video optimized.", "Watch-time converting into income.", "Not one lucky video — system performance."]} tagline="Views are vanity. Revenue is validation." aspiration="This is what happens when attention is built correctly." />

        <ProofGallery folder={getAssetFolder(ASSET_KEYS.viralVideo)} files={getAssetFiles(ASSET_KEYS.viralVideo)} title="Viral Isn't Luck — It's Design" captions={["CTR engineered through thumbnail psychology.", "Retention curves structured in scripting.", "Million-view format replicated.", "Content loop architecture working.", "Short-form driving long-form dominance."]} tagline="Most people chase viral. We build repeatable formats." aspiration="If you can follow structure… you can replicate results." />

        <ProofGallery folder={getAssetFolder(ASSET_KEYS.weeklyAnalytics)} files={getAssetFiles(ASSET_KEYS.weeklyAnalytics)} title="This Is What Compounding Looks Like" captions={["Weekly upward momentum.", "Traffic stability increasing.", "Shorts compounding into long-form growth.", "No chaos — controlled expansion.", "Data-backed consistency."]} tagline="When growth becomes predictable… scaling becomes simple." aspiration="Data-backed consistency." />

        <ProofGallery folder={getAssetFolder(ASSET_KEYS.buttons)} files={getAssetFiles(ASSET_KEYS.buttons)} title="Silver & Gold Are Not Accidents" captions={["100,000 subscribers.", "1,000,000 subscribers.", "Authority earned through systems.", "Faceless. Structured. Scaled."]} tagline="There is nothing special about these plaques. The only difference was structure." aspiration="Authority earned through systems." />

        <ProofGallery folder={getAssetFolder(ASSET_KEYS.textReviews)} files={getAssetFiles(ASSET_KEYS.textReviews)} title="Results From Real People" captions={["Clarity after implementation.", "Direction replaces confusion.", "Structure replaces guessing.", "Confidence replaces chaos."]} tagline="Systems remove uncertainty. Operational data from real faceless channels." aspiration="Real results from real people." />
      </section>

      {/* Two types */}
      <section className="border-y border-[var(--border)] bg-[var(--card)] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold">⚖️ The Real Difference</h2>
          <p className="mt-4 text-[var(--foreground)]/90">There are two types of faceless creators:</p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
              <h3 className="font-bold">Type 1: Content Guessers</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {["Upload what \"feels good\"", "Follow trends blindly", "Celebrate random spikes", "Panic during dips"].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6">
              <h3 className="font-bold">Type 2: System Builders</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {["Plan retention before scripting", "Engineer thumbnails for click psychology", "Use Shorts strategically", "Track metrics weekly", "Scale horizontally"].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 font-medium">One builds content. The other builds assets. You choose which one you want to become.</p>
        </div>
      </section>

      {/* What's in the blueprint */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold">🎯 The Faceless YouTube Growth Blueprint</h2>
        <p className="mt-4 text-[var(--foreground)]/90">
          This is not a motivational ebook. It&apos;s a documented operational framework. You&apos;ll learn:
        </p>
        <ul className="mt-6 space-y-2">
          {["How to pick scalable faceless niches", "How to script for retention loops", "How to design thumbnails that increase CTR", "How to structure Shorts to compound growth", "How to monetize earlier than most creators", "How to replicate one winning system across multiple channels"].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--accent)]">✔</span> {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-medium">This is the backend architecture.</p>
      </section>

      {/* Bonus stack */}
      <section className="border-y border-[var(--border)] bg-[var(--card)] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold">🎁 EXCLUSIVE BONUS STACK (Included FREE Today)</h2>
          <p className="mt-4 text-[var(--foreground)]/90">
            When you join the Faceless YouTube Growth Blueprint, you unlock the complete YouTube Growth Asset Vault.
          </p>
          <ul className="mt-8 space-y-6">
            {BONUSES.map((b) => (
              <li key={b.name} className="flex flex-col gap-1 border-b border-[var(--border)] pb-4">
                <span className="font-semibold">🚀 {b.name}</span>
                <span className="text-sm text-[var(--foreground)]/80">{b.desc}</span>
                <span className="text-sm font-medium text-[var(--primary)]">💰 Value: {b.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg font-bold">💰 Total Bonus Value: ₹58,993</p>
          <p className="mt-2 text-sm text-[var(--foreground)]/80">And you get all of this included inside the main blueprint.</p>
          <ul className="mt-6 space-y-2 text-sm">
            {["📘 Core Growth Blueprint", "🎥 Shorts Acceleration System", "📂 Content Structure Vault", "🧠 Monetization Optimization Guide", "📊 Scaling Architecture System"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 font-bold">Total Strategic Value: ₹58,993</p>
          <Link
            href="/product/faceless-youtube-growth-blueprint"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:opacity-90"
          >
            👉 Get Instant Access Now
          </Link>
        </div>
      </section>

      {/* Why 999 */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold">💰 Why It&apos;s ₹999</h2>
        <p className="mt-4 text-[var(--foreground)]/90">
          Because this isn&apos;t coaching. It&apos;s a structured digital system. You&apos;re not paying ₹58,993. You&apos;re not paying ₹5,899. Today: ₹999. One-time. No subscription. No recurring charges.
        </p>
        <h3 className="mt-8 font-bold">🧠 Let&apos;s Be Rational</h3>
        <p className="mt-2 text-[var(--foreground)]/90">
          ₹999 is not the real cost. The real cost is: another year without structure, another 50 uploads without growth, another monetization rejection, another burnout cycle. If you&apos;re serious about faceless YouTube… You don&apos;t need hype. You need architecture.
        </p>
      </section>

      {/* Guarantee */}
      <section className="border-y border-[var(--border)] bg-[var(--card)] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold">🛡️ 7-Day Action Guarantee</h2>
          <p className="mt-4 text-[var(--foreground)]/90">
            Go through the blueprint. Implement the structure. If you don&apos;t gain clarity and direction… You shouldn&apos;t continue. This isn&apos;t about instant riches. It&apos;s about compounding growth.
          </p>
        </div>
      </section>

      {/* Strategic sections */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold">🔥 Strategic Additions</h2>
        <div className="mt-8 space-y-8">
          <div>
            <h3 className="font-bold">🔍 WHAT OTHER COURSES WON&apos;T SHOW YOU</h3>
            <p className="mt-2 text-sm text-[var(--foreground)]/80">Real dashboards • Retention graphs • RPM breakdown • Long-term scaling plan</p>
          </div>
          <div>
            <h3 className="font-bold">📈 HOW FACELESS CHANNELS ACTUALLY SCALE</h3>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-sm text-[var(--foreground)]/80">
              <li>One winning format</li>
              <li>Format refinement</li>
              <li>CTR optimization</li>
              <li>Retention tightening</li>
              <li>Horizontal replication</li>
            </ol>
            <p className="mt-2 text-sm">Most people never get past step 1.</p>
          </div>
          <div>
            <h3 className="font-bold">📊 WHY FACELESS CHANNELS WIN IN 2025</h3>
            <p className="mt-2 text-sm text-[var(--foreground)]/80">Lower cost structure • Easier scalability • Delegation friendly • Multi-niche expansion. Position faceless as an advantage — not a shortcut.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--card)] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">🔥 Final Reality</h2>
          <p className="mt-6 text-[var(--foreground)]/90">
            If faceless channels can reach: 🏆 Silver Play Buttons • 🏆 Gold Play Buttons • 📊 Millions of views • 💰 Sustainable monetization — then the barrier is not talent. It&apos;s structure.
          </p>
          <Link
            href="/product/faceless-youtube-growth-blueprint"
            className="mt-10 inline-block rounded-lg bg-[var(--primary)] px-10 py-4 text-xl font-bold text-white hover:opacity-90"
          >
            👉 GET INSTANT ACCESS NOW
          </Link>
          <p className="mt-6 text-lg font-medium">Stop guessing. Start engineering growth.</p>
        </div>
      </section>
    </div>
  );
}
