"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { EASE, maskLine, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  intro: string;
  /** id of the element the scroll indicator jumps to */
  next: string;
  /** Optional cinematic photograph (path under /public). Falls back to the logo-lit backdrop. */
  image?: string;
  motif?: "logo-right" | "logo-left" | "network";
  /** e.g. a call-to-action button */
  children?: React.ReactNode;
};

export function PageHero({ lines, intro, next, image, motif = "logo-right", children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);

  return (
    <section ref={ref} aria-labelledby="page-title" className="relative isolate flex min-h-[88svh] items-end overflow-hidden pb-20 pt-36 sm:items-center sm:pb-24">
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="-z-30 object-cover opacity-40" />}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(55%_65%_at_80%_55%,rgb(236_148_58/0.22),transparent_70%)]" />
      {motif === "network" ? <NetworkMotif /> : (
      <motion.div
        aria-hidden
        style={{ y: markY }}
        className={cn("absolute -z-10 w-[min(120vw,46rem)] opacity-[0.13]", motif === "logo-right" ? "-right-[28%] top-[8%] lg:-right-[8%]" : "-left-[30%] top-[6%] lg:-left-[10%]")}
      >
        <Image src="/images/logo/legends-logo.webp" alt="" width={900} height={900} sizes="(min-width:1024px) 46rem, 100vw" className="h-auto w-full" />
      </motion.div>
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/70" />

      <div className="mx-auto w-full max-w-content gutter">
        <h1 id="page-title" className="text-display text-[clamp(2.7rem,8vw,6.5rem)]">
          <motion.span variants={stagger(0.15, 0.15)} initial="hidden" animate="show" className="block">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={maskLine} className={cn("block", i === lines.length - 1 && "text-saffron")}>{l}</motion.span>
              </span>
            ))}
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          className="mt-8 max-w-prose text-lg leading-relaxed text-ivory/80 sm:text-xl"
        >
          {intro}
        </motion.p>
        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease: EASE }} className="mt-10">
            {children}
          </motion.div>
        )}
      </div>

      <a href={`#${next}`} aria-label="Scroll to content" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-ivory/60 transition-colors hover:text-saffron sm:flex">
        Scroll
        <ChevronDown aria-hidden className="size-5 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}

const nodes: [number, number][] = [[60, 120], [220, 60], [380, 150], [520, 80], [140, 290], [300, 300], [470, 280], [90, 470], [260, 520], [430, 450], [550, 540]];
const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [2, 6], [3, 6], [4, 5], [5, 6], [4, 7], [5, 8], [5, 9], [6, 9], [7, 8], [8, 9], [9, 10], [6, 10]];

/** Abstract connecting lines: nodes joined by drawn lines, drawn once on load. */
function NetworkMotif() {
  return (
    <svg aria-hidden viewBox="0 0 600 600" fill="none" className="absolute -right-[18%] top-[6%] -z-10 w-[min(120vw,44rem)] text-gold opacity-50 lg:-right-[4%]">
      {links.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.55"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.3 + i * 0.06, ease: EASE }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 6 : 4} fill="rgb(236 148 58)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }} />
      ))}
    </svg>
  );
}
