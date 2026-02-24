import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  pending: "Pending payment",
  awaiting_utr: "UTR submitted",
  paid: "Paid",
  verified: "Verified",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, total_inr, status, payment_status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const orderIds = (orders ?? []).map((o) => o.id);
  const { data: orderItems } = orderIds.length
    ? await supabase.from("order_items").select("order_id, product_id, product_name").in("order_id", orderIds)
    : { data: [] };
  const productIds = [...new Set((orderItems ?? []).map((i) => i.product_id))];
  const { data: productFiles } = productIds.length
    ? await supabase.from("product_files").select("id, product_id, file_name").in("product_id", productIds)
    : { data: [] };
  const filesByProduct = (productFiles ?? []).reduce<Record<string, { id: string; file_name: string }[]>>((acc, f) => {
    if (!acc[f.product_id]) acc[f.product_id] = [];
    acc[f.product_id].push({ id: f.id, file_name: f.file_name });
    return acc;
  }, {});

  const canDownload = (status: string) =>
    status === "verified" || status === "completed" || status === "paid";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold">My orders</h1>
      <p className="mt-1 text-[var(--foreground)]/70">View and manage your course purchases. Download PDFs after payment is verified.</p>
      <div className="mt-8 space-y-4">
        {orders?.length ? (
          orders.map((o) => {
            const items = (orderItems ?? []).filter((i) => i.order_id === o.id);
            const showDownloads = canDownload(o.status);
            return (
              <div
                key={o.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{o.order_number}</p>
                    <p className="text-sm text-[var(--foreground)]/70">
                      ₹{Number(o.total_inr).toLocaleString()} · {new Date(o.created_at).toLocaleDateString()}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="text-[var(--foreground)]/70">Status: </span>
                      <span className={showDownloads ? "text-[var(--accent)]" : ""}>
                        {statusLabel[o.status] || o.status}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/payment/${o.id}`}
                    className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)]"
                  >
                    View / Pay
                  </Link>
                </div>
                {showDownloads && items.length > 0 && (
                  <div className="mt-4 border-t border-[var(--border)] pt-4">
                    <p className="text-sm font-medium text-[var(--foreground)]/80">Downloads</p>
                    <ul className="mt-2 space-y-1">
                      {items.map((item) => {
                        const files = filesByProduct[item.product_id] ?? [];
                        return files.length > 0 ? (
                          files.map((f) => (
                            <li key={f.id}>
                              <a
                                href={`/api/download?product_id=${item.product_id}&file_id=${f.id}`}
                                className="text-sm text-[var(--primary)] hover:underline"
                              >
                                {item.product_name} — {f.file_name}
                              </a>
                            </li>
                          ))
                        ) : (
                          <li key={item.product_id} className="text-sm text-[var(--foreground)]/60">
                            {item.product_name} (no files)
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)]/50 p-12 text-center text-[var(--foreground)]/70">
            No orders yet. <Link href="/courses" className="text-[var(--primary)] hover:underline">Browse courses</Link>
          </div>
        )}
      </div>
    </div>
  );
}
