import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PaymentLookupPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderNumber } = await searchParams;
  if (!orderNumber?.trim()) redirect("/payment/verify");

  const supabase = await createClient();
  const { data: order } = await supabase
    .from("orders")
    .select("id")
    .eq("order_number", orderNumber.trim().toUpperCase())
    .single();

  if (!order) redirect("/payment/verify?error=notfound");
  redirect(`/payment/${order.id}`);
}
