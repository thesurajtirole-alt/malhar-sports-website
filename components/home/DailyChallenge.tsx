import Link from "next/link";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

const cards = [
  {
    href: "/khelo/aaj-ka-challenge",
    emoji: "🎯",
    title: "Aaj Ka Challenge",
    desc: "Roz naya sawaal. Streak banao, badge jeeto.",
  },
  {
    href: "/khelo/guess-the-player",
    emoji: "🕵️",
    title: "Guess The Player",
    desc: "Blurry photo dekho, player ka naam bolo.",
  },
  {
    href: "/khelo/sports-fact",
    emoji: "💡",
    title: "Sports Fact of the Day",
    desc: "Ek fact jo tu apne dost ko bhi bolega.",
  },
];

export function DailyChallenge() {
  return (
    <section className="relative overflow-hidden py-16">
      <BackgroundEffects variant="dots" grain={false} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <RevealOnScroll>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl md:text-4xl">Khelo Aaj</h2>
            <Link
              href="/khelo"
              data-cursor="Explore →"
              className="text-sm font-semibold text-orange hover:underline"
            >
              Sab Games Dekho →
            </Link>
          </div>
        </RevealOnScroll>
        <StaggerGroup className="grid gap-5 sm:grid-cols-3">
          {cards.map((card) => (
            <StaggerItem key={card.href}>
              <Link
                href={card.href}
                data-cursor="Play →"
                className="group block rounded-card border border-tape bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange/10"
              >
                <span className="text-3xl">{card.emoji}</span>
                <h3 className="mt-3 font-display text-xl normal-case tracking-normal">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-ink/65">{card.desc}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-orange opacity-0 transition-opacity group-hover:opacity-100">
                  Khelo Ab →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
