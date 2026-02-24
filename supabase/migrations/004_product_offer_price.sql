-- Offer price for products (e.g. regular ₹4999, offer ₹99)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS offer_price_inr DECIMAL(12, 2) NULL CHECK (offer_price_inr >= 0);

-- Optional: ensure offer price is not more than regular price
ALTER TABLE public.products
  ADD CONSTRAINT chk_offer_lte_price
  CHECK (offer_price_inr IS NULL OR offer_price_inr <= price_inr);
