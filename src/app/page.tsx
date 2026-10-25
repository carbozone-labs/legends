import type { Metadata } from "next";
import { OrganizationJsonLd } from "@/components/layout/OrganizationJsonLd";
import { HeroSection } from "@/components/sections/HeroSection";
import { ThemeSection } from "@/components/sections/ThemeSection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { FeaturedEvents } from "@/components/sections/FeaturedEvents";
import { BoardShowcase } from "@/components/sections/BoardShowcase";
import { JourneyPreview } from "@/components/sections/JourneyPreview";
import { CollaborationsSection } from "@/components/sections/CollaborationsSection";
import { ManifestoPreview } from "@/components/sections/ManifestoPreview";
import { JoinSection } from "@/components/sections/JoinSection";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <HeroSection />
      <ThemeSection />
      <ImpactStats />
      <FeaturedEvents />
      <BoardShowcase />
      <JourneyPreview />
      <CollaborationsSection />
      <ManifestoPreview />
      <JoinSection />
    </>
  );
}
