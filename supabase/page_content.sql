-- ---------------------------------------------------------------------------
-- Page Content CMS — table + security policies
--
-- Run this once in the Supabase SQL editor (Dashboard > SQL Editor).
-- Stores editable copy for each page section. One row per (page_key,
-- section_key); the `content` column holds that section's text fields as JSON.
-- ---------------------------------------------------------------------------

create table if not exists public.page_content (
  id          bigint generated always as identity primary key,
  page_key    text not null,
  section_key text not null,
  content     jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  unique (page_key, section_key)
);

alter table public.page_content enable row level security;

-- Anyone (anon visitors) can read the published copy.
drop policy if exists "page_content_public_read" on public.page_content;
create policy "page_content_public_read"
  on public.page_content
  for select
  using (true);

-- Only signed-in admin users can create/update copy.
drop policy if exists "page_content_admin_write" on public.page_content;
create policy "page_content_admin_write"
  on public.page_content
  for all
  to authenticated
  using (true)
  with check (true);
