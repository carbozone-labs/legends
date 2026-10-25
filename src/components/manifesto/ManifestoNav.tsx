import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { joinHref } from "@/data/club";

const links = [
  { label: "Our Story", href: "/our-story" },
  { label: "Meet the Legends", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Join the Movement", href: joinHref },
];

export function ManifestoNav() {
  return (
    <nav aria-label="Continue exploring" className="bg-gradient-to-b from-charcoal to-obsidian pb-28 pt-8">
      <Container>
        <ul className="divide-y divide-gold/20 border-y border-gold/20">
          {links.map((l, i) => (
            <Reveal as="li" key={l.label} delay={i * 0.07}>
              <Link href={l.href} className="group flex min-h-20 items-center justify-between gap-4 py-4">
                <span className="font-display text-[clamp(2rem,6vw,4.5rem)] uppercase leading-none transition-colors duration-base group-hover:text-saffron">{l.label}</span>
                <ArrowUpRight aria-hidden className="size-7 shrink-0 text-ivory/50 transition-all duration-base group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-saffron" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
