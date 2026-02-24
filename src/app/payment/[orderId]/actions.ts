"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitUtr(orderId: string, utrNumber: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ utr_number: utrNumber, payment_status: "utr_submitted", status: "awaiting_utr", updated_at: new Date().toISOString() })
    .eq("id", orderId);

  if (error) return { error: error.message };

  await supabase
    .from("payments")
    .update({ utr_number: utrNumber, status: "utr_submitted", updated_at: new Date().toISOString() })
    .eq("order_id", orderId);

  return {};
}
