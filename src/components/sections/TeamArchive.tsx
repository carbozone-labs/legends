"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { currentYear, requirePerson, terms } from "@/data/leadership";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { YearTimeline } from "@/components/shared/YearTimeline";
import { LeadershipCard } from "@/components/shared/LeadershipCard";
import { EASE } from "@/lib/animations";

const years = terms.map((t) => t.year);

export function TeamArchive() {
  const [i, setI] = useState(years.length - 2); // open on the previous year; the current board is shown above
  const term = terms[i];
  return (
    <section id="archive" aria-labelledby="archive-title" className="section-y bg-charcoal">
      <Container>
        <SectionHeading id="archive-title" title="Leadership archive" intro="Select an academic year to see its president and secretary." />
        <div className="mt-14">
          <YearTimeline years={years} value={i} onChange={setI} currentYear={currentYear} label="Leadership archive year" panelId="archive-panel" />
        </div>
        <div id="archive-panel" role="tabpanel" aria-labelledby={`archive-panel-tab-${i}`} tabIndex={0} className="mt-12 min-h-[28rem]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={term.year}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid max-w-3xl grid-cols-1 gap-6 xs:grid-cols-2"
            >
              <li><LeadershipCard person={requirePerson(term.president)} role="Club President" year={term.year} current={term.year === currentYear} /></li>
              <li><LeadershipCard person={requirePerson(term.secretary)} role="Club Secretary" year={term.year} current={term.year === currentYear} /></li>
            </motion.ul>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
