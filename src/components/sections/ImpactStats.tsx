import { statsVerified, stats } from "@/data/club";
import { Counter } from "@/components/ui/Counter";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ImpactStats({ title }: { title?: string }) {
  return (
    <section aria-labelledby="stats-title" className="section-y">
      <Container>
        {title ? <SectionHeading id="stats-title" title={title} className="mb-14" /> : <h2 id="stats-title" className="sr-only">Club statistics, overall across three years</h2>}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className={`flex flex-col-reverse border-t hairline pt-5${i === 4 ? " col-span-2 lg:col-span-1" : ""}`}>
              <dt className="mt-3 text-sm text-ivory/65">{s.label}</dt>
              <dd className="font-display text-[clamp(3.25rem,7vw,5.5rem)] leading-none text-ivory">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
        {!statsVerified && <p className="mt-12 text-xs text-ivory/55">Overall figures across three years, as provided by the club. Pending verification.</p>}
      </Container>
    </section>
  );
}
