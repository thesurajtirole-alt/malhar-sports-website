import { Redis } from "@upstash/redis";

const hasRedisConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const redis = hasRedisConfig
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export interface StoredUser {
  phone: string;
  passwordHash: string;
  createdAt: string;
}

export function isUserStoreConfigured(): boolean {
  return redis !== null;
}

function userKey(phone: string) {
  return `authuser:${phone}`;
}

export async function getUserByPhone(
  phone: string
): Promise<StoredUser | null> {
  if (!redis) return null;
  const data = await redis.get<StoredUser>(userKey(phone));
  return data ?? null;
}

export async function createUser(
  phone: string,
  passwordHash: string
): Promise<StoredUser> {
  if (!redis) {
    throw new Error("User store not configured (missing Upstash Redis env vars)");
  }
  const user: StoredUser = {
    phone,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  await redis.set(userKey(phone), user);
  return user;
}

export function normalizePhone(raw: string): string {
  return raw.replace(/\s+/g, "").trim();
}
