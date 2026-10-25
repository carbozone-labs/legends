"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Person } from "@/types";
import { cn, initials } from "@/lib/utils";

type Props = { person: Person; role: string; year: string; current?: boolean; className?: string };

/** Premium portrait card. Shows a consistent monogram until an approved photograph exists. */
export function LeadershipCard({ person, role, year, current, className }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.article whileHover={reduce ? undefined : { y: -6 }} transition={{ duration: 0.4 }} className={cn("group", className)}>
      <Link href={`/team/${person.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden border hairline bg-charcoal transition-colors duration-base group-hover:border-saffron/70">
          {person.photo ? (
            <Image src={person.photo} alt={`Portrait of ${person.name}`} fill sizes="(min-width:1024px) 25vw, 50vw" loading="lazy" className="object-cover transition-transform duration-slow ease-cinematic group-hover:scale-105" />
          ) : (
            <div aria-hidden className="absolute inset-0 grid place-items-center transition-transform duration-slow ease-cinematic group-hover:scale-110">
              <span className="font-display text-[clamp(5rem,16vw,8rem)] leading-none text-slate">{initials(person.name)}</span>
            </div>
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
          {current && <span className="absolute left-4 top-4 bg-saffron px-2 py-1 text-xs font-semibold text-obsidian">Current</span>}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-2xl uppercase leading-tight">{person.name}</h3>
            <p className="mt-1 text-sm text-saffron">{role}</p>
            <p className="mt-0.5 text-xs text-ivory/55">{year}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ivory/80 transition-colors group-hover:text-saffron">
              View Profile <ArrowUpRight aria-hidden className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
