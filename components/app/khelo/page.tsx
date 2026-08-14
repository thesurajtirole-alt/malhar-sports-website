import type { Metadata } from "next";
import Link from "next/link";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Khelo — Games, Quiz aur Calculators",
  description:
    "Sports Personality Quiz, Guess The Player, Daily Challenge, BMI/Running/Water calculators — sab kuch ek jagah.",
  alternates: { canonical: "/khelo" },
};

const games = [
  {
    href: "/khelo/sports-personality",
    emoji: "🧠",
    title: "Sports Personality Quiz",
    desc: "Tu Weekend Warrior hai ya Daily Grinder? 4 sawaal, pata chal jayega.",
  },
  {
    href: "/khelo/aaj-ka-challenge",
    emoji: "🎯",
    title: "Aaj Ka Challenge",
    desc: "Roz naya sawaal. Streak banao.",
  },
  {
    href: "/khelo/guess-the-player",
    emoji: "🕵️",
    title: "Guess The Player",
    desc: "3 clues, ek legend. Bata sakta hai kaun hai?",
  },
  {
    href: "/khelo/sports-fact",
    emoji: "💡",
    title: "Sports Fact of the Day",
    desc: "Ek fact jo tu apne dost ko bhi bolega.",
  },
];

const calculators = [
  {
    href: "/khelo/calculators/bmi",
    emoji: "⚖️",
    title: "BMI Calculator",
    desc: "Apna Body Mass Index nikaalo.",
  },
  {
    href: "/khelo/calculators/running",
    emoji: "🏃",
    title: "Running Calculator",
    desc: "Pace se race time nikaalo — 5K se marathon tak.",
  },
  {
    href: "/khelo/calculators/water-intake",
    emoji: "💧",
    title: "Water Intake Calculator",
    desc: "Roz kitna paani peena chahiye, pata karo.",
  },
];

function Grid({ items }: { items: typeof games }) {
  return (
    <StaggerGroup className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item.href}>
          <Link
            href={item.href}
            data-cursor="Play →"
            className="group block rounded-card border border-tape bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange/10"
          >
            <span className="text-3xl">{item.emoji}</span>
            <h3 className="mt-3 font-display text-xl normal-case tracking-normal">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-ink/65">{item.desc}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-orange opacity-0 transition-opacity group-hover:opacity-100">
              Khelo Ab →
            </span>
          </Link>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

export default function KheloPage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="dots" grain={false} />
      <div className="relative mx-auto max-w-5xl px-4 py-16 md:px-6">
        <RevealOnScroll>
          <h1 className="text-center font-display text-4xl md:text-5xl">
            Khelo
          </h1>
          <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
            Bina login ke, bina bakwaas ke. Seedha khelo.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="mb-6 mt-14 font-display text-2xl normal-case tracking-normal">
            Games & Quiz
          </h2>
        </RevealOnScroll>
        <Grid items={games} />

        <RevealOnScroll delay={0.1}>
          <h2 className="mb-6 mt-14 font-display text-2xl normal-case tracking-normal">
            Calculators
          </h2>
        </RevealOnScroll>
        <Grid items={calculators} />
      </div>
    </div>
  );
}
