import { supabase, isSupabaseConfigured } from "./supabase";

export interface StoredUser {
  phone: string;
  passwordHash: string;
  createdAt: string;
}

export function isUserStoreConfigured(): boolean {
  return isSupabaseConfigured();
}

export async function getUserByPhone(
  phone: string
): Promise<StoredUser | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("auth_users")
    .select("phone, password_hash, created_at")
    .eq("phone", phone)
    .maybeSingle();

  if (error || !data) return null;

  return {
    phone: data.phone,
    passwordHash: data.password_hash,
    createdAt: data.created_at,
  };
}

export async function createUser(
  phone: string,
  passwordHash: string
): Promise<StoredUser> {
  if (!supabase) {
    throw new Error("User store not configured (missing Supabase env vars)");
  }

  const createdAt = new Date().toISOString();
  const { error } = await supabase
    .from("auth_users")
    .insert({ phone, password_hash: passwordHash, created_at: createdAt });

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return { phone, passwordHash, createdAt };
}

export function normalizePhone(raw: string): string {
  return raw.replace(/\s+/g, "").trim();
}
