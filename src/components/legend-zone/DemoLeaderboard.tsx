"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { leaderboard } from "@/lib/legendZone";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useZone } from "./ZoneProvider";

type Period = "monthly" | "yearly";
const periods: { id: Period; label: string }[] = [
  { id: "monthly", label: "Monthly (illustrative)" },
  { id: "yearly", label: "Yearly (illustrative)" },
];

export function DemoLeaderboard() {
  const { xp } = useZone();
  const [period, setPeriod] = useState<Period>("monthly");
  const rows = leaderboard(period, xp);
  const max = Math.max(...rows.map((r) => r.xp), 1);

  return (
    <div>
      <fieldset>
        <legend className="mb-3 text-xs text-ivory/60">Time period</legend>
        <div className="flex flex-wrap gap-2">
          {periods.map((p) => (
            <button key={p.id} type="button" aria-pressed={period === p.id} onClick={() => setPeriod(p.id)}
              className={cn("min-h-11 border px-4 text-sm transition-colors duration-base", period === p.id ? "border-saffron bg-saffron text-obsidian" : "border-gold/35 text-ivory/80 hover:border-saffron hover:text-saffron")}>
              {p.label}
            </button>
          ))}
        </div>
      </fieldset>

      <ol className="mt-8 divide-y divide-gold/20 border-y border-gold/20" aria-label={`Sample ${period} leaderboard`}>
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.li key={r.name} layout transition={{ duration: 0.5, ease: EASE }} data-you={r.you} data-rank={r.rank}
              className={cn("grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-4 sm:grid-cols-[3.5rem_1fr_6rem] sm:gap-5", r.you && "bg-charcoal/70 px-2 sm:px-3")}>
              <span className={cn("font-display text-3xl leading-none sm:text-4xl", r.rank <= 3 ? "text-saffron" : "text-ivory/60")}><span className="sr-only">Rank </span>{r.rank}</span>
              <div className="min-w-0">
                <p className="truncate font-display text-xl uppercase leading-tight sm:text-2xl">{r.name}</p>
                <div aria-hidden className="mt-2 h-1.5 w-full bg-slate/60">
                  <motion.div initial={false} animate={{ width: `${(r.xp / max) * 100}%` }} transition={{ duration: 0.6, ease: EASE }} className={cn("h-full", r.you ? "bg-saffron" : "bg-gold/70")} />
                </div>
              </div>
              <p className="text-right font-display text-2xl text-ivory">{r.xp}<span className="ml-1 text-xs text-ivory/55">XP</span></p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
      <p className="mt-4 max-w-prose text-xs text-ivory/60">Sample data for illustration. The “you” row follows the XP you simulate on the dashboard in this session. Nothing here reflects real members or real contributions.</p>
    </div>
  );
}
