import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { VerifyOrderButton } from "./VerifyOrderButton";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, total_inr, status, payment_status, utr_number, guest_email, created_at")
    .order("created_at", { ascending: false });

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    awaiting_utr: "UTR submitted",
    paid: "Paid",
    verified: "Verified",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="mt-1 text-sm text-[var(--foreground)]/70">Verify UTR and manage orders.</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-[var(--foreground)]/70">
              <th className="pb-3 pr-4">Order</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3 pr-4">UTR</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o) => (
              <tr key={o.id} className="border-b border-[var(--border)]">
                <td className="py-3 pr-4">
                  <Link href={`/admin/orders/${o.id}`} className="font-medium text-[var(--primary)] hover:underline">
                    {o.order_number}
                  </Link>
                </td>
                <td className="py-3 pr-4">₹{Number(o.total_inr).toLocaleString()}</td>
                <td className="py-3 pr-4 font-mono text-xs">{o.utr_number || "—"}</td>
                <td className="py-3 pr-4">{statusLabels[o.status] ?? o.status}</td>
                <td className="py-3 pr-4 text-[var(--foreground)]/70">{new Date(o.created_at).toLocaleString()}</td>
                <td className="py-3">
                  {(o.payment_status === "utr_submitted" || o.status === "awaiting_utr") && (
                    <VerifyOrderButton orderId={o.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(!orders || orders.length === 0) && (
        <p className="mt-6 text-[var(--foreground)]/60">No orders yet.</p>
      )}
    </div>
  );
}
