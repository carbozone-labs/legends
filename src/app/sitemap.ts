export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { people } from "@/data/leadership";
import { siteUrl } from "@/lib/site";

const pages = ["", "/our-story", "/journey", "/team", "/events", "/collaborations", "/manifesto", "/join", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...people.map((p) => ({ url: `${base}/team/${p.slug}` })),
    ...events.filter((e) => !e.placeholder).map((e) => ({ url: `${base}/events/${e.slug}` })),
  ];
}
