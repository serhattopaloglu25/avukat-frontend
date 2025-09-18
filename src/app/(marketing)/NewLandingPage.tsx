'use client';

import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { Hero } from '@/components/marketing/Hero';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { PricingTeaser } from '@/components/marketing/PricingTeaser';
import { FinalCTA } from '@/components/marketing/FinalCTA';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';

export default function NewLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />
      <main>
        <Hero />
        <FeatureGrid />
        <PricingTeaser />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}
