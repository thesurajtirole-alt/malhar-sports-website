import { Hero } from "@/components/home/Hero";
import { MatchdayTicker } from "@/components/home/MatchdayTicker";
import { StoreGallery } from "@/components/home/StoreGallery";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PersonalityTeaser } from "@/components/home/PersonalityTeaser";
import { DailyChallenge } from "@/components/home/DailyChallenge";

export default function Home() {
  return (
    <>
      <Hero />
      <MatchdayTicker />
      <StoreGallery />
      <NewArrivals />
      <PersonalityTeaser />
      <DailyChallenge />
    </>
  );
}
