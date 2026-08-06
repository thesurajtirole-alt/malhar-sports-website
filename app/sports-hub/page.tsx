import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sports Hub — Cricket, Football, Badminton, Running, Gym",
  description:
    "Har sport ke liye guides, tools aur games — ek jagah. Apna sport choose karo, explore karo.",
  alternates: { canonical: "/sports-hub" },
};

const categories = [
  {
    key: "cricket",
    emoji: "🏏",
    title: "Cricket",
    desc: "Bat size guide, kit checklist, aur bhi",
    links: [
      { href: "/blog/cricket-bat-size-kaise-decide-kare", label: "Cricket Bat Guide" },
      { href: "/blog?category=cricket", label: "Saare Cricket Articles" },
    ],
  },
  {
    key: "football",
    emoji: "⚽",
    title: "Football",
    desc: "Studs guide, shoes, jerseys",
    links: [
      { href: "/blog?category=football", label: "Football Articles" },
      { href: "/khelo/guess-the-player", label: "Guess The Player" },
    ],
  },
  {
    key: "badminton",
    emoji: "🏸",
    title: "Badminton",
    desc: "Racket weight, grip, shuttlecocks",
    links: [
      { href: "/blog?category=badminton", label: "Badminton Articles" },
      { href: "/khelo/aaj-ka-challenge", label: "Aaj Ka Challenge" },
    ],
  },
  {
    key: "running",
    emoji: "🏃",
    title: "Running",
    desc: "Shoes guide, pace calculator, training",
    links: [
      { href: "/blog/running-shoes-kaise-choose-kare", label: "Running Shoes Guide" },
      { href: "/khelo/calculators/running", label: "Running Pace Calculator" },
    ],
  },
  {
    key: "gym",
    emoji: "🏋️",
    title: "Gym & Fitness",
    desc: "BMI, water intake, gear",
    links: [
      { href: "/khelo/calculators/bmi", label: "BMI Calculator" },
      { href: "/khelo/calculators/water-intake", label: "Water Intake Calculator" },
    ],
  },
  {
    key: "school",
    emoji: "🎒",
    title: "School Sports",
    desc: "Sports day kits, PT shoes, bulk orders",
    links: [
      { href: "/store", label: "Bulk Order Ke Liye Visit Karo" },
    ],
  },
];

export default function SportsHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-center font-display text-4xl md:text-5xl">
        Sports Hub
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
        Apna sport choose karo — guides, tools, aur games sab yaha milega.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.key} className="rounded-card border border-tape p-6">
            <span className="text-3xl">{cat.emoji}</span>
            <h2 className="mt-3 font-display text-xl normal-case tracking-normal">
              {cat.title}
            </h2>
            <p className="mt-1 text-sm text-ink/60">{cat.desc}</p>
            <div className="mt-4 space-y-2">
              {cat.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-semibold text-orange hover:underline"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
