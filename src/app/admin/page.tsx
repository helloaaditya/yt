import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [{ count: productsCount }, { count: ordersCount }, { count: pendingCount }] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }).in("payment_status", ["pending", "utr_submitted"]),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <p className="text-sm text-[var(--foreground)]/70">Active products</p>
          <p className="text-3xl font-bold">{productsCount ?? 0}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <p className="text-sm text-[var(--foreground)]/70">Total orders</p>
          <p className="text-3xl font-bold">{ordersCount ?? 0}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <p className="text-sm text-[var(--foreground)]/70">Pending verification</p>
          <p className="text-3xl font-bold">{pendingCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
