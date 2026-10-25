import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CollaborationRecord } from "@/types";
import { linkedEvent } from "@/data/collaborations";
import { CoverImage } from "@/components/events/CoverImage";

type Props = { record: CollaborationRecord; aspect?: string; sizes?: string; large?: boolean };

export function CollaborationCard({ record, aspect = "aspect-[4/3]", sizes = "(min-width:1024px) 33vw, 100vw", large }: Props) {
  const event = linkedEvent(record);
  const meta = [record.year, record.category].filter(Boolean).join(" · ");
  return (
    <article className="group">
      {record.image && (
        <div className="relative overflow-hidden border hairline transition-colors duration-base group-hover:border-saffron/70">
          <CoverImage image={record.image} aspect={aspect} sizes={sizes} imgClassName="transition-transform duration-slow ease-cinematic group-hover:scale-105" />
        </div>
      )}
      <div className={record.image ? "mt-4" : "border border-gold/25 p-6 transition-colors duration-base group-hover:border-saffron/70"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            {meta && <p className="text-xs text-gold">{meta}</p>}
            <h3 className={`mt-1 font-display uppercase leading-none ${large ? "text-[clamp(2.2rem,5vw,4rem)]" : "text-3xl"}`}>{record.title}</h3>
            <p className="mt-2 text-saffron">{record.partner}</p>
          </div>
          {record.logo && <Image src={record.logo.src} alt={record.logo.alt} width={record.logo.width} height={record.logo.height} loading="lazy" className="size-14 shrink-0 object-contain" />}
        </div>
        {record.description && <p className="mt-3 max-w-prose text-sm leading-relaxed text-ivory/65">{record.description}</p>}
        {event && (
          <Link href={`/events/${event.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-saffron underline-offset-4 hover:underline">
            Related event: {event.title} <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
