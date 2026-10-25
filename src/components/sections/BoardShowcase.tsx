"use client";

import Link from "next/link";
import {motion } from "framer-motion";
import { board } from "@/data/board";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp, stagger } from "@/lib/animations";
import { initials } from "@/lib/utils";
import { currentYear } from "@/data/leadership";
import { Button } from "@/components/ui/Button";

export function BoardShowcase() {
  return (
    <section id="legends" aria-labelledby="legends-title" className="section-y">
      <Container>
        <SectionHeading id="legends-title" title="Meet the Legends" intro="The presidents and secretaries who have led the club since its charter. The complete Board of Directors will be added once supplied." />
        <motion.ul
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-16 grid grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-4"
        >
          {board.map((p) => (
            <motion.li key={p.slug} variants={fadeUp} className="group">
              <Link href={`/team/${p.slug}`}>
              <figure className="relative aspect-[3/4] overflow-hidden border hairline bg-charcoal transition-colors duration-base group-hover:border-saffron/70">
                {/* Portrait slot: photograph to be supplied */}
                <div aria-hidden className="absolute inset-0 grid place-items-center transition-transform duration-slow ease-cinematic group-hover:scale-110">
                  <span className="font-display text-[7rem] leading-none text-slate">{initials(p.name)}</span>
                </div>
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                {p.years === currentYear && <span className="absolute left-4 top-4 bg-saffron px-2 py-1 text-xs font-semibold text-obsidian">Current</span>}
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-2xl uppercase leading-tight">{p.name}</p>
                  <p className="mt-1 text-sm text-saffron">{p.role}</p>
                  <p className="mt-0.5 text-xs text-ivory/55">{p.years}</p>
                </figcaption>
              </figure>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <Reveal>
          <p className="mt-6 text-xs text-ivory/55">Member photographs to be added.</p>
        </Reveal>
        <div className="mt-10"><Button href="/team" variant="secondary">Meet everyone</Button></div>
      </Container>
    </section>
  );
}
