"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSettings(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const settings: Record<string, string> = {};
  data?.forEach((s) => {
    settings[s.key] = s.value || "";
  });
  return settings;
}

export async function updateSetting(key: string, value: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ value: value.trim(), updated_at: new Date().toISOString() })
    .eq("key", key);
  if (error) return { error: error.message };
  revalidatePath("/admin/settings");
  return {};
}
