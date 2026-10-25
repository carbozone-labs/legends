"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventCategories, eventYears, events } from "@/data/events";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animations";
import { EmptyState } from "./EmptyState";
import { EventCard, type CardShape } from "./EventCard";

// Varied proportions across the 12-column grid. Repeats every 5 cards.
const layout: { span: string; shape: CardShape }[] = [
  { span: "md:col-span-7", shape: "wide" },
  { span: "md:col-span-5", shape: "tall" },
  { span: "md:col-span-4", shape: "square" },
  { span: "md:col-span-4", shape: "tall" },
  { span: "md:col-span-4", shape: "square" },
];

function Pills({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const all = ["", ...options];
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-xs text-ivory/55">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {all.map((o) => (
          <button
            key={o || "all"}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={cn(
              "min-h-11 border px-4 text-sm transition-colors duration-base",
              value === o ? "border-saffron bg-saffron text-obsidian" : "border-gold/35 text-ivory/80 hover:border-saffron hover:text-saffron",
            )}
          >
            {o || "All"}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function EventArchive() {
  const reduce = useReducedMotion();
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(
      (e) => (!q || e.title.toLowerCase().includes(q)) && (!category || e.category === category) && (!year || e.year === year),
    );
  }, [query, category, year]);

  const active = Boolean(query.trim() || category || year);
  const clear = () => { setQuery(""); setCategory(""); setYear(""); };

  return (
    <section id="archive" aria-labelledby="archive-title" className="section-y border-t hairline bg-charcoal">
      <Container>
        <SectionHeading id="archive-title" title="Event archive" intro="Search by name, or narrow the archive by category and academic year." />

        <div role="search" className="mt-12 space-y-6 border-y hairline py-8">
          <div>
            <label htmlFor={searchId} className="mb-2 block text-xs text-ivory/55">Search by event name</label>
            <div className="relative max-w-xl">
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ivory/55" />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type an event name"
                autoComplete="off"
                className="min-h-12 w-full border border-gold/35 bg-obsidian pl-12 pr-4 text-ivory placeholder:text-ivory/50 focus:border-saffron"
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {eventCategories.length > 0 && <Pills label="Category" options={eventCategories} value={category} onChange={setCategory} />}
            {eventYears.length > 0 && <Pills label="Academic year" options={eventYears} value={year} onChange={setYear} />}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <p aria-live="polite" className="text-sm text-ivory/60">
              Showing {results.length} of {events.length} {events.length === 1 ? "event" : "events"}
            </p>
            {active && (
              <button type="button" onClick={clear} className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-saffron underline-offset-4 hover:underline">
                <X aria-hidden className="size-4" /> Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="mt-12">
          {results.length === 0 ? (
            <EmptyState title="No events match">
              Try a different name, or clear the filters to see every event.
              <div className="mt-6"><button type="button" onClick={clear} className="min-h-11 border border-saffron px-6 text-saffron transition-colors hover:bg-saffron hover:text-obsidian">Clear filters</button></div>
            </EmptyState>
          ) : (
            <ul className="grid grid-cols-1 items-start gap-x-6 gap-y-14 md:grid-cols-12">
              <AnimatePresence mode="popLayout" initial={false}>
                {results.map((e, i) => {
                  const slot = layout[i % layout.length];
                  return (
                    <motion.li
                      key={e.slug}
                      layout={!reduce}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={slot.span}
                    >
                      <EventCard event={e} shape={slot.shape} sizes={slot.span.includes("7") ? "(min-width:768px) 58vw, 100vw" : "(min-width:768px) 40vw, 100vw"} />
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
