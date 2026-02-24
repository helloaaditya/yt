import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/ProductCard";
import { getAssetFiles, getAssetFolder, ASSET_KEYS } from "@/lib/assets";

export const dynamic = "force-dynamic";

const viralFiles = getAssetFiles(ASSET_KEYS.viralVideo);
const viralFolder = getAssetFolder(ASSET_KEYS.viralVideo);

export default async function OneToOnePage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("product_type", "one_to_one")
    .order("sort_order");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold opacity-0-init animate-fade-in-up" style={{ animationFillMode: "forwards" }}>One-to-One channel setup</h1>
      <p className="mt-2 text-[var(--foreground)]/70 opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}>
        Get your channel set up with experienced mentors. Custom strategy, thumbnails, and growth plan.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((p, i) => (
          <ProductCard key={p.id} {...p} type="one_to_one" index={i} placeholderFile={viralFiles[i % viralFiles.length]} placeholderFolder={viralFolder} />
        ))}
      </div>
      {(!products || products.length === 0) && (
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)]/50 p-12 text-center text-[var(--foreground)]/60 opacity-0-init animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
          No one-to-one packages available at the moment.
        </div>
      )}
    </div>
  );
}
