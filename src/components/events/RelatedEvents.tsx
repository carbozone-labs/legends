import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getRelatedEvents } from "@/data/events";
import { EventCard } from "./EventCard";

export function RelatedEvents({ slug }: { slug: string }) {
  const related = getRelatedEvents(slug, 3);
  if (!related.length) return null;
  return (
    <section aria-labelledby="related-title" className="section-y bg-charcoal">
      <Container>
        <SectionHeading id="related-title" title="More events" />
        <ul className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {related.map((e, i) => (
            <Reveal as="li" key={e.slug} delay={i * 0.1}>
              <EventCard event={e} shape="square" sizes="(min-width:768px) 30vw, 100vw" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
