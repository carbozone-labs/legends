import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/events/EventCard";
import { events, getFeaturedEvent } from "@/data/events";

/** Homepage preview: the featured event first, then the newest others. Every card opens its own event page. */
export function FeaturedEvents() {
  const featured = getFeaturedEvent();
  const picks = [...(featured ? [featured] : []), ...events.filter((e) => e !== featured)].slice(0, 3);
  return (
    <section id="events" aria-labelledby="events-title" className="section-y bg-charcoal">
      <Container>
        <SectionHeading
          id="events-title"
          title="Events that carried the club"
          intro="Verified event names and photographs will replace the demonstration placeholders below once supplied by the club."
        />
        <ul className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {picks.map((e, i) => (
            <Reveal as="li" key={e.slug} delay={i * 0.1}>
              <EventCard event={e} shape="tall" sizes="(min-width:768px) 30vw, 100vw" />
            </Reveal>
          ))}
        </ul>
        <div className="mt-14"><Button href="/events" variant="secondary">Explore all events</Button></div>
      </Container>
    </section>
  );
}
