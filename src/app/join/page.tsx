import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { JoinEnquiry } from "@/components/forms/JoinEnquiry";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = pageMeta({
  title: "Join the Movement",
  description: "Start a conversation about becoming part of the Rotaract Club of Pune City Legends, or about a partnership with the club.",
  path: "/join",
});

// Each value comes from the club document (About Us, theme, manifesto). These are values, not membership benefits.
const values = [
  { name: "Ethical leadership", source: "From our About Us" },
  { name: "Selfless service", source: "From our About Us" },
  { name: "Cultural pride", source: "From our About Us" },
  { name: "Learning from one another", source: "From our theme" },
  { name: "Collective progress", source: "From our theme" },
];

export default function JoinPage() {
  return (
    <>
      <PageHero lines={["Your story could be the", "next legendary one."]} intro="Discover the spirit of LEGENDS and start a conversation about becoming part of our journey." next="why">
        <Button href="#enquiry">Start Your Enquiry</Button>
      </PageHero>

      <section id="why" aria-labelledby="why-title" className="section-y">
        <Container>
          <SectionHeading id="why-title" title="What we stand for" />
          <ul className="mt-14 divide-y divide-gold/20 border-y border-gold/20">
            {values.map((v, i) => (
              <Reveal as="li" key={v.name} delay={(i % 3) * 0.05}>
                <div className="group flex flex-col justify-between gap-1 py-6 sm:flex-row sm:items-baseline">
                  <span className="font-display text-[clamp(1.9rem,5.2vw,4rem)] uppercase leading-none transition-colors duration-base group-hover:text-saffron">{v.name}</span>
                  <span className="text-sm text-ivory/55">{v.source}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-8 max-w-prose text-sm text-ivory/55">These are the values the club describes for itself. They are not guarantees of membership benefits. Details about eligibility and how joining works will be shared by the club.</p>
          </Reveal>
        </Container>
      </section>

      <section id="enquiry" aria-labelledby="enquiry-title" className="section-y border-t hairline bg-charcoal">
        <Container className="max-w-4xl">
          <SectionHeading id="enquiry-title" title="Start your enquiry" intro="Choose the kind of enquiry, then continue to our official form. Sending an enquiry does not grant membership or confirm a partnership." />
          <div className="mt-12"><JoinEnquiry /></div>
        </Container>
      </section>

      <CTASection
        title="Not ready yet? Keep exploring."
        actions={[
          { label: "Our Story", href: "/our-story" },
          { label: "Meet the Legends", href: "/team", variant: "secondary" },
        ]}
      />
    </>
  );
}
