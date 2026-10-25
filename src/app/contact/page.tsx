import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { OfficialFormPanel } from "@/components/forms/OfficialFormPanel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CLUB_FORM_URL, club } from "@/data/club";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description: "Questions, ideas or opportunities to collaborate? Connect with the Rotaract Club of Pune City Legends through our official enquiry form.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, socials } = club.contact;
  const rows = [
    { icon: ArrowUpRight, label: "Official enquiry form", text: "Open on Google Forms", href: CLUB_FORM_URL, external: true },
    email && { icon: Mail, label: "Email", text: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: "Phone", text: phone, href: `tel:${phone}` },
    ...socials.map((s) => ({ icon: ArrowUpRight, label: s.label, text: s.href, href: s.href, external: true })),
  ].filter(Boolean) as { icon: typeof Mail; label: string; text: string; href: string; external?: boolean }[];

  return (
    <>
      <PageHero lines={["Let’s start a", "conversation."]} intro="Questions, ideas, or opportunities to collaborate? Connect with LEGENDS." next="reach-us" motif="logo-left">
        <Button href={CLUB_FORM_URL} external>Contact / Enquiry Form</Button>
      </PageHero>

      <section id="reach-us" aria-labelledby="reach-title" className="section-y">
        <Container>
          <SectionHeading id="reach-title" title="Reach the club" />
          <ul className="mt-14 divide-y divide-gold/20 border-y border-gold/20">
            {rows.map((r) => (
              <Reveal as="li" key={r.label}>
                <a href={r.href} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex min-h-20 items-center justify-between gap-4 py-4">
                  <span>
                    <span className="block text-sm text-gold">{r.label}</span>
                    <span className="block font-display text-[clamp(1.6rem,4vw,3rem)] uppercase leading-none transition-colors group-hover:text-saffron">{r.text}</span>
                  </span>
                  <r.icon aria-hidden className="size-6 shrink-0 text-ivory/50 group-hover:text-saffron" />
                  {r.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-6 max-w-prose text-sm text-ivory/60">The club’s email address, phone number and social links will be added here once the club supplies them.</p>
          </Reveal>
        </Container>
      </section>

      <section id="message" aria-labelledby="message-title" className="section-y border-t hairline bg-charcoal">
        <Container className="max-w-4xl">
          <h2 id="message-title" className="sr-only">Send an enquiry</h2>
          <Reveal>
            <div className="border border-gold/25 p-6 sm:p-10">
              <OfficialFormPanel title="Send us a message" text="Questions, ideas or partnership proposals all start with the same official enquiry form." buttonLabel="Contact / Enquiry Form" />
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Want to do more than say hello?"
        actions={[
          { label: "Join the Movement", href: "/join" },
          { label: "Explore Collaborations", href: "/collaborations", variant: "secondary" },
        ]}
      />
    </>
  );
}
