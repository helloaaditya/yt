import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const BUCKET = "digital-products";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; fileId: string }> }
) {
  const { id: productId, fileId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data: file } = await supabase
    .from("product_files")
    .select("id, storage_path")
    .eq("id", fileId)
    .eq("product_id", productId)
    .single();

  if (!file) return NextResponse.json({ error: "File not found" }, { status: 404 });

  await supabase.storage.from(BUCKET).remove([file.storage_path]);
  await supabase.from("product_files").delete().eq("id", fileId);

  return NextResponse.json({ ok: true });
}
