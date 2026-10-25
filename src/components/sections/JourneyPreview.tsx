"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { journey } from "@/data/club";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animations";

export function JourneyPreview() {
  const [i, setI] = useState(journey.length - 1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const y = journey[i];

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    const next = e.key === "ArrowRight" ? (idx + 1) % journey.length : e.key === "ArrowLeft" ? (idx - 1 + journey.length) % journey.length : null;
    if (next === null) return;
    e.preventDefault();
    setI(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="journey" aria-labelledby="journey-title" className="section-y bg-charcoal">
      <Container>
        <SectionHeading id="journey-title" title="Our journey" intro="Each year’s secretary stepped up as the next year’s president. Choose a year to see who led the club." />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div role="tablist" aria-label="Leadership year" className="flex gap-0 border-b hairline lg:flex-col lg:border-b-0 lg:border-l">
            {journey.map((j, idx) => (
              <button
                key={j.years}
                ref={(el) => { tabs.current[idx] = el; }}
                role="tab"
                id={`tab-${idx}`}
                aria-selected={i === idx}
                aria-controls="journey-panel"
                tabIndex={i === idx ? 0 : -1}
                onClick={() => setI(idx)}
                onKeyDown={(e) => onKey(e, idx)}
                className={cn(
                  "relative min-h-14 flex-1 px-3 py-3 text-left font-display text-2xl tracking-wide transition-colors duration-base sm:text-3xl lg:flex-none lg:px-8",
                  i === idx ? "text-saffron" : "text-ivory/55 hover:text-ivory",
                )}
              >
                {i === idx && <motion.span layoutId="journey-mark" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-saffron lg:inset-y-0 lg:bottom-auto lg:-left-px lg:right-auto lg:h-auto lg:w-0.5" />}
                {j.years}
              </button>
            ))}
          </div>

          <div id="journey-panel" role="tabpanel" aria-labelledby={`tab-${i}`} className="min-h-[16rem]">
            <AnimatePresence mode="wait">
              <motion.dl
                key={y.years}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid gap-10 sm:grid-cols-2"
              >
                <div className="border-t border-saffron pt-5">
                  <dt className="text-sm text-gold">Club President</dt>
                  <dd className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] uppercase leading-none">{y.president}</dd>
                </div>
                <div className="border-t hairline pt-5">
                  <dt className="text-sm text-gold">Club Secretary</dt>
                  <dd className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] uppercase leading-none">{y.secretary}</dd>
                </div>
              </motion.dl>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-12"><Button href="/journey" variant="secondary">Explore the full journey</Button></div>
      </Container>
    </section>
  );
}
