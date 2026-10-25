"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getAction } from "@/lib/legendZone";
import { EASE } from "@/lib/animations";
import { useZone } from "./ZoneProvider";

export function DemoActivityList() {
  const { activities } = useZone();
  const items = [...activities].reverse();
  return (
    <ul className="divide-y divide-gold/20 border-y border-gold/20">
      <AnimatePresence initial={false}>
        {items.map((a) => (
          <motion.li key={a.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="font-display text-xl uppercase leading-tight">{getAction(a.action).label}</p>
              <p className="mt-1 text-xs text-ivory/60"><span className={a.kind === "simulated" ? "text-saffron" : "text-gold"}>{a.kind === "simulated" ? "Simulated" : "Sample"}</span> · {a.note}</p>
            </div>
            <p className="font-display text-2xl text-saffron">+{a.xp}<span className="sr-only"> XP</span></p>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
