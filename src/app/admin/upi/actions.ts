"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createUpiAccount(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const upi_id = (formData.get("upi_id") as string)?.trim();
  const payee_name = (formData.get("payee_name") as string)?.trim();
  if (!upi_id || !payee_name) return { error: "UPI ID and payee name are required." };

  const { error } = await supabase.from("upi_accounts").insert({
    upi_id,
    payee_name,
    is_active: true,
    sort_order: 0,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/upi");
  return {};
}

export async function updateUpiAccount(
  id: string,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const upi_id = (formData.get("upi_id") as string)?.trim();
  const payee_name = (formData.get("payee_name") as string)?.trim();
  const is_active = formData.get("is_active") === "on";
  if (!upi_id || !payee_name) return { error: "UPI ID and payee name are required." };

  const { error } = await supabase
    .from("upi_accounts")
    .update({ upi_id, payee_name, is_active, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/upi");
  revalidatePath(`/admin/upi/${id}`);
  return {};
}

export async function deleteUpiAccount(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("upi_accounts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/upi");
  return {};
}
