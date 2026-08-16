-- Run this in Supabase's SQL Editor (same place as supabase-setup.sql before).
-- Adds: New Arrivals products, dynamic Academies (replacing the static list),
-- Turfs, and Turf Bookings.

-- ── New Arrivals (products) ──────────────────────────────────────────
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text,
  price numeric,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── Indore Sports Directory (replaces the static lib/indore-venues.ts list) ──
create table if not exists academies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('Academy', 'Ground/Stadium')),
  sport text[] not null default '{}',
  area text,
  note text,
  is_verified boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── Turfs (other businesses' turfs, listed for booking) ──────────────
create table if not exists turfs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  area text,
  contact_phone text not null,
  sport_types text[] not null default '{}',
  price_per_hour numeric not null,
  opening_time text not null default '06:00',
  closing_time text not null default '23:00',
  slot_duration_minutes integer not null default 60,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── Turf Bookings ─────────────────────────────────────────────────────
create table if not exists turf_bookings (
  id uuid primary key default gen_random_uuid(),
  turf_id uuid not null references turfs(id) on delete cascade,
  booking_date date not null,
  start_time text not null,
  end_time text not null,
  customer_name text not null,
  customer_phone text not null,
  user_id text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  -- Prevents two people booking the exact same turf+date+slot at once
  unique (turf_id, booking_date, start_time)
);

-- ── Product images storage bucket ────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- ── Seed data: migrates the 6 venues that were previously hardcoded in
-- lib/indore-venues.ts, so the directory page isn't empty right after
-- this migration. All seeded as is_verified = false, same as before —
-- this was public-search data, not confirmed directly. Mark verified
-- (or edit/remove) via /admin/academies once you've confirmed each one.
insert into academies (name, type, sport, area, note, is_verified) values
  ('Nehru Stadium', 'Ground/Stadium', array['Cricket','Football','Basketball','Kho Kho'], 'Indore', 'Multi-purpose stadium built in 1964, ~25,000 capacity. Hosted international ODIs.', false),
  ('Holkar Cricket Stadium', 'Ground/Stadium', array['Cricket'], 'Race Course Road', 'Indore''s main international cricket venue — hosts national and international matches.', false),
  ('Abhay Prashal Indoor Stadium', 'Ground/Stadium', array['Badminton','Basketball','Indoor sports'], 'Indore', 'Major indoor stadium used for badminton, basketball, and other indoor events.', false),
  ('Indore Cricket Club (ICC)', 'Academy', array['Cricket'], 'Saket Nagar', 'Runs structured coaching for U-10 to seniors, with a maintained practice ground.', false),
  ('Madhya Pradesh Cricket Association (MPCA) Academy', 'Academy', array['Cricket'], 'Indore', 'State cricket association''s academy — batting, bowling, and fielding coaching.', false),
  ('Indore Badminton Academy', 'Academy', array['Badminton'], 'Indore', 'Established badminton coaching academy serving Indore and central MP.', false)
on conflict do nothing;

-- ── Permissions ────────────────────────────────────────────────────────
-- This app never uses Supabase's anon/public key directly — every read
-- (including public pages like the homepage's New Arrivals section) goes
-- through a Next.js server component or API route using the service_role
-- client, same pattern as everything else in this codebase. RLS is
-- enabled below as a safety net (blocks any accidental direct/anon
-- access), but no anon policies are needed since nothing uses that key.
alter table products enable row level security;
alter table academies enable row level security;
alter table turfs enable row level security;
alter table turf_bookings enable row level security;

grant all privileges on table products to service_role;
grant all privileges on table academies to service_role;
grant all privileges on table turfs to service_role;
grant all privileges on table turf_bookings to service_role;
