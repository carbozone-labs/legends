import type { EventRecord } from "@/types";

/**
 * EVENT RECORDS. The only place event content lives.
 *
 * The club has not supplied official event names, dates or photographs yet, so the four
 * records below are DEMONSTRATION PLACEHOLDERS (placeholder: true). They are not real club history.
 * Replace them with real records; the UI adapts automatically and shows only the fields you provide.
 *
 * To add a real event:
 *   1. Put photos in /public/images/events/<slug>/ (cover + gallery).
 *   2. Add a record, for example:
 *
 *   {
 *     slug: "official-event-name",            // lowercase, hyphenated, unique
 *     title: "Official Event Name",           // exactly as the club names it
 *     placeholder: false,
 *     year: "2025–2026",                      // academic year (filter)
 *     date: "2025-09-14",                     // ISO date, only if verified
 *     category: "Category the club confirms", // filter
 *     coverImage: { src: "/images/events/official-event-name/cover.jpg", alt: "…", width: 1600, height: 1000 },
 *     shortDescription: "…", description: "…",
 *     story: [{ heading: "…", paragraphs: ["…"] }],
 *     location: "…", organizers: ["…"], collaborators: ["…"],
 *     objectives: ["…"], activities: ["…"], participants: "…", outcomes: ["…"],
 *     gallery: [{ src: "…", alt: "…", width: 1600, height: 1067 }],
 *     featured: true,                         // at most one is shown as the featured event
 *   }
 */
const PLACEHOLDER_NOTE =
  "Demonstration placeholder. Replace this entry with the official event name, date, photographs and description.";

const records: EventRecord[] = [
  { slug: "demo-event-1", title: "Demo Event 1", placeholder: true, year: "2024–2025", category: "Category A (demo)", shortDescription: PLACEHOLDER_NOTE, description: PLACEHOLDER_NOTE },
  { slug: "demo-event-2", title: "Demo Event 2", placeholder: true, year: "2025–2026", category: "Category B (demo)", shortDescription: PLACEHOLDER_NOTE, description: PLACEHOLDER_NOTE },
  { slug: "demo-event-3", title: "Demo Event 3", placeholder: true, year: "2025–2026", category: "Category A (demo)", shortDescription: PLACEHOLDER_NOTE, description: PLACEHOLDER_NOTE },
  { slug: "demo-event-4", title: "Demo Event 4", placeholder: true, year: "2026–2027", category: "Category B (demo)", shortDescription: PLACEHOLDER_NOTE, description: PLACEHOLDER_NOTE, featured: true },
];

/** Newest first: by date when both have one, otherwise by academic year, otherwise the order above. */
export const events: EventRecord[] = records
  .map((e, i) => ({ e, i }))
  .sort((a, b) => {
    if (a.e.date && b.e.date && a.e.date !== b.e.date) return a.e.date < b.e.date ? 1 : -1;
    const ya = a.e.year ?? "";
    const yb = b.e.year ?? "";
    if (ya !== yb) return ya < yb ? 1 : -1;
    return b.i - a.i;
  })
  .map(({ e }) => e);

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
export const getFeaturedEvent = () => events.find((e) => e.featured);

export const eventCategories = [...new Set(events.map((e) => e.category).filter((c): c is string => !!c))].sort();
export const eventYears = [...new Set(events.map((e) => e.year).filter((y): y is string => !!y))].sort().reverse();

/** Same category first, then the rest. Never includes the current event. */
export function getRelatedEvents(slug: string, count = 3): EventRecord[] {
  const current = getEvent(slug);
  const others = events.filter((e) => e.slug !== slug);
  const same = others.filter((e) => current?.category && e.category === current.category);
  return [...same, ...others.filter((e) => !same.includes(e))].slice(0, count);
}

/** In the newest-first list, `previous` is the older event and `next` is the newer one. */
export function getAdjacentEvents(slug: string) {
  const i = events.findIndex((e) => e.slug === slug);
  return { previous: i >= 0 ? events[i + 1] : undefined, next: i > 0 ? events[i - 1] : undefined };
}
