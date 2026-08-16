"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { AuthButton } from "@/components/auth/AuthButton";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/sports-hub", label: "Sports Hub" },
  { href: "/khelo", label: "Khelo 🎮" },
  { href: "/turfs", label: "Turf Book Karo ⚽" },
  { href: "/khelo/calculators/bmi", label: "Health Calculator" },
  { href: "/indore/academies", label: "Indore Sports" },
  { href: "/store", label: "Visit Store" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-tape bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Malhar Sports and Shoes"
            width={200}
            height={200}
            className="h-14 w-14 transition-transform duration-300 [filter:drop-shadow(1.5px_2px_2px_rgba(0,0,0,0.25))] hover:scale-105 xl:h-[76px] xl:w-[76px]"
            priority
          />
        </Link>

        {/* Full nav only appears once there's genuinely room for it (xl+),
            so it never wraps to a second line — narrower screens get the
            hamburger menu instead. */}
        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-body text-sm font-medium text-ink/80 transition-colors hover:text-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {business.social.instagram && (
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Malhar Sports Instagram"
              className="text-ink/70 hover:text-orange"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          )}
          <a
            href={business.telLink}
            aria-label="Call Karo"
            className="text-ink/70 hover:text-orange"
          >
            <Phone className="h-5 w-5" />
          </a>
          <AuthButton />
          <a
            href={business.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-orange whitespace-nowrap rounded-pill px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
          >
            WhatsApp Karo
          </a>
        </div>

        <button
          aria-label={open ? "Menu band karo" : "Menu kholo"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-ink hover:bg-tape xl:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "xl:hidden overflow-hidden border-t border-tape bg-paper transition-[max-height] duration-300",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 font-body text-base font-medium text-ink hover:bg-tape"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2">
            <AuthButton />
          </div>
          <a
            href={business.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-orange mt-2 rounded-pill px-5 py-3 text-center text-sm font-semibold text-white"
          >
            WhatsApp Karo
          </a>
        </nav>
      </div>
    </header>
  );
}
