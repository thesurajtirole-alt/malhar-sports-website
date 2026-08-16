import type { Session } from "next-auth";

/**
 * Admins are just an allowlist in environment variables — not a database
 * table. For a business with the owner + 1-2 staff, adding someone is a
 * one-line env var edit + redeploy, which is simpler and safer than
 * building a whole "manage your admins" UI (which would itself need
 * protecting, and you'd need an admin to grant the first admin...).
 *
 * Set in Vercel:
 *   ADMIN_EMAILS=owner@gmail.com,staff@gmail.com   (for Google sign-in)
 *   ADMIN_PHONES=9826323377,9876543210             (for phone sign-in, no spaces/symbols)
 */
function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function getAdminPhones(): string[] {
  return (process.env.ADMIN_PHONES ?? "")
    .split(",")
    .map((p) => p.replace(/\D/g, ""))
    .filter(Boolean);
}

export function isAdminSession(session: Session | null): boolean {
  if (!session?.user) return false;

  const email = session.user.email?.toLowerCase();
  if (email && getAdminEmails().includes(email)) return true;

  // Phone accounts have id like "phone:9826323377"
  const id = session.user.id ?? "";
  if (id.startsWith("phone:")) {
    const phoneDigits = id.replace("phone:", "").replace(/\D/g, "");
    if (getAdminPhones().includes(phoneDigits)) return true;
  }

  return false;
}
