import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

export function LevelBadge({ title, className }: { title: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 border border-saffron/60 px-3 py-1.5 font-display text-xl uppercase tracking-wide text-saffron", className)}>
      <Award aria-hidden className="size-5" />
      {title}
    </span>
  );
}
