import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { UpiEditForm } from "../UpiEditForm";

export const dynamic = "force-dynamic";

export default async function AdminUpiEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: account } = await supabase.from("upi_accounts").select("*").eq("id", id).single();
  if (!account) notFound();

  return (
    <div>
      <Link href="/admin/upi" className="text-sm text-[var(--foreground)]/70 hover:underline">
        ← UPI accounts
      </Link>
      <h1 className="mt-2 text-2xl font-bold">Edit UPI account</h1>
      <UpiEditForm account={account} />
    </div>
  );
}
