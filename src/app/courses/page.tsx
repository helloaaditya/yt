import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/ProductCard";
import { getAssetFiles, getAssetFolder, ASSET_KEYS } from "@/lib/assets";

export const dynamic = "force-dynamic";

const dashboardFiles = getAssetFiles(ASSET_KEYS.channelDashboard);
const dashboardFolder = getAssetFolder(ASSET_KEYS.channelDashboard);

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("product_type", "course")
    .order("sort_order");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold opacity-0-init animate-fade-in-up" style={{ animationFillMode: "forwards" }}>YouTube courses</h1>
      <p className="mt-2 text-[var(--foreground)]/70 opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}>
        Learn channel growth, monetization, and content strategy from experienced creators.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((p, i) => (
          <ProductCard key={p.id} {...p} type="course" index={i} placeholderFile={dashboardFiles[i % dashboardFiles.length]} placeholderFolder={dashboardFolder} />
        ))}
      </div>
      {(!products || products.length === 0) && (
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)]/50 p-12 text-center text-[var(--foreground)]/60 opacity-0-init animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
          No courses available at the moment.
        </div>
      )}
    </div>
  );
}
