import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { VerifyOrderButton } from "../VerifyOrderButton";
import { SendReminderButton } from "./SendReminderButton";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: order } = await supabase.from("orders").select("*").eq("id", id).single();
  if (!order) notFound();
  const { data: items } = await supabase.from("order_items").select("*").eq("order_id", id);
  const { data: payment } = await supabase.from("payments").select("*").eq("order_id", id).single();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order {order.order_number}</h1>
        <Link href="/admin/orders" className="text-sm text-[var(--primary)] hover:underline">← Orders</Link>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="font-semibold">Details</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div><dt className="text-[var(--foreground)]/70">Total</dt><dd>₹{Number(order.total_inr).toLocaleString()}</dd></div>
            <div><dt className="text-[var(--foreground)]/70">Status</dt><dd>{order.status}</dd></div>
            <div><dt className="text-[var(--foreground)]/70">Payment status</dt><dd>{order.payment_status}</dd></div>
            <div><dt className="text-[var(--foreground)]/70">UTR</dt><dd className="font-mono">{order.utr_number || "—"}</dd></div>
            <div><dt className="text-[var(--foreground)]/70">Guest email</dt><dd>{order.guest_email || "—"}</dd></div>
            <div><dt className="text-[var(--foreground)]/70">Created</dt><dd>{new Date(order.created_at).toLocaleString()}</dd></div>
          </dl>
          {(order.payment_status === "utr_submitted" || order.status === "awaiting_utr") && (
            <div className="mt-4">
              <VerifyOrderButton orderId={order.id} />
            </div>
          )}
          {order.payment_status === "pending" && order.guest_email && (
            <div className="mt-3">
              <SendReminderButton orderId={order.id} />
            </div>
          )}
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="font-semibold">Items</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items?.map((i) => (
              <li key={i.id} className="flex justify-between">
                <span>{i.product_name} × {i.quantity}</span>
                <span>₹{(Number(i.price_inr) * i.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          {payment && (
            <p className="mt-4 text-xs text-[var(--foreground)]/60">Payment ID: {payment.id}</p>
          )}
        </div>
      </div>
    </div>
  );
}
