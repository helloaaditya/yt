"use server";

import { createClient } from "@/lib/supabase/server";

interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price_inr: number;
  quantity: number;
}

interface CreateOrderInput {
  items: CartItem[];
  total_inr: number;
  guest_email?: string;
  guest_name?: string;
  user_id?: string;
}

export async function createOrder(input: CreateOrderInput): Promise<{ orderId?: string; error?: string }> {
  const supabase = await createClient();
  const { items, total_inr, guest_email, guest_name, user_id } = input;

  const [numRes, upiRes] = await Promise.all([
    supabase.rpc("generate_order_number"),
    supabase.from("upi_accounts").select("upi_id, payee_name").eq("is_active", true),
  ]);

  const { data: orderNumber, error: numErr } = numRes;
  if (numErr || !orderNumber) {
    return { error: "Could not generate order number. Try again." };
  }

  let upiId: string;
  let payeeName: string;
  const upiAccounts = upiRes.data;
  if (upiAccounts?.length) {
    const chosen = upiAccounts[Math.floor(Math.random() * upiAccounts.length)];
    upiId = chosen.upi_id;
    payeeName = chosen.payee_name;
  } else {
    upiId = process.env.NEXT_PUBLIC_UPI_ID || "yourstore@paytm";
    payeeName = process.env.NEXT_PUBLIC_UPI_PAYEE_NAME || "YT Growth Academy";
  }

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      user_id: user_id || null,
      guest_email: guest_email || null,
      guest_name: guest_name || null,
      total_inr: total_inr,
      status: "pending",
      payment_status: "pending",
    })
    .select("id")
    .single();

  if (orderErr || !order) {
    return { error: orderErr?.message || "Failed to create order." };
  }

  const orderItems = items.map((i) => ({
    order_id: order.id,
    product_id: i.productId,
    product_name: i.name,
    product_slug: i.slug,
    quantity: i.quantity,
    price_inr: i.price_inr,
  }));

  const qrPayload = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${total_inr}&cu=INR`;

  const [itemsResult, payResult] = await Promise.all([
    supabase.from("order_items").insert(orderItems),
    supabase.from("payments").insert({
      order_id: order.id,
      amount_inr: total_inr,
      upi_id: upiId,
      qr_payload: qrPayload,
      status: "pending",
    }),
  ]);

  if (itemsResult.error) return { error: "Failed to add order items." };
  if (payResult.error) return { error: "Failed to create payment record." };

  return { orderId: order.id };
}
