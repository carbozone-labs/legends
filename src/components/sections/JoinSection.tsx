import { joinHref } from "@/data/club";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function JoinSection() {
  return (
    <section id="join" aria-labelledby="join-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_50%_100%,rgb(236_148_58/0.22),transparent_70%)]" />
      <Container className="text-center">
        <Reveal>
          <h2 id="join-title" className="text-display mx-auto max-w-5xl text-[clamp(2.8rem,9vw,7.5rem)]">Your story could be the next legendary one.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={joinHref}>Join the Movement</Button>
            <Button href="/our-story" variant="secondary">Explore Our Story</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
