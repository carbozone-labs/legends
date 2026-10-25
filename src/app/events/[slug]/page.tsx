import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { EventHero } from "@/components/events/EventHero";
import { EventMetadata } from "@/components/events/EventMetadata";
import { EventGallery } from "@/components/events/EventGallery";
import { ShareEvent } from "@/components/events/ShareEvent";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import { EventNavigation } from "@/components/events/EventNavigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { events, getEvent } from "@/data/events";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => events.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return { title: "Event not found" };
  const description = e.shortDescription ?? e.description ?? `${e.title}, an event of the Rotaract Club of Pune City Legends.`;
  const meta = pageMeta({ title: e.title, description, path: `/events/${e.slug}`, noindex: e.placeholder });
  // A real cover photograph, when present, replaces the default share image.
  if (e.coverImage) return { ...meta, openGraph: { ...meta.openGraph, images: [{ url: e.coverImage.src, width: e.coverImage.width, height: e.coverImage.height, alt: e.coverImage.alt }] } };
  return meta;
}

export default async function EventPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <>
      <EventHero event={event} />

      <section id="overview" aria-labelledby="overview-title" className="section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading id="overview-title" title="Overview" />
              {event.description && (
                <Reveal delay={0.1}><p className="mt-8 max-w-prose text-xl leading-relaxed text-ivory/80">{event.description}</p></Reveal>
              )}
            </div>
            <Reveal delay={0.1}><EventMetadata event={event} /></Reveal>
          </div>
        </Container>
      </section>

      {event.story && event.story.length > 0 && (
        <section id="story" aria-labelledby="story-title" className="section-y border-y hairline bg-charcoal">
          <Container className="max-w-4xl">
            <SectionHeading id="story-title" title="The story" />
            <div className="mt-12 space-y-12">
              {event.story.map((s, i) => (
                <Reveal key={s.heading ?? i}>
                  {s.heading && <h3 className="font-display text-3xl uppercase text-saffron">{s.heading}</h3>}
                  <div className="mt-4 space-y-5 text-lg leading-relaxed text-ivory/80">{s.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section id="gallery" aria-labelledby="gallery-title" className="section-y">
        <Container>
          <SectionHeading id="gallery-title" title="Photo gallery" intro={event.gallery?.length ? undefined : "Event photographs will appear here once supplied."} />
          <div className="mt-12"><EventGallery photos={event.gallery} eventTitle={event.title} /></div>
        </Container>
      </section>

      <section aria-labelledby="share-title" className="border-t hairline py-14">
        <Container>
          <h2 id="share-title" className="mb-5 text-sm font-medium text-gold">Share this event</h2>
          <ShareEvent title={event.title} path={`/events/${event.slug}`} />
        </Container>
      </section>

      <RelatedEvents slug={event.slug} />
      <EventNavigation slug={event.slug} />
    </>
  );
}
