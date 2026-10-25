import { stats, statsVerified } from "@/data/club";
import { Counter } from "@/components/ui/Counter";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const wanted = ["Letterhead Exchanges", "Match Club Agreements"];

/** Reuses the homepage figures so numbers can never disagree. */
export function CollaborationStats() {
  const items = stats.filter((s) => wanted.includes(s.label));
  return (
    <section id="numbers" aria-labelledby="collab-stats-title" className="section-y">
      <Container>
        <h2 id="collab-stats-title" className="sr-only">Collaboration figures</h2>
        <dl className="grid gap-12 md:grid-cols-2">
          {items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="flex flex-col-reverse border-t border-saffron/60 pt-6">
              <dt className="mt-4 text-lg text-ivory/75">{s.label}</dt>
              <dd className="font-display text-[clamp(5rem,16vw,11rem)] leading-[0.9] text-ivory"><Counter value={s.value} suffix={s.suffix} /></dd>
            </Reveal>
          ))}
        </dl>
        {!statsVerified && <p className="mt-10 max-w-prose text-xs text-ivory/55">Overall club figures as provided by the club, pending verification. They are not a list of independently verified active partnerships.</p>}
      </Container>
    </section>
  );
}
