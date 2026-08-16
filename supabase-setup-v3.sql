-- Run this AFTER supabase-setup-v2.sql. Adds owner assignment to turfs,
-- enabling turf-owner self-service login (separate from the main admin CMS).

alter table turfs add column if not exists owner_email text;
alter table turfs add column if not exists owner_phone text;

-- Helpful for the turf-owner dashboard's lookup query
create index if not exists idx_turfs_owner_email on turfs (owner_email);
create index if not exists idx_turfs_owner_phone on turfs (owner_phone);
