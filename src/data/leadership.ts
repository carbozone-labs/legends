import type { Person, Role, Term } from "@/types";

/**
 * Single source of truth for leadership, taken from the club document.
 * Add `photo`, `bio` and `contributions` to a person only once the client supplies and approves them.
 */
export const people: Person[] = [
  { slug: "shreya-kotkar", name: "Rtr. Shreya Kotkar" },
  { slug: "ayushi-gupta", name: "Rtr. Ayushi Gupta" },
  { slug: "sarvesh-bhosale", name: "Rtr. Sarvesh Bhosale" },
  { slug: "akash-patil", name: "Rtr. Akash Patil" },
];

/** Chronological. president / secretary are person slugs. */
export const terms: Term[] = [
  { year: "2024–2025", president: "akash-patil", secretary: "sarvesh-bhosale" },
  { year: "2025–2026", president: "sarvesh-bhosale", secretary: "shreya-kotkar" },
  { year: "2026–2027", president: "shreya-kotkar", secretary: "ayushi-gupta" },
];

export const currentYear = terms[terms.length - 1].year;

export const getPerson = (slug: string) => people.find((p) => p.slug === slug);
export const requirePerson = (slug: string): Person => {
  const p = getPerson(slug);
  if (!p) throw new Error(`Unknown person slug: ${slug}`);
  return p;
};

export const getTerm = (year: string) => terms.find((t) => t.year === year);

export type RoleEntry = { year: string; role: Role };

/** All documented roles for a person, oldest first. */
export function rolesFor(slug: string): RoleEntry[] {
  return terms.flatMap((t) => {
    const out: RoleEntry[] = [];
    if (t.president === slug) out.push({ year: t.year, role: "President" });
    if (t.secretary === slug) out.push({ year: t.year, role: "Secretary" });
    return out;
  });
}

export const latestRole = (slug: string): RoleEntry => {
  const r = rolesFor(slug);
  return r[r.length - 1];
};

export const clubRole = (role: Role) => `Club ${role}`;
