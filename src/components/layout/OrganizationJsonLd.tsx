import { club } from "@/data/club";
import { isSiteUrlConfigured, siteUrl } from "@/lib/site";

/**
 * Structured data for the club, using only facts from the club document.
 * Rendered only once a real site URL is configured, because schema.org URLs must be accurate.
 * Do not add address, phone, social profiles or events here until the club supplies verified values.
 */
export function OrganizationJsonLd() {
  if (!isSiteUrlConfigured()) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: club.name,
    alternateName: club.shortName,
    url: siteUrl(),
    logo: `${siteUrl()}/icons/icon-512.png`,
    foundingDate: "2024-08-08",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
