import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAdjacentEvents } from "@/data/events";

export function EventNavigation({ slug }: { slug: string }) {
  const { previous, next } = getAdjacentEvents(slug);
  const link = "group flex min-h-14 flex-col justify-center border hairline px-5 py-3 transition-colors duration-base hover:border-saffron";
  return (
    <nav aria-label="Event navigation" className="border-t hairline py-10">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {previous ? (
            <Link href={`/events/${previous.slug}`} className={link}>
              <span className="flex items-center gap-2 text-xs text-gold"><ArrowLeft aria-hidden className="size-4" /> Previous event</span>
              <span className="mt-1 font-display text-2xl uppercase group-hover:text-saffron">{previous.title}</span>
            </Link>
          ) : <span aria-hidden className="hidden md:block" />}
          <Link href="/events" className={`${link} items-center text-center`}>
            <span className="font-display text-2xl uppercase group-hover:text-saffron">Back to all events</span>
          </Link>
          {next ? (
            <Link href={`/events/${next.slug}`} className={`${link} md:items-end md:text-right`}>
              <span className="flex items-center gap-2 text-xs text-gold md:flex-row-reverse">Next event <ArrowRight aria-hidden className="size-4" /></span>
              <span className="mt-1 font-display text-2xl uppercase group-hover:text-saffron">{next.title}</span>
            </Link>
          ) : <span aria-hidden className="hidden md:block" />}
        </div>
      </Container>
    </nav>
  );
}
