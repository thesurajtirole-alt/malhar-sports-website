import { business } from "@/lib/business";

const tickerItems = [
  `⭐ ${business.rating.value}/5 rating — ${business.rating.count} Google reviews`,
  "🏏 Cricket · ⚽ Football · 🏸 Badminton · 🏃 Running · 🏋️ Gym",
  "📍 Dravid Nagar, Indore",
  "🕙 Har din khula — 10 AM se 10 PM",
  "💬 WhatsApp pe seedha coach se baat karo",
];

// Duplicate for seamless infinite scroll
const loopItems = [...tickerItems, ...tickerItems];

export function MatchdayTicker() {
  return (
    <div className="overflow-hidden border-y border-tape bg-orange py-3">
      <div className="animate-ticker flex w-max gap-10 whitespace-nowrap">
        {loopItems.map((item, i) => (
          <span
            key={i}
            className="font-score text-sm font-medium tracking-wide text-white/95"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
