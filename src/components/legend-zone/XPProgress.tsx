"use client";

import { motion } from "framer-motion";
import type { LevelState } from "@/lib/legendZone";
import { EASE } from "@/lib/animations";

export function XPProgress({ level }: { level: LevelState }) {
  const { next, current } = level;
  const label = next ? `Progress towards ${next.title}` : "Top demo level reached";
  const max = next ? next.minXp - current.minXp : 1;
  return (
    <div>
      <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={next ? level.xpIntoLevel : max} aria-valuetext={next ? `${level.xpToNext} XP to go` : "Top level"}
        className="h-3 w-full overflow-hidden border border-gold/40 bg-obsidian">
        <motion.div initial={false} animate={{ width: `${level.progress * 100}%` }} transition={{ duration: 0.8, ease: EASE }} className="h-full bg-saffron" data-progress={level.progress.toFixed(3)} />
      </div>
      <p className="mt-3 text-sm text-ivory/70">
        {next ? <>{level.xpToNext} XP to <span className="text-ivory">{next.title}</span> (at {next.minXp} XP)</> : "You’ve reached the top demo level."}
      </p>
    </div>
  );
}
