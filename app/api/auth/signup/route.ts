import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  getUserByPhone,
  createUser,
  isUserStoreConfigured,
  normalizePhone,
} from "@/lib/auth-users";

export async function POST(req: Request) {
  if (!isUserStoreConfigured()) {
    return NextResponse.json(
      {
        error:
          "Password login abhi setup nahi hai is server pe — Google se try karo, ya thodi der baad try karo.",
      },
      { status: 503 }
    );
  }

  let body: { phone?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const phone = body.phone ? normalizePhone(body.phone) : "";
  const password = body.password ?? "";

  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json(
      { error: "Sahi mobile number daalo." },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password kam se kam 6 characters ka hona chahiye." },
      { status: 400 }
    );
  }

  const existing = await getUserByPhone(phone);
  if (existing) {
    return NextResponse.json(
      { error: "Yeh number already registered hai — Login try karo." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await createUser(phone, passwordHash);

  return NextResponse.json({ ok: true });
}
