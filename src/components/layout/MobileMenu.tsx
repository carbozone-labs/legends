"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { joinHref, nav } from "@/data/club";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animations";
import { Button } from "@/components/ui/Button";

type Props = { open: boolean; active: string; onClose: () => void };

export function MobileMenu({ open, active, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col bg-obsidian px-[var(--gutter)] pb-8 pt-24 xl:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <nav aria-label="Primary" className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-gold/20 border-y border-gold/20">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.15 + i * 0.04, duration: 0.5, ease: EASE } }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active === item.id ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center font-display text-3xl uppercase tracking-wide transition-colors",
                      active === item.id ? "text-saffron" : "text-ivory hover:text-saffron",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <Button href={joinHref} onClick={onClose} className="mt-6 w-full">
            Join the Movement
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
