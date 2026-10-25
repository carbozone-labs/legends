"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { badges } from "@/data/legendZone";
import { isUnlocked } from "@/lib/legendZone";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AchievementCard } from "./AchievementCard";
import { AnimatedNumber } from "./AnimatedNumber";
import { ContributionSelector } from "./ContributionSelector";
import { DemoActivityList } from "./DemoActivityList";
import { LevelBadge } from "./LevelBadge";
import { XPProgress } from "./XPProgress";
import { useZone } from "./ZoneProvider";

export function DemoDashboard() {
  const { xp, level, activities, reset } = useZone();
  const unlocked = badges.filter((b) => isUnlocked(b, activities)).length;
  const link = "inline-flex min-h-11 items-center text-sm font-semibold text-saffron underline-offset-4 hover:underline";

  return (
    <>
      <section aria-labelledby="overview-title" className="section-y pb-0">
        <Container>
          <Reveal>
            <h2 id="overview-title" className="text-sm font-medium text-gold">Welcome back, Demo Member</h2>
            <p className="mt-1 text-xs text-ivory/60">A fictional member for illustration. No real person, no personal details.</p>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="text-sm text-ivory/70">Total demonstration XP</p>
              <p className="font-display text-[clamp(5rem,16vw,9rem)] leading-[0.9] text-ivory"><AnimatedNumber value={xp} /></p>
              <div className="mt-4"><LevelBadge title={level.current.title} /></div>
              <p className="mt-2 text-xs text-ivory/55">Proposed demo title. Awaiting club approval.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="border border-gold/25 p-6">
                <h3 className="font-display text-2xl uppercase">Progress to next level</h3>
                <div className="mt-5"><XPProgress level={level} /></div>
                <p className="mt-4 text-xs text-ivory/55">{unlocked} of {badges.length} demo badges unlocked</p>
                <div className="mt-4 flex flex-wrap gap-x-6">
                  <Link href="/legend-zone/leaderboard" className={link}>View the demo leaderboard</Link>
                  <Link href="/legend-zone/achievements" className={link}>See achievements and levels</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="simulate" aria-labelledby="simulate-title" className="section-y">
        <Container className="max-w-4xl">
          <Reveal>
            <h2 id="simulate-title" className="text-display text-[clamp(2rem,6vw,4rem)]">Try a simulated contribution</h2>
            <p className="mb-8 mt-4 max-w-prose text-ivory/70">XP values are proposed in the club document and are pending approval. Nothing you do here is recorded.</p>
            <ContributionSelector />
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="activity-title" className="section-y border-y hairline bg-charcoal">
        <Container className="max-w-4xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="activity-title" className="text-display text-[clamp(2rem,6vw,4rem)]">Recent activity</h2>
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 border border-gold/35 px-4 text-sm text-ivory/80 transition-colors hover:border-saffron hover:text-saffron">
              <RotateCcw aria-hidden className="size-4" /> Reset demo
            </button>
          </div>
          <div className="mt-8"><DemoActivityList /></div>
        </Container>
      </section>

      <section aria-labelledby="badges-title" className="section-y">
        <Container>
          <h2 id="badges-title" className="text-display text-[clamp(2rem,6vw,4rem)]">Demo badges</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((b) => <li key={b.id}><AchievementCard badge={b} unlocked={isUnlocked(b, activities)} /></li>)}
          </ul>
        </Container>
      </section>
    </>
  );
}
