import type { Leader } from "@/types";
import { clubRole, latestRole, people } from "./leadership";

/** Homepage preview, derived from the leadership data (no duplicated names). */
export const board: Leader[] = people.map((p) => {
  const r = latestRole(p.slug);
  return { slug: p.slug, name: p.name, role: clubRole(r.role), years: r.year };
});
