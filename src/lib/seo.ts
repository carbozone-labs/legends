import type { Metadata } from "next";

export const SITE_NAME = "LEGENDS | Rotaract Club of Pune City";

// Page-level openGraph/twitter objects REPLACE (not merge with) the layout's, so the default share image
// must be named explicitly here. These files live in app/ (opengraph-image.png, twitter-image.png).
const OG_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630, alt: "LEGENDS, Rotaract Club of Pune City: we don’t just build leaders, we create Legends." };

type Args = { title: string; description: string; path: string; noindex?: boolean };

/**
 * One place that builds page metadata: title, description, canonical, Open Graph and Twitter tags.
 * The share image comes from app/opengraph-image.png and app/twitter-image.png (file-based metadata).
 */
export function pageMeta({ title, description, path, noindex }: Args): Metadata {
  const full = `${title} | LEGENDS`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title: full, description, url: path, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: ["/twitter-image.png"] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
