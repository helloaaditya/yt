import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildPaymentReminderEmail, sendEmail } from "@/lib/email";

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
  if (!order.guest_email) return NextResponse.json({ error: "No guest email for this order" }, { status: 400 });

  const { subject, text, html } = await buildPaymentReminderEmail(order as any);
  const result = await sendEmail({
    to: order.guest_email,
    subject,
    text,
    html,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error || "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

