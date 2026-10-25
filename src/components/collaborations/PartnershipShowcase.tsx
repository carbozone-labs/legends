"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Handshake } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/events/EmptyState";
import { categoriesInUse, collaborations, proposedCategories } from "@/data/collaborations";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { CollaborationCard } from "./CollaborationCard";

export function PartnershipShowcase() {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState("");
  const results = collaborations.filter((r) => !category || r.category === category);

  return (
    <section id="partners" aria-labelledby="partners-title" className="section-y border-y hairline bg-charcoal">
      <Container>
        <SectionHeading id="partners-title" title="Our partners" intro="Approved partner clubs and organizations, shown only once the club has verified and approved them." />

        {collaborations.length === 0 ? (
          <div className="mt-14 space-y-10">
            <Reveal>
              <div className="flex flex-col items-start gap-5 border border-dashed border-gold/40 p-8 sm:flex-row sm:items-center sm:p-12">
                <Handshake aria-hidden className="size-10 shrink-0 text-gold" />
                <div>
                  <p className="font-display text-2xl uppercase tracking-wide">Partner records to be added</p>
                  <p className="mt-2 max-w-prose text-ivory/60">No partner names, logos or agreements have been supplied yet, so none are shown. Nothing here is a confirmed partnership.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm text-gold">Proposed categories, pending club approval</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {proposedCategories.map((c) => <li key={c} className="border border-gold/30 px-4 py-2 text-ivory/60">{c}</li>)}
              </ul>
            </Reveal>
          </div>
        ) : (
          <>
            {categoriesInUse.length > 0 && (
              <fieldset className="mt-12">
                <legend className="mb-3 text-xs text-ivory/55">Category</legend>
                <div className="flex flex-wrap gap-2">
                  {["", ...categoriesInUse].map((c) => (
                    <button key={c || "all"} type="button" aria-pressed={category === c} onClick={() => setCategory(c)}
                      className={cn("min-h-11 border px-4 text-sm transition-colors duration-base", category === c ? "border-saffron bg-saffron text-obsidian" : "border-gold/35 text-ivory/80 hover:border-saffron hover:text-saffron")}>
                      {c || "All"}
                    </button>
                  ))}
                </div>
                <p aria-live="polite" className="mt-4 text-sm text-ivory/60">Showing {results.length} of {collaborations.length}</p>
              </fieldset>
            )}
            <div className="mt-10">
              {results.length === 0 ? (
                <EmptyState title="No collaborations in this category">
                  <button type="button" onClick={() => setCategory("")} className="min-h-11 border border-saffron px-6 text-saffron transition-colors hover:bg-saffron hover:text-obsidian">Show all</button>
                </EmptyState>
              ) : (
                <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {results.map((r) => (
                      <motion.li key={r.slug} layout={!reduce} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                        <CollaborationCard record={r} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
