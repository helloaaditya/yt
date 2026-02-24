-- Site settings (admin-configurable: WhatsApp, email, etc.)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_site_settings_key ON public.site_settings(key);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can manage settings
CREATE POLICY "Admins can manage site_settings" ON public.site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Allow authenticated users to read settings (for email helper, etc.)
CREATE POLICY "Authenticated can read site_settings" ON public.site_settings FOR SELECT USING (auth.uid() IS NOT NULL);

-- Seed default settings (empty values - admin will fill)
INSERT INTO public.site_settings (key, value, description) VALUES
  ('whatsapp_number', '', 'Support WhatsApp number (digits only, e.g. 9198xxxxxx00)'),
  ('email_from', '', 'From email address for transactional emails (e.g. support@yourdomain.com)'),
  ('email_api_key', '', 'Resend API key for sending emails'),
  ('site_url', '', 'Your site URL (e.g. https://yourdomain.com)')
ON CONFLICT (key) DO NOTHING;
