"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { currentYear, requirePerson, terms } from "@/data/leadership";
import { Container } from "@/components/ui/Container";
import { YearTimeline } from "@/components/shared/YearTimeline";
import { EASE } from "@/lib/animations";

const years = terms.map((t) => t.year);

export function JourneyTimelineSection() {
  const [i, setI] = useState(years.length - 1);
  const term = terms[i];
  const people = [
    { label: "Club President", p: requirePerson(term.president) },
    { label: "Club Secretary", p: requirePerson(term.secretary) },
  ];

  return (
    <section id="timeline" aria-labelledby="timeline-title" className="section-y">
      <Container>
        <h2 id="timeline-title" className="text-display text-[clamp(2.1rem,7vw,5.5rem)]">Leadership, year by year</h2>
        <p className="mt-6 max-w-prose text-lg text-ivory/70">Choose an academic year to see who led the club. Each secretary went on to serve as the next year’s president.</p>

        <div className="mt-16">
          <YearTimeline years={years} value={i} onChange={setI} currentYear={currentYear} label="Academic year" panelId="journey-panel" />
        </div>

        <div id="journey-panel" role="tabpanel" aria-labelledby={`journey-panel-tab-${i}`} className="mt-14 min-h-[14rem] border-t hairline pt-10" tabIndex={0}>
          <AnimatePresence mode="wait">
            <motion.div
              key={term.year}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid gap-10 sm:grid-cols-2"
            >
              {people.map(({ label, p }) => (
                <div key={label}>
                  <p className="text-sm text-gold">{label} · {term.year}</p>
                  <Link href={`/team/${p.slug}`} className="group mt-3 inline-flex min-h-11 items-start gap-2 font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none transition-colors hover:text-saffron">
                    {p.name}
                    <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                  </Link>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
