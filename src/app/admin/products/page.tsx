import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*").order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Add product
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-sm text-[var(--foreground)]/70">
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 pr-4">Type</th>
              <th className="pb-3 pr-4">Price</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border)]">
                <td className="py-3 pr-4 font-medium">{p.name}</td>
                <td className="py-3 pr-4">{p.product_type}</td>
                <td className="py-3 pr-4">
                  {p.offer_price_inr != null ? (
                    <>₹{Number(p.offer_price_inr).toLocaleString()} <span className="text-[var(--foreground)]/60 line-through">₹{Number(p.price_inr).toLocaleString()}</span></>
                  ) : (
                    <>₹{Number(p.price_inr).toLocaleString()}</>
                  )}
                </td>
                <td className="py-3 pr-4">{p.is_active ? "Active" : "Inactive"}</td>
                <td className="py-3">
                  <Link href={`/admin/products/${p.id}`} className="text-[var(--primary)] hover:underline text-sm">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(!products || products.length === 0) && (
        <p className="mt-6 text-[var(--foreground)]/60">No products. Add one to get started.</p>
      )}
    </div>
  );
}
