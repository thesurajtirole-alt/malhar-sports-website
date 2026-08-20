import Link from "next/link";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

const paths = [
  {
    href: "/sports-hub",
    emoji: "🛍️",
    title: "Shop Explore Karo",
    desc: "Sport ke hisaab se gear dhundo — shoes, kit, sab kuch.",
  },
  {
    href: "/turfs",
    emoji: "⚽",
    title: "Turf Book Karo",
    desc: "Indore ke turfs — live slots dekho, seedha book karo.",
  },
  {
    href: "/khelo",
    emoji: "🎮",
    title: "Khelo",
    desc: "Quiz, daily challenge, calculators — bina login ke.",
  },
  {
    href: "/blog",
    emoji: "📚",
    title: "Guides Padho",
    desc: "Sahi gear kaise choose kare — practical tips.",
  },
];

export function WhatYouCanDoHere() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <RevealOnScroll>
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-orange">
          Yaha Kya Kar Sakte Ho
        </p>
      </RevealOnScroll>

      <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paths.map((path) => (
          <StaggerItem key={path.href}>
            <Link
              href={path.href}
              data-cursor="Explore →"
              className="group flex h-full flex-col rounded-card border border-tape bg-paper p-5 transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-md"
            >
              <span className="text-2xl">{path.emoji}</span>
              <p className="mt-3 font-semibold text-ink">{path.title}</p>
              <p className="mt-1 flex-1 text-sm text-ink/60">{path.desc}</p>
              <span className="mt-3 text-sm font-semibold text-orange opacity-0 transition-opacity group-hover:opacity-100">
                Dekho →
              </span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
