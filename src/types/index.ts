export type NavItem = { label: string; href: string; id: string };
export type Leader = { slug: string; name: string; role: string; years: string };
export type ClubYear = { years: string; president: string; secretary: string };
export type EventPhoto = {
  /** Path under /public, e.g. /images/events/<slug>/01.jpg */
  src: string;
  alt: string;
  /** Intrinsic pixel size. Needed to reserve space and avoid layout shift. */
  width: number;
  height: number;
  caption?: string;
};

export type EventStorySection = { heading?: string; paragraphs: string[] };

/**
 * One club event. Only `slug`, `title` and `placeholder` are required.
 * Every other field is optional and is rendered only when present.
 */
export type EventRecord = {
  slug: string;
  /** Official event name */
  title: string;
  /** true for demonstration records that are NOT real club history */
  placeholder: boolean;
  /** Academic year, e.g. "2025–2026". Powers the year filter. */
  year?: string;
  /** ISO date, YYYY-MM-DD. Never guess this. */
  date?: string;
  category?: string;
  coverImage?: EventPhoto;
  shortDescription?: string;
  description?: string;
  story?: EventStorySection[];
  location?: string;
  organizers?: string[];
  collaborators?: string[];
  objectives?: string[];
  activities?: string[];
  /** Verified participation only */
  participants?: string;
  outcomes?: string[];
  gallery?: EventPhoto[];
  featured?: boolean;
};

export type Stat = { value: number; suffix: string; label: string };

export type Person = {
  slug: string;
  name: string;
  /** Only set when an approved photograph is supplied (path under /public) */
  photo?: string;
  bio?: string;
  contributions?: string[];
};
export type Role = "President" | "Secretary";
export type Term = { year: string; president: string; secretary: string };

/** Proposed categories. Pending club approval; a category only appears as a filter if a record uses it. */
export type CollaborationCategory = "Joint Events" | "Club Partnerships" | "Shared Initiatives" | "Knowledge Exchange";

export type CollaborationRecord = {
  slug: string;
  /** Official collaboration title */
  title: string;
  /** Official partner club or organization name */
  partner: string;
  category?: CollaborationCategory;
  year?: string;
  description?: string;
  /** Approved partner logo only */
  logo?: EventPhoto;
  image?: EventPhoto;
  /** slug of an existing event in data/events.ts. Linked only if that event exists. */
  eventSlug?: string;
  featured?: boolean;
};
