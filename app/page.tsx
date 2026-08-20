import { Hero } from "@/components/home/Hero";
import { WhatYouCanDoHere } from "@/components/home/WhatYouCanDoHere";
import { MatchdayTicker } from "@/components/home/MatchdayTicker";
import { StoreGallery } from "@/components/home/StoreGallery";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PersonalityTeaser } from "@/components/home/PersonalityTeaser";
import { DailyChallenge } from "@/components/home/DailyChallenge";

export default function Home() {
  return (
    <>
      {/* 1. Hero — value prop + ONE primary CTA */}
      <Hero />
      {/* 2. Orientation — answers "what can I do here" immediately */}
      <WhatYouCanDoHere />
      {/* 3. Trust — credibility signals before asking for more engagement */}
      <MatchdayTicker />
      <StoreGallery />
      {/* 4. Secondary discovery — optional exploration, not competing for first glance */}
      <NewArrivals />
      <PersonalityTeaser />
      <DailyChallenge />
    </>
  );
}
