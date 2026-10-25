"use client";

import { badges, levels } from "@/data/legendZone";
import { isUnlocked } from "@/lib/legendZone";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { AchievementCard } from "./AchievementCard";
import { useZone } from "./ZoneProvider";

export function AchievementsView() {
  const { activities, xp, level } = useZone();
  return (
    <>
      <section aria-labelledby="badges-title" className="section-y">
        <Container>
          <SectionHeading id="badges-title" title="Proposed badges" intro="Six badge categories proposed for discussion. They are not confirmed club awards, and unlock status below only reflects the demo activity on your dashboard." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((b, i) => (
              <Reveal as="li" key={b.id} delay={(i % 3) * 0.07}><AchievementCard badge={b} unlocked={isUnlocked(b, activities)} /></Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section id="levels" aria-labelledby="levels-title" className="section-y border-t hairline bg-charcoal">
        <Container>
          <SectionHeading id="levels-title" title="Levels and titles" intro="Titles and XP thresholds are proposed demonstration settings that need club approval. Three titles come from the club document; the other two come from the website brief." />
          <p className="mt-6 text-sm text-ivory/70">Your demo total: <span className="font-semibold text-ivory">{xp} XP</span></p>
          <ol className="mt-8 divide-y divide-gold/20 border-y border-gold/20">
            {levels.map((l, i) => {
              const state = i < level.index ? "reached" : i === level.index ? "current" : "ahead";
              return (
                <li key={l.title} aria-current={state === "current" ? "step" : undefined} data-state={state}
                  className={cn("flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-5", state === "current" && "bg-obsidian/60 px-3",)}>
                  <div>
                    <p className={cn("font-display text-[clamp(1.7rem,4.4vw,3rem)] uppercase leading-none", state === "current" && "text-saffron", state === "ahead" && "text-ivory/65")}>{l.title}</p>
                    <p className="mt-1 text-xs text-ivory/55">Title from the {l.source}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl">{l.minXp}+ XP</p>
                    <p className="text-xs text-ivory/60">{state === "current" ? "Your current demo title" : state === "reached" ? "Reached in this demo" : "Not reached yet"}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>
    </>
  );
}
