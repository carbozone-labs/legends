import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { clubRole, getPerson, latestRole, people, rolesFor } from "@/data/leadership";
import { initials } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => people.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return { title: "Member not found" };
  const r = latestRole(slug);
  return pageMeta({ title: person.name, description: `${person.name}, ${clubRole(r.role)} ${r.year}, Rotaract Club of Pune City Legends.`, path: `/team/${person.slug}` });
}

export default async function MemberPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();

  const roles = rolesFor(slug);
  const latest = roles[roles.length - 1];
  const hasExtra = Boolean(person.bio) || Boolean(person.contributions?.length);

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <Container>
<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Meet the Legends", href: "/team" }, { label: person.name }]} />

        <div className="mt-8 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden border hairline bg-charcoal lg:max-w-none">
              {person.photo ? (
                <Image src={person.photo} alt={`Portrait of ${person.name}`} fill priority sizes="(min-width:1024px) 30vw, 90vw" className="object-cover" />
              ) : (
                <div aria-hidden className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-[10rem] leading-none text-slate">{initials(person.name)}</span>
                </div>
              )}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-sm text-gold">{clubRole(latest.role)} · {latest.year}</p>
              <h1 className="text-display mt-4 text-[clamp(2.8rem,8vw,6.5rem)]">{person.name}</h1>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-12 text-sm font-medium text-ivory/60">Roles at the club</h2>
              <ul className="mt-4 divide-y divide-gold/20 border-y border-gold/20">
                {roles.map((r) => (
                  <li key={`${r.year}-${r.role}`} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="font-display text-2xl uppercase tracking-wide">{clubRole(r.role)}</span>
                    <span className="text-ivory/70">{r.year}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {person.bio && (
              <Reveal delay={0.15}>
                <h2 className="mt-12 text-sm font-medium text-ivory/60">Biography</h2>
                <p className="mt-4 max-w-prose text-lg leading-relaxed text-ivory/80">{person.bio}</p>
              </Reveal>
            )}
            {person.contributions && person.contributions.length > 0 && (
              <Reveal delay={0.2}>
                <h2 className="mt-12 text-sm font-medium text-ivory/60">Contributions</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-ivory/80">
                  {person.contributions.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </Reveal>
            )}
            {!hasExtra && (
              <p className="mt-10 max-w-prose text-sm text-ivory/55">A biography and verified contributions will appear here once they are supplied and approved.</p>
            )}

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Button href="/team">Back to team</Button>
              <Button href="/journey" variant="secondary">Explore Our Journey</Button>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
