-- Run this entire file in Supabase's SQL Editor (Dashboard → SQL Editor → New Query → paste → Run)
-- Creates the two tables the site needs: phone+password accounts, and synced streak/points/badges.

-- Table 1: phone + password accounts (created via /api/auth/signup, checked via login)
create table if not exists auth_users (
  phone text primary key,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- Table 2: synced gamification data (points, badges, streak) per signed-in user
-- user_id is either the Google account's email, or "phone:<number>" for phone accounts
create table if not exists user_streaks (
  user_id text primary key,
  points integer not null default 0,
  badges jsonb not null default '[]'::jsonb,
  streak_count integer not null default 0,
  streak_last_date text,
  updated_at timestamptz not null default now()
);

-- Row Level Security: enabled by default on new Supabase projects.
-- This site's API routes use the SERVICE ROLE key (server-side only,
-- never exposed to the browser), which bypasses RLS entirely — so no
-- policies are strictly required for this app to function. Enabling
-- RLS with no public policies is still good practice: it means these
-- tables are NOT readable/writable via Supabase's public API using the
-- anon key, only via your server routes.
alter table auth_users enable row level security;
alter table user_streaks enable row level security;
