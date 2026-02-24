"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function VerifyOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setLoading(true);
    await fetch(`/admin/orders/${orderId}/verify/api`, { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleVerify}
      disabled={loading}
      className="rounded bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-[var(--background)] hover:opacity-90 disabled:opacity-50"
    >
      {loading ? "…" : "Verify payment"}
    </button>
  );
}
