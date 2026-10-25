"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Flag, Handshake, HeartHandshake, Lightbulb, Lock, Users, type LucideIcon } from "lucide-react";
import type { Badge } from "@/data/legendZone";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  "community-service": HeartHandshake,
  teamwork: Users,
  collaboration: Handshake,
  leadership: Flag,
  consistency: CalendarCheck,
  innovation: Lightbulb,
};

export function BadgeEmblem({ id, unlocked, className }: { id: string; unlocked: boolean; className?: string }) {
  const Icon = icons[id] ?? Lock;
  return (
    <span aria-hidden className={cn("grid size-16 shrink-0 place-items-center rounded-full border-2", unlocked ? "border-saffron text-saffron" : "border-gold/30 text-ivory/35", className)}>
      <Icon className="size-7" />
    </span>
  );
}

export function AchievementCard({ badge, unlocked }: { badge: Badge; unlocked: boolean }) {
  return (
    <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.3 }} data-unlocked={unlocked} className={cn("h-full border p-6 transition-colors duration-base", unlocked ? "border-saffron/70 bg-charcoal" : "border-gold/25")}>
      <div className="flex items-start gap-4">
        <BadgeEmblem id={badge.id} unlocked={unlocked} />
        <div>
          <h3 className="font-display text-2xl uppercase leading-tight">{badge.title}</h3>
          <p className={cn("mt-1 text-xs font-semibold", unlocked ? "text-saffron" : "text-ivory/55")}>{unlocked ? "Unlocked in this demo" : "Locked (demo)"}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ivory/75">{badge.description}</p>
      <p className="mt-3 text-xs text-ivory/55">{badge.ruleText}</p>
    </motion.article>
  );
}
