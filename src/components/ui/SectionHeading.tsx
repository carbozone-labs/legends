import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = { title: React.ReactNode; intro?: string; id?: string; className?: string; align?: "left" | "center" };

export function SectionHeading({ title, intro, id, className, align = "left" }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <h2 id={id} className="text-display text-[clamp(2.1rem,7vw,5.5rem)] text-ivory [overflow-wrap:anywhere]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ivory/70">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
