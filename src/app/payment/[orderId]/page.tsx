import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PaymentUI } from "./PaymentUI";

export const dynamic = "force-dynamic";

export default async function PaymentPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const supabase = await createClient();
  const [orderRes, paymentRes] = await Promise.all([
    supabase.from("orders").select("id, order_number, total_inr, status, payment_status").eq("id", orderId).single(),
    supabase.from("payments").select("id, amount_inr, upi_id, qr_payload, utr_number, status").eq("order_id", orderId).single(),
  ]);
  const order = orderRes.data;
  const payment = paymentRes.data;

  if (!order || !payment) notFound();
  if (order.status === "completed" || order.status === "verified" || order.status === "paid") {
    redirect(`/thank-you?order=${orderId}`);
  }

  return (
    <PaymentUI
      orderId={orderId}
      orderNumber={order.order_number}
      totalInr={Number(order.total_inr)}
      upiId={payment.upi_id}
      qrPayload={payment.qr_payload}
      currentStatus={order.payment_status}
      utrNumber={payment.utr_number}
    />
  );
}
