-- UPI accounts for payment QR (admin can add multiple; checkout picks one at random)
CREATE TABLE public.upi_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  upi_id TEXT NOT NULL,
  payee_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_upi_accounts_active ON public.upi_accounts(is_active) WHERE is_active = TRUE;

ALTER TABLE public.upi_accounts ENABLE ROW LEVEL SECURITY;

-- Only admins can manage UPI accounts
CREATE POLICY "Admins can manage upi_accounts" ON public.upi_accounts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Allow anon/authenticated to read active UPI accounts (for checkout to build QR)
CREATE POLICY "Anyone can read active upi_accounts" ON public.upi_accounts FOR SELECT USING (is_active = TRUE);

GRANT SELECT ON public.upi_accounts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.upi_accounts TO authenticated;
