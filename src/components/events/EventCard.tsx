import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EventRecord } from "@/types";
import { formatDate } from "@/lib/utils";
import { CoverImage } from "./CoverImage";

export type CardShape = "wide" | "tall" | "square";
const aspects: Record<CardShape, string> = { wide: "aspect-[16/10]", tall: "aspect-[4/5]", square: "aspect-square" };

export function EventCard({ event, shape = "square", sizes = "(min-width:1024px) 33vw, 100vw" }: { event: EventRecord; shape?: CardShape; sizes?: string }) {
  const meta = [event.date ? formatDate(event.date) : event.year, event.category].filter(Boolean).join(" · ");
  return (
    <article className="group">
      <Link href={`/events/${event.slug}`} className="block">
        <div className="relative overflow-hidden border hairline transition-colors duration-base group-hover:border-saffron/70">
          <CoverImage image={event.coverImage} sizes={sizes} aspect={aspects[shape]} imgClassName="transition-transform duration-slow ease-cinematic group-hover:scale-105" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent" />
          {event.placeholder && <span className="absolute left-4 top-4 border border-saffron/60 bg-obsidian/80 px-2 py-1 text-xs text-saffron">Demo placeholder</span>}
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            {meta && <p className="text-xs text-gold">{meta}</p>}
            <h3 className="mt-1 font-display text-3xl uppercase leading-none transition-colors duration-base group-hover:text-saffron">{event.title}</h3>
            {event.shortDescription && <p className="mt-2 line-clamp-2 max-w-md text-sm text-ivory/60">{event.shortDescription}</p>}
          </div>
          <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-ivory/50 transition-all duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-saffron" />
        </div>
      </Link>
    </article>
  );
}
