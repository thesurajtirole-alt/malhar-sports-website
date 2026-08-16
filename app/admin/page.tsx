import Link from "next/link";

const cards = [
  {
    href: "/admin/new-arrivals",
    emoji: "🆕",
    title: "New Arrivals",
    desc: "Homepage pe dikhne wale naye products manage karo.",
  },
  {
    href: "/admin/academies",
    emoji: "🏟️",
    title: "Indore Directory",
    desc: "Academies aur grounds ki listing edit karo.",
  },
  {
    href: "/admin/turfs",
    emoji: "⚽",
    title: "Turfs",
    desc: "Booking ke liye turfs add/edit karo.",
  },
  {
    href: "/admin/bookings",
    emoji: "📅",
    title: "Bookings",
    desc: "Turf bookings dekho.",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-3xl normal-case tracking-normal">
        Admin Dashboard
      </h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-card border border-tape p-6 transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-3xl">{c.emoji}</span>
            <h2 className="mt-3 font-semibold">{c.title}</h2>
            <p className="mt-1 text-sm text-ink/60">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
