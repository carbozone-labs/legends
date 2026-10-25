"use client";

import Image from "next/image";
import {motion } from "framer-motion";
import { manifestoStatements as m } from "@/data/manifesto";
import { EASE } from "@/lib/animations";

const view = { once: true, margin: "0px 0px -20% 0px" } as const;

export function ClosingStatement() {
  const [a, b] = m.showingUp.split(". ").map((s, i) => (i === 0 ? `${s}.` : s));
  const [c, d] = m.closing.split(". ").map((s, i) => (i === 0 ? `${s}.` : s));
  const rise = (delay = 0) => ({
    "data-reveal": true,
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: view,
    transition: { duration: 1, delay, ease: EASE },
  } as const);

  return (
    <section aria-label="Closing statement" className="relative bg-obsidian px-[var(--gutter)] py-28 text-center">
      <div className="mx-auto max-w-6xl">
        <p className="text-display text-[clamp(2.4rem,8vw,6.5rem)]">
          <motion.span className="block text-ivory/85" {...rise()}>{a}</motion.span>
          <motion.span className="block" {...rise(0.3)}>{b}</motion.span>
        </p>

        <div className="mt-32 sm:mt-44">
          <motion.div {...rise()} className="mx-auto w-fit">
            <Image src="/images/logo/legends-logo-sm.webp" alt="LEGENDS logo" width={96} height={96} loading="lazy" className="size-20 sm:size-24" />
          </motion.div>
          <p className="text-display mt-10 text-[clamp(2.8rem,10vw,8.5rem)] text-saffron">
            <motion.span className="block" {...rise(0.1)}>{c}</motion.span>
            <motion.span className="block text-ivory" {...rise(0.4)}>{d}</motion.span>
          </p>
        </div>
      </div>
    </section>
  );
}
