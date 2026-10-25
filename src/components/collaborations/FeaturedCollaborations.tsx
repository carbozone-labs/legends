import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredCollaborations } from "@/data/collaborations";
import { CollaborationCard } from "./CollaborationCard";

// Varied proportions for an editorial rhythm
const slots = [
  { span: "md:col-span-8", aspect: "aspect-[16/10]" },
  { span: "md:col-span-4", aspect: "aspect-[4/5]" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]" },
  { span: "md:col-span-7", aspect: "aspect-[16/10]" },
];

/** Renders only when at least one record is marked featured. Never shows invented content. */
export function FeaturedCollaborations() {
  if (!featuredCollaborations.length) return null;
  return (
    <section id="featured" aria-labelledby="featured-collab-title" className="section-y">
      <Container>
        <SectionHeading id="featured-collab-title" title="Featured collaborations" />
        <ul className="mt-14 grid items-start gap-x-6 gap-y-14 md:grid-cols-12">
          {featuredCollaborations.map((r, i) => {
            const s = slots[i % slots.length];
            return (
              <Reveal as="li" key={r.slug} delay={(i % 2) * 0.12} className={s.span}>
                <CollaborationCard record={r} aspect={s.aspect} large sizes="(min-width:768px) 60vw, 100vw" />
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
