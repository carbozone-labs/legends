import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { CollaborationStats } from "@/components/collaborations/CollaborationStats";
import { PartnershipShowcase } from "@/components/collaborations/PartnershipShowcase";
import { FeaturedCollaborations } from "@/components/collaborations/FeaturedCollaborations";
import { WhyCollaborate } from "@/components/collaborations/WhyCollaborate";
import { joinHref } from "@/data/club";

export const metadata: Metadata = pageMeta({
  title: "Collaborations",
  description: "Building connections, sharing ideas and creating opportunities through meaningful collaboration with the Rotaract Club of Pune City Legends.",
  path: "/collaborations",
});

export default function CollaborationsPage() {
  return (
    <>
      <PageHero lines={["Together,", "we go beyond."]} intro="Building connections, sharing ideas, and creating opportunities through meaningful collaboration." next="numbers" motif="network" />
      <CollaborationStats />
      <PartnershipShowcase />
      <FeaturedCollaborations />
      <WhyCollaborate />
      <CTASection
        title="Let’s create something meaningful together."
        actions={[{ label: "Join the Movement", href: joinHref }]}
        intro="Interested in working with LEGENDS? Start a conversation about a potential collaboration."
      />
    </>
  );
}
