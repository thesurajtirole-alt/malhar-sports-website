import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAdminSession } from "@/lib/admin";

/** Returns null if the request is from an admin, or a 403 response if not. */
export async function requireAdmin() {
  const session = await auth();
  if (!isAdminSession(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
