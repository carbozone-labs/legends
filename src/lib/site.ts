/**
 * Canonical site origin. Set NEXT_PUBLIC_SITE_URL once the final production domain is known.
 * On Vercel the production URL is used automatically as a fallback; otherwise this is localhost.
 */
export const isSiteUrlConfigured = (): boolean =>
  Boolean(process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL);

export const siteUrl = (): string =>
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
