"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/animations";

type Props = { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "li" | "p" };

/**
 * Fade-and-rise on scroll. The initial state is identical on server and client (required for
 * hydration). Reduced motion is handled globally by <MotionConfig reducedMotion="user">, which
 * removes the movement and leaves a simple fade.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
