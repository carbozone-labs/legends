import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedEvent } from "@/data/events";
import { formatDate } from "@/lib/utils";
import { CoverImage } from "./CoverImage";
import { EmptyState } from "./EmptyState";

export function FeaturedEvent() {
  const e = getFeaturedEvent();
  return (
    <section id="featured" aria-labelledby="featured-title" className="section-y">
      <Container>
        <h2 id="featured-title" className="text-sm font-medium text-gold">Featured event</h2>
        {!e ? (
          <div className="mt-8"><EmptyState title="No featured event yet">Mark a record with <code>featured: true</code> in <code>src/data/events.ts</code>.</EmptyState></div>
        ) : (
          <div className="relative mt-8 grid items-end lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <CoverImage image={e.coverImage} aspect="aspect-[4/3] lg:aspect-[16/10]" sizes="(min-width:1024px) 66vw, 100vw" priority={false} />
            </Reveal>
            <Reveal delay={0.12} className="relative z-10 -mt-12 border border-gold/30 bg-obsidian p-6 sm:p-10 lg:col-span-5 lg:col-start-8 lg:-ml-24 lg:mt-0 lg:mb-12">
              {e.placeholder && <p className="mb-4 inline-block border border-saffron/60 px-2 py-1 text-xs text-saffron">Demo placeholder, not a real event</p>}
              <h3 className="text-display text-[clamp(2.4rem,5vw,4.5rem)]">{e.title}</h3>
              {(e.date || e.year) && <p className="mt-4 text-gold">{e.date ? formatDate(e.date) : e.year}</p>}
              {e.shortDescription && <p className="mt-4 max-w-prose text-ivory/70">{e.shortDescription}</p>}
              <div className="mt-8"><Button href={`/events/${e.slug}`}>View Event</Button></div>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}
