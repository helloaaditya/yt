import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const BUCKET = "digital-products";
const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file || !file.size) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "File too large (max 50 MB)" }, { status: 400 });
  const name = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  if (!name.toLowerCase().endsWith(".pdf")) return NextResponse.json({ error: "Only PDF allowed" }, { status: 400 });

  const ext = name.slice(name.lastIndexOf("."));
  const storagePath = `${productId}/${crypto.randomUUID()}${ext}`;

  const buf = await file.arrayBuffer();
  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buf, { contentType: "application/pdf", upsert: false });

  if (uploadErr) {
    return NextResponse.json({ error: uploadErr.message }, { status: 400 });
  }

  const { data: row, error: insertErr } = await supabase
    .from("product_files")
    .insert({
      product_id: productId,
      file_name: file.name,
      storage_path: storagePath,
      file_size_bytes: file.size,
    })
    .select()
    .single();

  if (insertErr) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
    return NextResponse.json({ error: insertErr.message }, { status: 400 });
  }

  return NextResponse.json({ file: row });
}
