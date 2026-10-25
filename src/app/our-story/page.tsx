import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { ThemeSection } from "@/components/sections/ThemeSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { club } from "@/data/club";

export const metadata: Metadata = pageMeta({
  title: "Our Story",
  description: "Rooted in timeless Indian values and heritage, the Rotaract Club of Pune City Legends creates meaningful social impact through ethical leadership, cultural pride and selfless service.",
  path: "/our-story",
});

const who = [
  { lead: "Rooted in", text: "timeless Indian values and heritage." },
  { lead: "Made up of", text: "students and professionals." },
  { lead: "Driven by", text: "ethical leadership, cultural pride and selfless service towards the community." },
];

const values = [
  { name: "Ethical leadership", source: "From our About Us" },
  { name: "Cultural pride", source: "From our About Us" },
  { name: "Selfless service", source: "From our About Us" },
  { name: "Learning from one another", source: "From our theme" },
  { name: "Patience and understanding", source: "From our theme" },
  { name: "Collective progress", source: "From our theme" },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        lines={["Every Legend begins", "with a purpose."]}
        intro="Rooted in timeless Indian values and heritage, we strive to create meaningful social impact through ethical leadership, cultural pride, and selfless service."
        next="who-we-are"
      />

      <section id="who-we-are" aria-labelledby="who-title" className="section-y">
        <Container>
          <SectionHeading id="who-title" title="Who we are" />
          <dl className="mt-14 divide-y divide-gold/20 border-y border-gold/20">
            {who.map((w, i) => (
              <Reveal key={w.lead} delay={i * 0.08} className="grid gap-2 py-8 md:grid-cols-[14rem_1fr] md:gap-10">
                <dt className="text-gold">{w.lead}</dt>
                <dd className="font-display text-[clamp(1.8rem,4.6vw,3.5rem)] uppercase leading-[1.05]">{w.text}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal>
            <p className="mt-10 max-w-prose text-lg leading-relaxed text-ivory/70">{club.about}</p>
          </Reveal>
        </Container>
      </section>

      <ThemeSection id="identity" showAbout={false} />

      <section id="mission-vision" aria-labelledby="mv-title" className="section-y">
        <Container>
          <h2 id="mv-title" className="sr-only">Mission and vision</h2>
          <div className="grid gap-px bg-gold/25 md:grid-cols-2">
            {[
              { h: "Our mission", t: "To empower students and professionals to create socially meaningful impact through ethical leadership, cultural pride and selfless service to the community." },
              { h: "Our vision", t: "A community enriched with knowledge, learning from one another with patience and understanding, growing together with perseverance, and leaving a lasting light on society." },
            ].map((m, i) => (
              <Reveal key={m.h} delay={i * 0.1} className="bg-obsidian p-8 md:p-12">
                <h3 className="font-display text-4xl uppercase">{m.h}</h3>
                <p className="mt-6 text-xl leading-relaxed text-ivory/85">{m.t}</p>
                <p className="mt-6 text-xs text-saffron">Proposed wording, derived from our About Us and theme. Awaiting club approval.</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="values" aria-labelledby="values-title" className="section-y bg-charcoal">
        <Container>
          <SectionHeading id="values-title" title="Our values" />
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
        </Container>
      </section>

      <section id="milestone" aria-labelledby="milestone-title" className="section-y">
        <Container>
          <h2 id="milestone-title" className="text-sm font-medium text-gold">Club milestone</h2>
          <Reveal>
            <p className="mt-6 font-display uppercase leading-[0.85]">
              <span className="block text-[clamp(7rem,30vw,22rem)] text-saffron">8</span>
              <span className="block text-[clamp(2.4rem,9vw,7rem)]">August 2024</span>
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-prose border-l-2 border-saffron pl-5 text-xl text-ivory/80">The day the Rotaract Club of Pune City Legends was chartered.</p>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Discover the journey. Become part of the story."
        actions={[
          { label: "Explore Our Journey", href: "/journey" },
          { label: "Meet the Legends", href: "/team", variant: "secondary" },
        ]}
      />
    </>
  );
}
