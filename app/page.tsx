import { Hero } from "@/components/home/Hero";
import { MatchdayTicker } from "@/components/home/MatchdayTicker";
import { StoreGallery } from "@/components/home/StoreGallery";
import { PersonalityTeaser } from "@/components/home/PersonalityTeaser";
import { DailyChallenge } from "@/components/home/DailyChallenge";

export default function Home() {
  return (
    <>
      <Hero />
      <MatchdayTicker />
      <StoreGallery />
      <PersonalityTeaser />
      <DailyChallenge />
    </>
  );
}
