import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { FeaturedEvent } from "@/components/events/FeaturedEvent";
import { EventArchive } from "@/components/events/EventArchive";
import { joinHref } from "@/data/club";

export const metadata: Metadata = pageMeta({
  title: "Events",
  description: "Explore the moments, people and experiences that shape the Rotaract Club of Pune City Legends journey.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHero lines={["Every event", "leaves a legacy."]} intro="Explore the moments, people, and experiences that shape the LEGENDS journey." next="featured" />
      <FeaturedEvent />
      <EventArchive />
      <CTASection
        title="Be part of what comes next."
        actions={[{ label: "Join the Movement", href: joinHref }]}
      />
    </>
  );
}
