"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { submitUtr } from "./actions";

interface PaymentUIProps {
  orderId: string;
  orderNumber: string;
  totalInr: number;
  upiId: string | null;
  qrPayload: string | null;
  currentStatus: string;
  utrNumber: string | null;
}

export function PaymentUI({ orderId, orderNumber, totalInr, upiId, qrPayload, currentStatus, utrNumber }: PaymentUIProps) {
  const [utr, setUtr] = useState(utrNumber || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmitUtr(e: React.FormEvent) {
    e.preventDefault();
    if (!utr.trim()) return;
    setLoading(true);
    setMessage(null);
    const { error } = await submitUtr(orderId, utr.trim());
    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }
    setMessage({ type: "success", text: "UTR submitted. We will verify shortly. Refresh to check status." });
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-bold">Scan & pay — instant access</h1>
      <p className="mt-1 text-[var(--foreground)]/70">Order {orderNumber} · ₹{totalInr.toLocaleString()}</p>

      <div className="mt-6 rounded-xl border-2 border-[var(--primary)]/30 bg-[var(--card)] p-6">
        <h2 className="text-center text-lg font-semibold">📱 Scan with UPI app to pay</h2>
        <p className="mt-1 text-center text-sm text-[var(--foreground)]/70">Open GPay, PhonePe, Paytm or any UPI app</p>
        {qrPayload ? (
          <div className="mt-4 flex justify-center rounded-xl bg-white p-5">
            <QRCodeSVG value={qrPayload} size={260} level="M" />
          </div>
        ) : (
          <div className="mt-4 flex h-[260px] items-center justify-center rounded-xl bg-[var(--muted)] text-[var(--foreground)]/60">
            QR not generated
          </div>
        )}
        <p className="mt-4 text-center text-lg font-bold text-[var(--primary)]">Amount: ₹{totalInr.toLocaleString()}</p>
        {upiId && (
          <p className="mt-3 text-center text-sm text-[var(--foreground)]/80">
            Assigned UPI for this order: <span className="font-mono font-medium">{upiId}</span>
          </p>
        )}
      </div>

      <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="font-semibold">Enter UTR / reference number</h2>
        <p className="mt-1 text-sm text-[var(--foreground)]/70">After paying, enter the UTR number from your bank or UPI app for verification.</p>
        <form onSubmit={handleSubmitUtr} className="mt-4 flex gap-3">
          <input
            type="text"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            placeholder="e.g. 123456789012"
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)]"
          />
          <button
            type="submit"
            disabled={loading || currentStatus === "verified"}
            className="rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-[var(--background)] hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Submitting…" : "Submit UTR"}
          </button>
        </form>
        {currentStatus === "utr_submitted" && (
          <p className="mt-3 text-sm text-amber-400">UTR submitted. Awaiting admin verification.</p>
        )}
        {message && (
          <p className={`mt-3 text-sm ${message.type === "success" ? "text-[var(--accent)]" : "text-red-400"}`}>
            {message.text}
          </p>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-[var(--foreground)]/60">
        <a href="/payment/verify" className="text-[var(--primary)] hover:underline">Verify UTR</a> for an existing order
      </p>
    </div>
  );
}
