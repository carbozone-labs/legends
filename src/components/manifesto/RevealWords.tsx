"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/animations";

/** Word-by-word masked reveal on scroll. Plain text under reduced motion. */
export function RevealWords({ text, className, step = 0.07 }: { text: string; className?: string; step?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            data-reveal
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.9, delay: i * step, ease: EASE }}
          >
            {w}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
