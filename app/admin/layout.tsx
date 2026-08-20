import Link from "next/link";
import { auth } from "@/auth";
import { isAdminSession } from "@/lib/admin";
import { AuthButton } from "@/components/auth/AuthButton";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/new-arrivals", label: "New Arrivals" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/academies", label: "Academies" },
  { href: "/admin/turfs", label: "Turfs" },
  { href: "/admin/bookings", label: "Bookings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!isAdminSession(session)) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl normal-case tracking-normal">
          Admin Access Chahiye
        </h1>
        <p className="mt-3 text-ink/70">
          {session?.user
            ? "Ye account admin list mein nahi hai. Sahi account se sign in karo."
            : "Ye page sirf admins ke liye hai — pehle sign in karo."}
        </p>
        <div className="mt-6 flex justify-center">
          <AuthButton />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-tape pb-4">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-pill px-4 py-2 text-sm font-semibold text-ink/70 hover:bg-surface hover:text-ink"
          >
            {link.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
