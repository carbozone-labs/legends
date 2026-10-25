"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  years: string[];
  value: number;
  onChange: (i: number) => void;
  currentYear?: string;
  label: string;
  panelId: string;
};

/**
 * Accessible year selector. Vertical on small screens, horizontal from lg.
 * The connecting line fills up to the active year; the active marker animates between years.
 */
export function YearTimeline({ years, value, onChange, currentYear, label, panelId }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = years.length;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    onChange(next);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className="grid lg:grid-flow-col lg:auto-cols-fr">
      {years.map((y, i) => {
        const active = i === value;
        const filled = i < value;
        return (
          <button
            key={y}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${panelId}-tab-${i}`}
            aria-selected={active}
            aria-controls={panelId}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(i)}
            onKeyDown={(e) => onKey(e, i)}
            className="group relative min-h-16 pb-10 pl-10 pr-4 text-left last:pb-2 lg:pb-2 lg:pl-0 lg:pr-6 lg:pt-12"
          >
            {/* connecting segment to the next year */}
            {i < n - 1 && (
              <>
                <span aria-hidden className="absolute left-[0.7rem] top-4 h-full w-px bg-gold/25 lg:left-0 lg:top-[0.7rem] lg:h-px lg:w-full" />
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[0.7rem] top-4 h-full w-px origin-top bg-saffron transition-transform duration-slow ease-cinematic",
                    "lg:left-0 lg:top-[0.7rem] lg:h-px lg:w-full lg:origin-left",
                    filled ? "scale-y-100 lg:scale-x-100 lg:scale-y-100" : "scale-y-0 lg:scale-x-0 lg:scale-y-100",
                  )}
                />
              </>
            )}
            {/* marker */}
            <span aria-hidden className={cn("absolute left-1 top-1 size-[0.9rem] rounded-full border-2 transition-colors duration-base lg:left-0 lg:top-[0.25rem]", i <= value ? "border-saffron bg-saffron" : "border-gold/50 bg-obsidian")} />
            {active && (
              <motion.span layoutId={`${panelId}-ring`} aria-hidden transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="absolute -left-0.5 -top-0.5 size-[1.4rem] rounded-full border border-saffron lg:-left-[0.25rem] lg:top-0" />
            )}
            <span className={cn("block font-display text-[clamp(2rem,5vw,3.25rem)] leading-none transition-colors duration-base", active ? "text-saffron" : "text-ivory/55 group-hover:text-ivory")}>{y}</span>
            {y === currentYear && <span className="mt-2 inline-block text-xs text-gold">Current year</span>}
          </button>
        );
      })}
    </div>
  );
}
