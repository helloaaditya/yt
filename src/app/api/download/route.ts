import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const BUCKET = "digital-products";

export const dynamic = "force-dynamic";

/**
 * GET /api/download?product_id=...&file_id=...
 * User must have a verified order containing this product. Redirects to signed download URL.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("product_id");
  const fileId = searchParams.get("file_id");
  if (!productId || !fileId) {
    return NextResponse.json({ error: "Missing product_id or file_id" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to download" }, { status: 401 });
  }

  const { data: file } = await supabase
    .from("product_files")
    .select("id, storage_path, file_name")
    .eq("id", fileId)
    .eq("product_id", productId)
    .single();
  if (!file) return NextResponse.json({ error: "File not found" }, { status: 404 });

  const { data: orders } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", user.id)
    .in("status", ["verified", "completed", "paid"]);
  const orderIds = (orders ?? []).map((o) => o.id);
  if (orderIds.length === 0) {
    return NextResponse.json({ error: "You don't have access to this file. Purchase and get payment verified first." }, { status: 403 });
  }
  const { data: orderItem } = await supabase
    .from("order_items")
    .select("id")
    .in("order_id", orderIds)
    .eq("product_id", productId)
    .limit(1)
    .maybeSingle();

  if (!orderItem) {
    return NextResponse.json({ error: "You don't have access to this file. Purchase and get payment verified first." }, { status: 403 });
  }

  const { data: signed } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(file.storage_path, 60, { download: file.file_name });

  if (!signed?.signedUrl) {
    return NextResponse.json({ error: "Could not generate download link" }, { status: 500 });
  }

  return NextResponse.redirect(signed.signedUrl);
}
