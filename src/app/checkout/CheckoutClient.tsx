"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createOrder } from "./actions";
import { AssetImage } from "@/components/AssetImage";

interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price_inr: number;
  quantity: number;
}

export function CheckoutClient({
  trustImages = {},
  trustFolders = {},
}: {
  trustImages?: { revenue?: string; buttons?: string; textMessages?: string };
  trustFolders?: { revenue?: string; buttons?: string; textMessages?: string };
}) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? sessionStorage.getItem("checkout_cart") : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed) && parsed.length) setCart(parsed);
      } catch {}
    }
    createClient().auth.getUser().then(({ data: { user: u } }) => {
      setUser(u ?? null);
      if (u?.email) setEmail(u.email);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cart.length) {
      setError("Your cart is empty.");
      return;
    }
    setError("");
    setLoading(true);
    const total = cart.reduce((s, i) => s + i.price_inr * i.quantity, 0);
    const { orderId, error: err } = await createOrder({
      items: cart,
      total_inr: total,
      guest_email: email || undefined,
      guest_name: name || undefined,
      user_id: user?.id || undefined,
    });
    if (err) {
      setLoading(false);
      setError(err);
      return;
    }
    sessionStorage.removeItem("checkout_cart");
    router.push(`/payment/${orderId}`);
  }

  if (cart.length === 0 && typeof window !== "undefined") {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-4 text-[var(--foreground)]/70">Your cart is empty. Add a course or service to continue.</p>
        <a href="/blueprint" className="mt-6 inline-block text-[var(--primary)] hover:underline">Get the Blueprint</a>
      </div>
    );
  }

  const total = cart.reduce((s, i) => s + i.price_inr * i.quantity, 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold md:text-3xl">🔒 SECURE CHECKOUT</h1>
        <p className="mt-2 text-lg text-[var(--foreground)]/90">You&apos;re One Step Away From Scaling Your YouTube Channel 🚀</p>
        <p className="mt-1 text-sm text-[var(--foreground)]/70">Complete your payment below to get instant access. ⏱️ This takes less than 30 seconds.</p>
      </div>

      <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="font-bold">✅ WHAT YOU&apos;RE GETTING TODAY</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {["Faceless YouTube Growth Blueprint (E-Book)", "Shorts Viral Strategy System (Bonus)", "Proven Content & Upload Frameworks (Bonus)", "Monetization & Scaling Guide (Bonus)", "Lifetime Access + Free Updates"].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--accent)]">✔</span> {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[var(--foreground)]/80">📩 Instant access on your email after payment</p>
      </div>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="font-bold">🔥 WHY THIS WORKS (REASSURANCE)</h2>
        <p className="mt-2 text-sm text-[var(--foreground)]/80">
          This system is built from multiple faceless YouTube channels, 5 Silver Play Buttons + 1 Gold Play Button, strategies tested across millions of views. You&apos;re not experimenting. You&apos;re copying a proven system.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="font-bold">💰 PRICE CONFIRMATION</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {cart.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price_inr * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-[var(--border)] pt-4 text-right text-xl font-bold">Today&apos;s Price: ₹{total.toLocaleString()}</p>
        <ul className="mt-2 space-y-1 text-sm text-[var(--foreground)]/70">
          <li>❌ No subscription</li>
          <li>❌ No hidden charges</li>
          <li>❌ No upsells after payment</li>
        </ul>
        <p className="mt-2 text-sm font-medium">What you pay today = everything you get.</p>
      </div>

      <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <h3 className="font-semibold">⚠️ IMPORTANT WARNING (REDUCE REFUNDS)</h3>
        <p className="mt-2 text-sm text-[var(--foreground)]/80">
          This is not a &quot;get rich quick&quot; product. This is a step-by-step execution system. If you follow it, results come. If you don&apos;t apply, nothing changes.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        <div className="h-20 w-32 rounded-lg overflow-hidden bg-[var(--muted)] hover-zoom">
          <AssetImage folder={trustFolders.revenue ?? "revenue"} file={trustImages.revenue} alt="Revenue proof" />
        </div>
        <div className="h-20 w-32 rounded-lg overflow-hidden bg-[var(--muted)] hover-zoom">
          <AssetImage folder={trustFolders.buttons ?? "buttons"} file={trustImages.buttons} alt="Play button" />
        </div>
        <div className="h-20 w-32 rounded-lg overflow-hidden bg-[var(--muted)] hover-zoom">
          <AssetImage folder={trustFolders.textMessages ?? "text-messages-reviews"} file={trustImages.textMessages} alt="Reviews" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm">
        <span>🔒 100% Secure Payment</span>
        <span className="text-[var(--accent)]">✔ SSL Encrypted Checkout</span>
        <span className="text-[var(--accent)]">✔ Your data is safe & private</span>
      </div>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
        <h3 className="font-semibold">🛡️ RISK REVERSAL (FINAL FEAR KILLER)</h3>
        <p className="mt-2 text-sm text-[var(--foreground)]/80">
          Zero-Regret Promise. You&apos;re paying less than the cost of one meal outside for a system that can change your YouTube journey. The bigger risk is staying stuck without direction.
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-amber-500">
        ⏳ This price is temporary. Once this page is updated, price may increase and bonuses may be removed. If you leave now, you may lose this offer.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</div>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full name *</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="relative w-full rounded-lg bg-[var(--primary)] py-4 text-lg font-bold text-white hover:opacity-90 disabled:opacity-70 disabled:pointer-events-none"
        >
          {loading && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
          )}
          <span className={loading ? "opacity-90" : ""}>
            {loading ? "Preparing payment… Taking you to QR in a moment" : "👉 Complete Secure Payment & Get Instant Access"}
          </span>
        </button>
        <p className="text-center text-sm text-[var(--foreground)]/70">Instant download. Start today.</p>
      </form>

      <div className="mt-10 flex flex-wrap justify-center gap-6 border-t border-[var(--border)] pt-8 text-sm text-[var(--foreground)]/70">
        <span>✔ Instant Email Delivery</span>
        <span>✔ Works for Faceless Channels</span>
        <span>✔ Beginner Friendly</span>
        <span>✔ No Technical Skills Required</span>
      </div>
    </div>
  );
}
