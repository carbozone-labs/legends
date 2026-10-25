import { manifesto, manifestoClose } from "@/data/club";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ManifestoPreview() {
  return (
    <section id="manifesto" aria-labelledby="manifesto-title" className="section-y border-y hairline bg-charcoal">
      <Container>
        <Reveal>
          <h2 id="manifesto-title" className="text-sm font-medium text-gold">The Legends Manifesto · We believe that…</h2>
        </Reveal>
        <ul className="mt-10 space-y-7">
          {manifesto.map((line, i) => (
            <Reveal as="li" key={line} delay={i * 0.06}>
              <p className="max-w-5xl font-display text-[clamp(2rem,5.6vw,4.5rem)] uppercase leading-[1.02] text-ivory/90">{line}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.1}>
          <p className="mt-16 max-w-2xl text-xl leading-relaxed text-ivory/75">{manifestoClose.lead}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 font-display text-[clamp(2.4rem,7vw,6rem)] uppercase leading-[0.95] text-saffron">{manifestoClose.final}</p>
        </Reveal>
      <div className="mt-12"><Button href="/manifesto" variant="secondary">Read the full manifesto</Button></div>
      </Container>
    </section>
  );
}
