import Link from "next/link";
import { club } from "@/data/club";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ThemeSection({ id = "story", showAbout = true }: { id?: string; showAbout?: boolean }) {
  return (
    <section id={id} aria-labelledby="theme-title" className="section-y relative border-y hairline bg-charcoal">
      <Container>
        <Reveal>
          <p className="text-sm font-medium text-gold">Our theme · Chartered {club.chartered}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 id="theme-title" lang="mr" className="mt-6 font-deva text-[clamp(2.4rem,8.5vw,7.5rem)] font-normal leading-[1.25] text-ivory">
            {club.theme}
          </h2>
        </Reveal>

        {/* Heritage motif: a drawn arrow, echoing the archer in the logo */}
        <Reveal delay={0.15}>
          <svg aria-hidden viewBox="0 0 600 12" className="my-10 h-3 w-full max-w-md text-gold" fill="none">
            <path d="M0 6h586" stroke="currentColor" strokeWidth="1.5" />
            <path d="M574 1l12 5-12 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <p lang="mr" className="font-deva text-xl leading-[1.9] text-ivory/90">{club.themeMeaningMarathi}</p>
          </Reveal>
          <div className="space-y-8">
            <Reveal delay={0.18}>
              <p className="text-xl leading-relaxed text-ivory/80">
                <span className="sr-only">In English: </span>
                {club.themeMeaningEnglish}
              </p>
            </Reveal>
            {showAbout && (
              <Reveal delay={0.26}>
                <p className="border-l-2 border-saffron pl-5 leading-relaxed text-ivory/65">{club.about}</p>
                <Link href="/our-story" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-saffron underline-offset-4 hover:underline">Read our full story</Link>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
