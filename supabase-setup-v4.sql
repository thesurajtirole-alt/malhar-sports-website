-- Run this AFTER supabase-setup-v3.sql.
-- Adds an approval gate: turf owners can self-submit their turf via the
-- public form, but it stays invisible to customers until an admin
-- approves it. Defaults to TRUE so any turfs already added by you via
-- /admin/turfs (which don't need self-approval) stay visible as-is.

alter table turfs add column if not exists is_approved boolean not null default true;
