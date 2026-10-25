"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { EventRecord } from "@/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EASE, maskLine } from "@/lib/animations";
import { formatDate } from "@/lib/utils";

export function EventHero({ event }: { event: EventRecord }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const meta = [event.date ? formatDate(event.date) : event.year, event.location, event.category].filter(Boolean) as string[];

  return (
    <section ref={ref} aria-labelledby="event-title" className="relative isolate flex min-h-[78svh] items-end overflow-hidden pb-14 pt-36 sm:pb-20">
      {event.coverImage ? (
        <motion.div style={{ y: imgY }} className="absolute inset-0 -z-20">
          <Image src={event.coverImage.src} alt={event.coverImage.alt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(60%_70%_at_75%_50%,rgb(236_148_58/0.2),transparent_70%),repeating-linear-gradient(135deg,rgb(var(--c-slate)/0.35)_0_1px,transparent_1px_16px)]" />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/60" />

      <div className="mx-auto w-full max-w-content gutter">
        <div className="mb-6"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: event.title }]} /></div>
        {event.placeholder && <p className="mb-5 inline-block border border-saffron/60 bg-obsidian/70 px-3 py-1 text-xs text-saffron">Demonstration placeholder. Not a real club event.</p>}
        <h1 id="event-title" className="text-display text-[clamp(2.7rem,8vw,6.5rem)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={maskLine} initial="hidden" animate="show" className="block">{event.title}</motion.span>
          </span>
        </h1>
        {meta.length > 0 && (
          <motion.ul initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }} className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-ivory/80">
            {meta.map((m) => <li key={m}>{m}</li>)}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
