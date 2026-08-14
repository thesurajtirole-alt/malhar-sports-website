import { createClient } from "@supabase/supabase-js";

// SUPABASE_SERVICE_ROLE_KEY (not the anon/public key) is required here —
// this client runs only in server-side API routes and needs to bypass
// Row Level Security to read/write user accounts and streak data.
// NEVER import this file from a "use client" component — the service
// role key would end up in the browser bundle if you did.
const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const supabase = hasSupabaseConfig
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )
  : null;

export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}
