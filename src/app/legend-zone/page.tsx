import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { PrototypeNotice } from "@/components/legend-zone/PrototypeNotice";
import { XPProgress } from "@/components/legend-zone/XPProgress";
import { LevelBadge } from "@/components/legend-zone/LevelBadge";
import { BadgeEmblem } from "@/components/legend-zone/AchievementCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { badges, sampleActivities, xpActions } from "@/data/legendZone";
import { levelFor, totalXp } from "@/lib/legendZone";

export const metadata: Metadata = pageMeta({
  title: "Legend Zone",
  description: "A prototype of a members’ space celebrating participation, teamwork, learning and contribution. Demonstration only.",
  path: "/legend-zone",
});

export default function LegendZonePage() {
  const previewXp = totalXp(sampleActivities);
  const previewLevel = levelFor(previewXp);
  return (
    <>
      <PageHero
        lines={["Your contributions.", "Your journey.", "Your legacy."]}
        intro="A space to celebrate participation, teamwork, learning, and meaningful contributions to the LEGENDS community."
        next="preview"
      >
        <div className="space-y-6">
          <Button href="/legend-zone/dashboard">Open the demo dashboard</Button>
          <PrototypeNotice />
        </div>
      </PageHero>

      <section id="preview" aria-labelledby="preview-title" className="section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionHeading id="preview-title" title="A dashboard preview" intro="Members would see their contributions, their progress and their badges in one place. This is a static preview with fictional data." />
              <Reveal delay={0.1}><div className="mt-8"><Button href="/legend-zone/dashboard" variant="secondary">Try the interactive demo</Button></div></Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="border border-gold/25 p-6 sm:p-8">
                <p className="text-xs text-gold">Demo Member · fictional · sample data</p>
                <p className="mt-4 font-display text-7xl leading-none">{previewXp}<span className="ml-2 text-2xl text-ivory/60">XP</span></p>
                <div className="mt-4"><LevelBadge title={previewLevel.current.title} /></div>
                <div className="mt-6"><XPProgress level={previewLevel} /></div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="xp" aria-labelledby="xp-title" className="section-y border-y hairline bg-charcoal">
        <Container>
          <SectionHeading id="xp-title" title="The Legend XP idea" intro="Points for meaningful contributions, not just attendance. These values are proposed in the club document and are pending club approval." />
          <ul className="mt-14 divide-y divide-gold/20 border-y border-gold/20">
            {xpActions.map((a, i) => (
              <Reveal as="li" key={a.id} delay={(i % 2) * 0.06}>
                <div className="flex items-baseline justify-between gap-6 py-6">
                  <span className="font-display text-[clamp(1.8rem,4.6vw,3.5rem)] uppercase leading-none">{a.label}</span>
                  <span className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-none text-saffron">+{a.xp}<span className="ml-1 text-base text-ivory/55">XP</span></span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section id="badges" aria-labelledby="badges-title" className="section-y">
        <Container>
          <SectionHeading id="badges-title" title="Badges for what matters" intro="Six proposed badge categories. They are ideas for discussion, not confirmed club awards." />
          <ul className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {badges.map((b, i) => (
              <Reveal as="li" key={b.id} delay={i * 0.05} className="flex flex-col items-center text-center">
                <BadgeEmblem id={b.id} unlocked={i % 2 === 0} />
                <span className="mt-3 font-display text-lg uppercase leading-tight">{b.title}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal><p className="mt-10"><Link href="/legend-zone/achievements" className="inline-flex min-h-11 items-center font-semibold text-saffron underline-offset-4 hover:underline">See all badges and levels</Link></p></Reveal>
        </Container>
      </section>

      <section id="recognition" aria-labelledby="recognition-title" className="section-y border-y hairline bg-charcoal">
        <Container className="max-w-4xl">
          <h2 id="recognition-title" className="text-sm font-medium text-gold">Teamwork and contribution</h2>
          <Reveal><p className="text-display mt-6 text-[clamp(2.4rem,7vw,5.5rem)]">Reward teamwork and service, <span className="text-saffron">not just popularity.</span></p></Reveal>
          <Reveal delay={0.1}><p className="mt-8 max-w-prose text-lg text-ivory/70">That is the principle in the club document. Any leaderboard would be shown only if members agree. The demo leaderboard exists to help the club decide.</p></Reveal>
        </Container>
      </section>

      <CTASection title="See it in action." actions={[{ label: "Open the demo dashboard", href: "/legend-zone/dashboard" }, { label: "View the demo leaderboard", href: "/legend-zone/leaderboard", variant: "secondary" }]} note="Prototype only. No real member records, XP or contributions are used." />
    </>
  );
}
