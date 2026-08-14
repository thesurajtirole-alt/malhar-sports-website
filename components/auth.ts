import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByPhone, normalizePhone } from "@/lib/auth-users";

/**
 * Phone login is real password auth now — not passwordless. An account
 * must exist (created via POST /api/auth/signup) before this provider
 * will accept a login. Passwords are hashed with bcrypt before storage;
 * this function only ever compares hashes, never stores/logs a raw
 * password.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      id: "phone",
      name: "Phone Number",
      credentials: {
        phone: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const rawPhone = credentials?.phone as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!rawPhone || !password) return null;

        const phone = normalizePhone(rawPhone);
        const user = await getUserByPhone(phone);
        if (!user) return null;

        const validPassword = await bcrypt.compare(
          password,
          user.passwordHash
        );
        if (!validPassword) return null;

        return {
          id: `phone:${phone}`,
          name: phone,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
