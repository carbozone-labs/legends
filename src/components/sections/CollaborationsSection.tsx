import { Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stats, statsVerified } from "@/data/club";

export function CollaborationsSection() {
  // Read from the shared statistics config so the figure and its verification status can never drift
  const agreements = stats.find((x) => x.label === "Match Club Agreements");
  const intro = agreements
    ? `The club reports ${agreements.value}${agreements.suffix} match club agreements${statsVerified ? "." : " (figure provided by the club, pending verification)."}`
    : undefined;
  return (
    <section id="collaborations" aria-labelledby="collab-title" className="section-y">
      <Container>
        <SectionHeading id="collab-title" title="Collaborations" intro={intro} />
        <Reveal>
          <div className="mt-14 flex flex-col items-start gap-5 border border-dashed border-gold/40 p-8 sm:flex-row sm:items-center sm:p-12">
            <Handshake aria-hidden className="size-10 shrink-0 text-gold" />
            <div>
              <p className="font-display text-2xl uppercase tracking-wide">Partner records to be added</p>
              <p className="mt-2 max-w-prose text-ivory/60">Verified partner names and approved logos have not been supplied yet, so none are shown. Nothing here is a confirmed partnership.</p>
            </div>
          </div>
        </Reveal>
      <div className="mt-10"><Button href="/collaborations" variant="secondary">Explore collaborations</Button></div>
      </Container>
    </section>
  );
}
