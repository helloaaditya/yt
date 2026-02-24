import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { buildVerifiedEmail, sendEmail } from "@/lib/email";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: orderId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data: order } = await supabase.from("orders").select("*").eq("id", orderId).single();
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const now = new Date().toISOString();
  await supabase
    .from("orders")
    .update({
      status: "verified",
      payment_status: "verified",
      utr_verified_at: now,
      utr_verified_by: user.id,
      updated_at: now,
    })
    .eq("id", orderId);

  await supabase
    .from("payments")
    .update({
      status: "verified",
      verified_at: now,
      verified_by: user.id,
      updated_at: now,
    })
    .eq("order_id", orderId);

  if (order.guest_email) {
    const { data: items } = await supabase.from("order_items").select("*").eq("order_id", orderId);
    const { subject, text, html } = await buildVerifiedEmail(order as any, (items || []) as any);
    await sendEmail({
      to: order.guest_email,
      subject,
      text,
      html,
    });
  }

  return NextResponse.json({ ok: true });
}
