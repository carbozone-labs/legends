"use client";

import {motion } from "framer-motion";
import { manifestoStatements as m } from "@/data/manifesto";
import { EASE } from "@/lib/animations";
import { RevealWords } from "./RevealWords";

const view = { once: true, margin: "0px 0px -15% 0px" } as const;
const shell = "relative flex min-h-[78svh] flex-col justify-center px-[var(--gutter)] py-24";

/** 1. Leadership: strong, centred, high contrast. */
function Leadership() {
  const [lead, rest] = ["We believe that", m.leadership.replace("We believe that ", "")];
  return (
    <section id="manifesto-start" aria-labelledby="m-leadership" className={`${shell} items-center bg-obsidian text-center`}>
      <h2 id="m-leadership" className="text-display max-w-6xl">
        <span className="mb-6 block font-sans text-base font-medium normal-case tracking-normal text-gold sm:text-lg">{lead}</span>
        <RevealWords text={rest} className="block text-[clamp(3.4rem,13vw,11rem)]" step={0.12} />
      </h2>
    </section>
  );
}

/** 2. Service: quiet. Slow fade only, no movement. */
function Service() {
  return (
    <section aria-labelledby="m-service" className={`${shell} bg-charcoal`}>
      <div className="mx-auto w-full max-w-5xl border-l border-gold/40 pl-6 sm:pl-12">
        <motion.h2
          id="m-service"
          data-reveal
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={view}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[1.05] text-ivory/85"
        >
          {m.service}
        </motion.h2>
      </div>
    </section>
  );
}

/** 3. Learning: forward movement. Slides in from the left; an arrow draws to the right. */
function Learning() {
  return (
    <section aria-labelledby="m-learning" className={`${shell} overflow-hidden bg-obsidian`}>
      <div className="mx-auto w-full max-w-6xl">
        <motion.h2
          id="m-learning"
          data-reveal
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={view}
          transition={{ duration: 1, ease: EASE }}
          className="text-display text-[clamp(2.6rem,8.5vw,7rem)]"
        >
          That mistakes are lessons, <span className="text-saffron">not endings.</span>
        </motion.h2>
        <svg aria-hidden viewBox="0 0 600 14" fill="none" className="mt-10 h-3.5 w-full max-w-xl text-gold">
          <motion.path d="M0 7h586" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={{ duration: 1.4, delay: 0.3, ease: EASE }} />
          <motion.path d="M574 1l12 6-12 6" stroke="currentColor" strokeWidth="1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ delay: 1.5, duration: 0.3 }} />
        </svg>
      </div>
    </section>
  );
}

/** 4. Patience, consistency, teamwork: layered lines, each larger and further along. */
function Teamwork() {
  const lines = [
    { t: "That patience builds people,", cls: "text-[clamp(1.8rem,4.6vw,3.5rem)] text-ivory/70", pad: "" },
    { t: "consistency builds trust,", cls: "text-[clamp(2.3rem,6.6vw,5rem)] text-ivory/90", pad: "md:ml-[10vw]" },
    { t: "and teamwork builds Legends.", cls: "text-[clamp(2.8rem,9vw,7.5rem)] text-saffron", pad: "md:ml-[20vw]" },
  ];
  return (
    <section aria-labelledby="m-teamwork" className={`${shell} bg-charcoal`}>
      <h2 id="m-teamwork" className="text-display mx-auto w-full max-w-6xl space-y-4">
        {lines.map((l, i) => (
          <motion.span
            key={l.t}
            data-reveal
            className={`block ${l.cls} ${l.pad}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.9, delay: i * 0.25, ease: EASE }}
          >
            {l.t}
          </motion.span>
        ))}
      </h2>
    </section>
  );
}

export function ManifestoSequence() {
  return (
    <>
      <Leadership />
      <Service />
      <Learning />
      <Teamwork />
    </>
  );
}
