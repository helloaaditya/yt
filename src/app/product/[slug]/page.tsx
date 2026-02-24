import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AddToCartButton } from "./AddToCartButton";
import { getEffectivePrice } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !product) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-8 text-sm text-[var(--foreground)]/70">
        <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
        <span className="mx-2">/</span>
        <Link href={product.product_type === "course" ? "/courses" : "/one-to-one"} className="hover:text-[var(--primary)]">
          {product.product_type === "course" ? "Courses" : "One-to-One"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">{product.name}</span>
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-video rounded-xl bg-[var(--muted)] overflow-hidden flex items-center justify-center">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="h-full w-full object-contain" />
          ) : (
            <span className="text-6xl text-[var(--primary)]">▶</span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--primary)] uppercase tracking-wider">
            {product.product_type === "course" ? "Course" : "One-to-One"}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-[var(--primary)]">
            {product.offer_price_inr != null ? (
              <>
                <span className="text-lg text-[var(--foreground)]/60 line-through mr-2">₹{Number(product.price_inr).toLocaleString()}</span>
                ₹{Number(product.offer_price_inr).toLocaleString()}
              </>
            ) : (
              <>₹{Number(getEffectivePrice(product)).toLocaleString()}</>
            )}
          </p>
          {product.short_description && (
            <p className="mt-4 text-[var(--foreground)]/80">{product.short_description}</p>
          )}
          <div className="mt-6 prose prose-invert max-w-none text-[var(--foreground)]/80">
            {product.description?.split("\n").map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
