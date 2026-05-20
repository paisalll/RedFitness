-- ============================================================
-- 1. Add whatsapp_number column to clubs
-- ============================================================
ALTER TABLE public.clubs
  ADD COLUMN IF NOT EXISTS whatsapp_number text;

-- ============================================================
-- 2. Registrations table (free trial sign-ups)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id          bigint generated always as identity primary key,
  first_name  text not null,
  last_name   text,
  email       text not null,
  phone       text,
  club_id     uuid references public.clubs(id) on delete set null,
  source      text not null default 'free_trial',  -- 'free_trial' | 'whatsapp'
  created_at  timestamptz not null default now()
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can insert — form submissions from public site
CREATE POLICY "registrations_public_insert"
  ON public.registrations FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated admins can read
CREATE POLICY "registrations_auth_read"
  ON public.registrations FOR SELECT TO authenticated USING (true);

CREATE POLICY "registrations_auth_delete"
  ON public.registrations FOR DELETE TO authenticated USING (true);

-- Grant table-level privileges (RLS policies alone are not enough)
GRANT INSERT ON public.registrations TO anon;
GRANT SELECT, DELETE ON public.registrations TO authenticated;
