import { Hero } from "@/components/home/Hero";
import { MatchdayTicker } from "@/components/home/MatchdayTicker";
import { PersonalityTeaser } from "@/components/home/PersonalityTeaser";
import { DailyChallenge } from "@/components/home/DailyChallenge";

export default function Home() {
  return (
    <>
      <Hero />
      <MatchdayTicker />
      <PersonalityTeaser />
      <DailyChallenge />
    </>
  );
}
