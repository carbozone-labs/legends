"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FlaskConical } from "lucide-react";
import { xpActions, type ActionId } from "@/data/legendZone";
import { getAction } from "@/lib/legendZone";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useZone } from "./ZoneProvider";

export function ContributionSelector() {
  const { award, locked, confirmation } = useZone();
  const [selected, setSelected] = useState<ActionId>("attendance");
  const a = getAction(selected);
  const done = confirmation ? getAction(confirmation.action) : null;

  return (
    <div>
      <fieldset>
        <legend className="mb-4 text-sm text-gold">Choose a contribution to simulate</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {xpActions.map((x) => (
            <label key={x.id} className="relative block cursor-pointer">
              <input type="radio" name="contribution" value={x.id} checked={selected === x.id} onChange={() => setSelected(x.id)} className="peer sr-only" />
              <span className={cn("flex h-full items-center justify-between gap-4 border p-4 transition-colors duration-base peer-focus-visible:ring-2 peer-focus-visible:ring-saffron peer-focus-visible:ring-offset-4 peer-focus-visible:ring-offset-obsidian", selected === x.id ? "border-saffron bg-charcoal" : "border-gold/30 hover:border-gold/70")}>
                <span>
                  <span className="block font-display text-xl uppercase leading-tight">{x.label}</span>
                  <span className="mt-1 block text-xs text-ivory/60">{x.blurb}</span>
                </span>
                <span className="shrink-0 font-display text-2xl text-saffron">+{x.xp}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="button" onClick={() => award(selected)} disabled={locked} aria-disabled={locked}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-saffron px-8 font-semibold text-obsidian transition-colors duration-base hover:bg-ivory disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-saffron">
          <FlaskConical aria-hidden className="size-4" />
          {locked ? "Simulated award added" : `Simulate award: ${a.label} (+${a.xp} XP)`}
        </button>
        <p className="text-xs text-ivory/60">Proposed value, pending club approval. Simulation only.</p>
      </div>

      <div role="status" aria-live="polite" className="mt-6 min-h-[1px]">
        <AnimatePresence mode="wait" initial={false}>
          {confirmation && done && (
            <motion.div key={confirmation.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="border border-dashed border-saffron/70 p-4">
              <p className="font-semibold">Demo only: +{confirmation.xp} XP added for “{done.label}”.</p>
              {confirmation.leveledUpTo && <p className="mt-1 text-saffron">Demo title updated: {confirmation.leveledUpTo}.</p>}
              <p className="mt-2 text-sm text-ivory/70">This is a frontend simulation. It does not record or approve a real contribution, and nothing has been verified or saved.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
