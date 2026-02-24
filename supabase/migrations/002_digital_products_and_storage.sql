-- Digital product PDFs: table + storage bucket
-- Run after 001_initial_schema.sql

-- ============ PRODUCT FILES (PDFs per product) ============
CREATE TABLE public.product_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  file_size_bytes BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_files_product ON public.product_files(product_id);

-- RLS: admins full CRUD; public can only SELECT (download is via signed URL from API)
ALTER TABLE public.product_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product file metadata" ON public.product_files FOR SELECT USING (TRUE);
CREATE POLICY "Admins can insert product files" ON public.product_files FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);
CREATE POLICY "Admins can update product files" ON public.product_files FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);
CREATE POLICY "Admins can delete product files" ON public.product_files FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- ============ STORAGE BUCKET ============
-- Create bucket 'digital-products' (private). If this fails, create it in Dashboard: Storage → New bucket → name: digital-products, public: off.
INSERT INTO storage.buckets (id, name, public)
VALUES ('digital-products', 'digital-products', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: only admins can read/write digital-products bucket
CREATE POLICY "Admins can manage digital-products bucket"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'digital-products'
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
)
WITH CHECK (
  bucket_id = 'digital-products'
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);
