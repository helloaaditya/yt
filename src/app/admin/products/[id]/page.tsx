import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductFilesSection } from "@/components/admin/ProductFilesSection";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: product }, { data: files }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("product_files").select("*").eq("product_id", id).order("created_at"),
  ]);
  if (!product) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">Edit product</h1>
      <ProductForm product={product} />
      <ProductFilesSection productId={id} files={files ?? []} />
    </div>
  );
}
