"use client";

import {motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE, maskLine, stagger } from "@/lib/animations";

export function ManifestoHero() {
  return (
    <section aria-labelledby="manifesto-hero-title" className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-[var(--gutter)] pb-24 pt-28 text-center">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_45%,rgb(236_148_58/0.12),transparent_70%)]" />
      <h1 id="manifesto-hero-title" className="text-display text-[clamp(3rem,11vw,9.5rem)]">
        <motion.span variants={stagger(0.18, 0.2)} initial="hidden" animate="show" className="block">
          {["What makes", "a Legend?"].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={maskLine} className={i === 1 ? "block text-saffron" : "block"}>{l}</motion.span>
            </span>
          ))}
        </motion.span>
      </h1>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9, ease: EASE }} className="mt-8 max-w-xl text-lg text-ivory/80 sm:text-xl">
        Not the title. Not the spotlight. The purpose behind every action.
      </motion.p>
      <p className="mt-3 text-xs text-ivory/55">Presentation copy inspired by the manifesto, not an official quotation.</p>
      <a href="#manifesto-start" aria-label="Scroll to the manifesto" className="absolute bottom-4 left-1/2 flex min-h-11 min-w-11 -translate-x-1/2 flex-col items-center justify-center gap-1 text-xs text-ivory/60 transition-colors hover:text-saffron">
        The manifesto
        <ChevronDown aria-hidden className="size-5 motion-safe:animate-bounce" />
      </a>
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-charcoal/60" />
    </section>
  );
}
