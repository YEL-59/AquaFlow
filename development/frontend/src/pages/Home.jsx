import React, { useState } from "react";
import {
  HeroSection,
  FeatureCardsSection,
  LeaderIndustrySection,
  DrinkingWaterSection,
  WaveDivider,
  TechnologySection,
  TestimonialsSection,
  StatsCounterBar,
  BlogSection,
  DeliveryServiceSection,
  VideoModal,
} from "../components/home";

export function Home({ onAddToCart }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="space-y-0 text-slate-800 dark:text-slate-100 overflow-hidden w-full">
      <HeroSection onOpenVideo={() => setVideoModalOpen(true)} />
      <FeatureCardsSection />
      <LeaderIndustrySection />
      <DrinkingWaterSection />
      <WaveDivider />
      <TechnologySection onOpenVideo={() => setVideoModalOpen(true)} />
      <TestimonialsSection />
      <StatsCounterBar />
      <BlogSection />
      <DeliveryServiceSection />
      {videoModalOpen && <VideoModal onClose={() => setVideoModalOpen(false)} />}
    </div>
  );
}
