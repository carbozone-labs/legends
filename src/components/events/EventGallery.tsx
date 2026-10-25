"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera } from "lucide-react";
import type { EventPhoto } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { ImageLightbox } from "./ImageLightbox";

export function EventGallery({ photos, eventTitle }: { photos?: EventPhoto[]; eventTitle: string }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!photos?.length) {
    return (
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3" aria-label="Photo gallery placeholder">
        {[ "aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]" ].map((a, i) => (
          <li key={i} className={`${a} flex flex-col items-center justify-center gap-2 border border-dashed border-gold/30 bg-charcoal text-ivory/55`}>
            <Camera aria-hidden className="size-6" />
            <span className="text-xs">Photo to be added</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {/* CSS columns keep each photo's natural proportions. width/height reserve space so nothing shifts. */}
      <ul className="columns-2 gap-3 md:columns-3 [&>li]:mb-3">
        {photos.map((p, i) => (
          <Reveal as="li" key={p.src} delay={(i % 3) * 0.06} className="break-inside-avoid">
            <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} of ${photos.length}: ${p.alt}`} className="group relative block w-full overflow-hidden border hairline">
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width:768px) 33vw, 50vw" loading={i < 2 ? "eager" : "lazy"} className="h-auto w-full transition-transform duration-slow ease-cinematic group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 bg-obsidian/0 transition-colors duration-base group-hover:bg-obsidian/25" />
            </button>
          </Reveal>
        ))}
      </ul>
      <ImageLightbox photos={photos} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} label={`${eventTitle} photo viewer`} />
    </>
  );
}
