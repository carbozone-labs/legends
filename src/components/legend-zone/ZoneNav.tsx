"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { label: "Overview", href: "/legend-zone" },
  { label: "Dashboard", href: "/legend-zone/dashboard" },
  { label: "Leaderboard", href: "/legend-zone/leaderboard" },
  { label: "Achievements", href: "/legend-zone/achievements" },
];

export function ZoneNav() {
  const path = usePathname();
  return (
    <nav aria-label="Legend Zone">
      <ul className="flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} aria-current={path === i.href ? "page" : undefined}
              className={cn("inline-flex min-h-11 items-center border px-4 text-sm transition-colors duration-base", path === i.href ? "border-saffron bg-saffron text-obsidian" : "border-gold/35 text-ivory/80 hover:border-saffron hover:text-saffron")}>
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
