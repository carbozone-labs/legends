import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CalendarCheck, Plus } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { JourneyTimelineSection } from "@/components/sections/JourneyTimelineSection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { club } from "@/data/club";

export const metadata: Metadata = pageMeta({
  title: "Our Journey",
  description: "The leadership journey of the Rotaract Club of Pune City Legends, from its charter on 8 August 2024 to 2026–2027.",
  path: "/journey",
});

export default function JourneyPage() {
  return (
    <>
      <PageHero lines={["Built by people.", "United by purpose."]} intro="Explore the leadership journey of LEGENDS." next="timeline" />
      <JourneyTimelineSection />

      <section id="milestones" aria-labelledby="milestones-title" className="section-y bg-charcoal">
        <Container>
          <SectionHeading id="milestones-title" title="Milestones" intro="Verified milestones and event highlights will be added here. Only the charter date is documented so far." />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            <Reveal as="li">
              <div className="h-full border border-saffron/60 p-6">
                <CalendarCheck aria-hidden className="size-6 text-saffron" />
                <p className="mt-5 font-display text-4xl uppercase leading-none">{club.chartered}</p>
                <p className="mt-3 text-ivory/70">Club chartered.</p>
              </div>
            </Reveal>
            {[1, 2].map((n) => (
              <Reveal as="li" key={n} delay={n * 0.1}>
                <div className="flex h-full min-h-40 flex-col justify-between border border-dashed border-gold/35 p-6 text-ivory/55">
                  <Plus aria-hidden className="size-6" />
                  <p className="text-sm">Milestone to be added. Placeholder.</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <ImpactStats title="The numbers so far" />

      <CTASection
        title="Keep exploring."
        actions={[
          { label: "Meet the Legends", href: "/team" },
          { label: "Our Story", href: "/our-story", variant: "secondary" },
          { label: "Explore Events", href: "/events", variant: "secondary" },
        ]}
      />
    </>
  );
}
