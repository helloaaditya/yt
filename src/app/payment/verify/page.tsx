"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyUtrPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    router.push(`/payment/lookup?order=${encodeURIComponent(orderNumber.trim())}`);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Verify UTR / Check order</h1>
      <p className="mt-2 text-[var(--foreground)]/70">
        Enter your order number (e.g. YT000001) to open the payment page and submit or check your UTR.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="order" className="block text-sm font-medium mb-1">Order number</label>
          <input
            id="order"
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="YT000001"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--primary)] py-3 font-medium text-white hover:opacity-90"
        >
          Open order
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--foreground)]/70">
        <Link href="/" className="text-[var(--primary)] hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
