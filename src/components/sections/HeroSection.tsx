"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { club, joinHref } from "@/data/club";
import { Button } from "@/components/ui/Button";
import { EASE, maskLine, stagger } from "@/lib/animations";

const lines = ["We don’t just build leaders.", "We create Legends."];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-24">
      {/* Backdrop: photograph slot (when supplied) + dusk light sampled from the logo */}
      {club.heroImage && (
        <Image src={club.heroImage} alt="" fill priority sizes="100vw" className="-z-30 object-cover opacity-40" />
      )}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(60%_70%_at_82%_45%,rgb(236_148_58/0.28),transparent_70%),radial-gradient(45%_55%_at_95%_20%,rgb(122_156_205/0.18),transparent_70%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />

      <div className="mx-auto grid w-full max-w-content items-center gap-12 gutter lg:grid-cols-[1.25fr_0.75fr]">
        <motion.div style={{ y: textY }}>
          <h1 id="hero-title" className="text-display text-[clamp(2.9rem,8.6vw,6.75rem)]">
            <motion.span variants={stagger(0.16, 0.2)} initial="hidden" animate="show" className="block">
              {lines.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]">
                  <motion.span variants={maskLine} className={i === 1 ? "block text-saffron" : "block"}>
                    {l}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-8 max-w-prose text-lg leading-relaxed text-ivory/80 sm:text-xl"
          >
            A community driven by leadership, meaningful service, cultural pride, and collective growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="/our-story">Explore Our Story</Button>
            <Button href={joinHref} variant="secondary">
              Join the Movement
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: logoY, rotate: logoRotate }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="order-first mx-auto w-[min(62vw,16rem)] lg:order-none lg:w-full lg:max-w-[28rem] lg:justify-self-end"
        >
          <div className="rounded-full p-2 shadow-[0_0_120px_-10px_rgb(236_148_58/0.45)]">
            <Image
              src="/images/logo/legends-logo.webp"
              alt="Official logo of the Rotaract Club of Pune City Legends: an archer drawing a bow before a temple, with the theme in Devanagari"
              width={900}
              height={900}
              priority
              sizes="(min-width:1024px) 28rem, 62vw"
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </div>

      <a href="#story" aria-label="Scroll to the next section" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-ivory/60 transition-colors hover:text-saffron sm:flex">
        Scroll
        <ChevronDown aria-hidden className="size-5 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
