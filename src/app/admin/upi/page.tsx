import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { UpiForm } from "./UpiForm";

export const dynamic = "force-dynamic";

export default async function AdminUpiPage() {
  const supabase = await createClient();
  const { data: accounts } = await supabase
    .from("upi_accounts")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-bold">UPI accounts</h1>
      <p className="mt-1 text-sm text-[var(--foreground)]/70">
        Add multiple UPI IDs; customers will see one at random on the payment page.
      </p>

      <UpiForm className="mt-6" />

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-sm text-[var(--foreground)]/70">
              <th className="pb-3 pr-4">UPI ID</th>
              <th className="pb-3 pr-4">Payee name</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((a) => (
              <tr key={a.id} className="border-b border-[var(--border)]">
                <td className="py-3 pr-4 font-mono text-sm">{a.upi_id}</td>
                <td className="py-3 pr-4">{a.payee_name}</td>
                <td className="py-3 pr-4">{a.is_active ? "Active" : "Inactive"}</td>
                <td className="py-3">
                  <Link
                    href={`/admin/upi/${a.id}`}
                    className="text-sm text-[var(--primary)] hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(!accounts || accounts.length === 0) && (
        <p className="mt-6 text-[var(--foreground)]/60">No UPI accounts. Add one above.</p>
      )}
    </div>
  );
}
