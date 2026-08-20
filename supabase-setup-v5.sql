-- Run this AFTER supabase-setup-v4.sql.
-- Adds real categories/subcategories management, and links products to
-- them properly instead of free-typed text.

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  parent_id uuid references categories(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Products now reference a real category instead of a free-typed string.
alter table products add column if not exists category_id uuid references categories(id) on delete set null;

alter table categories enable row level security;
grant all privileges on table categories to service_role;
