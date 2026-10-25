"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import type { EventPhoto } from "@/types";

type Props = {
  photos: EventPhoto[];
  /** index of the open photo, or null when closed */
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  label: string;
};

/** Accessible modal viewer: Esc closes, ←/→ navigate, Tab is trapped, focus returns to the opener, swipe works on touch. */
export function ImageLightbox({ photos, index, onIndexChange, onClose, label }: Props) {
  const reduce = useReducedMotion();
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const count = photos.length;

  const go = useCallback((d: number) => { if (index !== null) onIndexChange((index + d + count) % count); }, [index, count, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      opener.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  const photo = index !== null ? photos[index] : null;
  const btn = "inline-flex size-12 items-center justify-center border border-ivory/30 bg-obsidian/70 text-ivory transition-colors hover:border-saffron hover:text-saffron";

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[80] flex flex-col bg-obsidian/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p aria-live="polite" className="text-sm text-ivory/70">{(index as number) + 1} / {count}</p>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo viewer" className={btn}><X aria-hidden /></button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            {count > 1 && (
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${btn} absolute left-2 z-10 sm:left-5`}><ChevronLeft aria-hidden /></button>
            )}
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={photo.src}
                className="flex max-h-full max-w-full flex-col items-center"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                drag={count > 1 && !reduce ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => { if (info.offset.x < -70) go(1); else if (info.offset.x > 70) go(-1); }}
              >
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="100vw" priority className="max-h-[72svh] w-auto max-w-full object-contain" draggable={false} />
                {photo.caption && <figcaption className="mt-3 max-w-prose px-4 text-center text-sm text-ivory/70">{photo.caption}</figcaption>}
              </motion.figure>
            </AnimatePresence>
            {count > 1 && (
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${btn} absolute right-2 z-10 sm:right-5`}><ChevronRight aria-hidden /></button>
            )}
          </div>
          <div className="h-6" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
