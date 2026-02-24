import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const slug = (body.slug || String(body.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/^-|-$/g, "");
  const { error } = await supabase.from("products").insert({
    slug,
    name: body.name,
    description: body.description || null,
    short_description: body.short_description || null,
    product_type: body.product_type || "course",
    price_inr: Number(body.price_inr),
    offer_price_inr: body.offer_price_inr != null && body.offer_price_inr !== "" ? Number(body.offer_price_inr) : null,
    image_url: body.image_url || null,
    featured: !!body.featured,
    is_active: body.is_active !== false,
    sort_order: Number(body.sort_order) || 0,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
