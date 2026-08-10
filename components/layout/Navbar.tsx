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
  { href: "/khelo/calculators/bmi", label: "Health Calculator" },
  { href: "/indore/academies", label: "Indore Sports" },
  { href: "/store", label: "Visit Store" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-tape bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-wordmark.png"
            alt="Malhar — Sports Wear and Shoes"
            width={415}
            height={98}
            className="h-11 w-auto transition-transform duration-300 [filter:drop-shadow(1.5px_2px_0px_rgba(0,0,0,0.25))_drop-shadow(-1px_-1px_0px_rgba(255,255,255,0.5))] hover:[transform:perspective(300px)_rotateX(8deg)_scale(1.03)] md:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-ink/80 transition-colors hover:text-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <AuthButton />
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
            className="flex items-center gap-1.5 text-sm font-medium text-ink/80 hover:text-orange"
          >
            <Phone className="h-4 w-4" />
            Call Karo
          </a>
          <a
            href={business.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-orange rounded-pill px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
          >
            WhatsApp Karo
          </a>
        </div>

        <button
          aria-label={open ? "Menu band karo" : "Menu kholo"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-ink hover:bg-tape md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-tape bg-paper transition-[max-height] duration-300",
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
