import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await req.json();
  const slug = body.slug != null ? (String(body.slug).replace(/^-|-$/g, "") || undefined) : undefined;
  const { error } = await supabase
    .from("products")
    .update({
      ...(slug !== undefined && { slug }),
      ...(body.name !== undefined && { name: body.name }),
      ...(body.description !== undefined && { description: body.description || null }),
      ...(body.short_description !== undefined && { short_description: body.short_description || null }),
      ...(body.product_type !== undefined && { product_type: body.product_type }),
      ...(body.price_inr !== undefined && { price_inr: Number(body.price_inr) }),
      ...(body.offer_price_inr !== undefined && { offer_price_inr: body.offer_price_inr != null && body.offer_price_inr !== "" ? Number(body.offer_price_inr) : null }),
      ...(body.image_url !== undefined && { image_url: body.image_url || null }),
      ...(body.featured !== undefined && { featured: !!body.featured }),
      ...(body.is_active !== undefined && { is_active: body.is_active }),
      ...(body.sort_order !== undefined && { sort_order: Number(body.sort_order) }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
