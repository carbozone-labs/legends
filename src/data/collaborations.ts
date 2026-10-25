import type { CollaborationCategory, CollaborationRecord } from "@/types";
import { getEvent } from "./events";

/**
 * COLLABORATION RECORDS. The only place partnership content lives.
 *
 * The club has not yet supplied approved partner names, logos or collaboration records, so this
 * list is intentionally EMPTY. No partners have been invented. While it is empty the page shows a
 * clear "to be added" state. Add real records below and the page adapts automatically.
 *
 * Example (do not add unless real and approved):
 *   {
 *     slug: "partner-name-joint-event",
 *     title: "Official collaboration title",
 *     partner: "Official partner club name",
 *     category: "Joint Events",                // optional, one of proposedCategories
 *     year: "2025–2026",                       // optional
 *     description: "…",                        // optional
 *     logo: { src: "/images/collaborations/partner.png", alt: "Partner logo", width: 400, height: 400 },
 *     image: { src: "/images/collaborations/cover.jpg", alt: "…", width: 1600, height: 1000 },
 *     eventSlug: "slug-from-events-ts",        // optional, links to that event page if it exists
 *     featured: true,                          // optional, shows it in the featured showcase
 *   }
 */
export const collaborations: CollaborationRecord[] = [];

/** Proposed by the brief; pending client approval. Shown as filters only when a record uses them. */
export const proposedCategories: CollaborationCategory[] = ["Joint Events", "Club Partnerships", "Shared Initiatives", "Knowledge Exchange"];

export const categoriesInUse = proposedCategories.filter((c) => collaborations.some((r) => r.category === c));
export const featuredCollaborations = collaborations.filter((r) => r.featured);

/** Returns the event only if it really exists, so a mistyped slug never produces a broken link. */
export const linkedEvent = (r: CollaborationRecord) => (r.eventSlug ? getEvent(r.eventSlug) : undefined);
