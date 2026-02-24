"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SendReminderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setLoading(true);
    await fetch(`/admin/orders/${orderId}/send-reminder/api`, { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSend}
      disabled={loading}
      className="rounded border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--muted)] disabled:opacity-50"
    >
      {loading ? "Sending reminder…" : "Send payment reminder email"}
    </button>
  );
}

