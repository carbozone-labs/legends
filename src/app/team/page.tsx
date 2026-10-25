import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { LeadershipCard } from "@/components/shared/LeadershipCard";
import { TeamArchive } from "@/components/sections/TeamArchive";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { joinHref } from "@/data/club";
import { clubRole, currentYear, getTerm, latestRole, people, requirePerson } from "@/data/leadership";

export const metadata: Metadata = pageMeta({
  title: "Meet the Legends",
  description: "The presidents and secretaries who have led the Rotaract Club of Pune City Legends, from 2024–2025 to 2026–2027.",
  path: "/team",
});

export default function TeamPage() {
  const term = getTerm(currentYear)!;
  const board = [
    { person: requirePerson(term.president), role: "Club President" },
    { person: requirePerson(term.secretary), role: "Club Secretary" },
  ];
  return (
    <>
      <PageHero lines={["The people behind", "the purpose."]} intro="Meet the people who contribute to the LEGENDS journey." next="current-board" motif="logo-left" />

      <section id="current-board" aria-labelledby="board-title" className="section-y">
        <Container>
          <SectionHeading id="board-title" title={`Current board, ${currentYear}`} intro="The documented leadership for the current academic year." />
          <ul className="mt-14 grid max-w-3xl grid-cols-1 gap-6 xs:grid-cols-2">
            {board.map(({ person, role }, i) => (
              <Reveal as="li" key={person.slug} delay={i * 0.12}>
                <LeadershipCard person={person} role={role} year={currentYear} current />
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-xs text-ivory/55">Additional board positions will be added once supplied by the club. Portraits to be added.</p>
        </Container>
      </section>

      <TeamArchive />

      <section id="members" aria-labelledby="members-title" className="section-y">
        <Container>
          <SectionHeading id="members-title" title="All leaders" intro="Everyone who has served as president or secretary. Open a profile for their documented roles." />
          <ul className="mt-14 grid grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-4">
            {people.map((p, i) => {
              const r = latestRole(p.slug);
              return (
                <Reveal as="li" key={p.slug} delay={(i % 4) * 0.08}>
                  <LeadershipCard person={p} role={clubRole(r.role)} year={r.year} current={r.year === currentYear} />
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Walk the journey. Join the movement."
        actions={[
          { label: "Explore Our Journey", href: "/journey" },
          { label: "Join the Movement", href: joinHref, variant: "secondary" },
        ]}
      />
    </>
  );
}
