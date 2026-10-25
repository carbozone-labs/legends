import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { EventPhoto } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  image?: EventPhoto;
  sizes: string;
  priority?: boolean;
  /** Tailwind aspect class for the frame, e.g. aspect-[4/5] */
  aspect: string;
  className?: string;
  imgClassName?: string;
  placeholderLabel?: string;
};

/** Frame with a fixed aspect ratio (no layout shift). Shows an intentional placeholder when there is no photograph. */
export function CoverImage({ image, sizes, priority, aspect, className, imgClassName, placeholderLabel = "Photograph to be added" }: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-charcoal", aspect, className)}>
      {image ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : "lazy"} className={cn("object-cover", imgClassName)} />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,rgb(var(--c-slate)/0.55)_0_1px,transparent_1px_14px)] text-ivory/55">
          <ImageIcon aria-hidden className="size-8" />
          <span className="px-4 text-center text-sm">{placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}
