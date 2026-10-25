# LEGENDS website: handover checklist

**Status: ready for club and board preview. NOT ready for public launch** until the blocking items in section 3
are resolved. Nothing has been deployed, and no domain or production setting has been touched.

## 1. What is complete

- 15 routes plus dynamic pages: Home, Our Story, Journey, Team (+4 member profiles), Events (+ event pages),
  Collaborations, Manifesto, Join, Contact, and the Legend Zone prototype (4 pages). Proper 404 pages for unknown
  member, event and Legend Zone paths.
- One design system across all pages (type, colour, spacing, buttons, motion), built on the official logo.
- Official Google Form wired in through a single constant, `CLUB_FORM_URL` (`src/data/club.ts`), on Join, Contact and the footer.
- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter tags, a 1200x630 share image, favicon,
  Apple icon, web manifest, `sitemap.xml`, `robots.txt`, and Organization structured data (only once a site URL is set).
- Accessibility: keyboard-operable menu (focus contained while open), filters, tabs, timelines, lightbox; visible focus rings;
  breadcrumbs on event and member pages; reduced-motion support; content never hidden if JavaScript or animation fails.
- Performance: Next.js image optimization (AVIF), logo reduced from 849 KB to 122 KB, self-hosted fonts, server components
  by default, no layout shift from images (fixed aspect ratios and explicit dimensions).
- Tooling: `npm run check:content` validates image paths and event/leadership records.

## 2. What was verified (and how)

Run against the production build (`next build` then `next start`) in headless Chromium:

| Check | Result |
| ----- | ------ |
| TypeScript (`npm run typecheck`) | Pass, 0 errors |
| ESLint (`npm run lint`) | Pass, 0 warnings |
| Production build | Pass; shared JS 103 kB; largest page about 180 kB first load |
| `npm run check:content` | Pass (also proven to catch 7 deliberately injected errors) |
| axe-core WCAG 2.2 A/AA + best practice, 16 routes x 2 widths | 0 violations (after fixing definition lists, link names and one contrast issue found by the first run) |
| Console errors, incl. React hydration errors, 17 pages | None |
| Layout, 16 routes x 6 widths (1440, 1280, 1024, 768, 390, 360) | No horizontal overflow |
| Touch targets at 390px | None under 44px |
| Internal links | 21 distinct paths, none broken; unknown paths return 404 |
| Images | No broken images; 46 optimized responses, all AVIF, largest 29 KB |
| External links | Only the Google Form; all open in a new tab with `noopener noreferrer`; URL matches the supplied one exactly |
| Reduced motion / JavaScript off | No content left hidden (15 pages each) |
| Legend Zone | 34 behavioural checks pass: XP maths, level thresholds, double-award guard, shared state, no storage/cookies/network writes |
| Events search, filters, lightbox, journey keyboard nav, member cards | Pass |
| Scope | No "Impact Lab", admin, backend, database, storage or analytics anywhere in the code |

## 3. Blocking and unverified items (need the club)

1. **Google Form link is UNVERIFIED.** It could not be opened from the build environment (network blocked), so it is not known
   whether respondents can open it. The URL ends in `usp=publish-editor`, which comes from the editor's publish dialog.
   **Action:** open it in a private/incognito window while signed out. In Google Forms check: the form is *published*,
   *Responses* are set to accept anyone with the link (no sign-in, no organisation restriction), and no response limit has been hit.
   If it does not load, replace `CLUB_FORM_URL` with the link from Forms > Send > Link. It is not embedded as an iframe for this reason.
2. **Events are demonstration placeholders.** `demo-event-1` to `demo-event-4` are not real. The club needs to supply official event
   names, dates, categories, descriptions and genuine photographs (the document asks for this from 1 July). Until then the
   homepage and `/events` show labelled placeholders.
3. **No real photographs yet:** events, member portraits, and the hero. Leadership shows initials; heroes use the logo.
   When real photos are added behind hero text, re-check that headings stay legible.
4. **Contact details are not supplied:** official email, phone and social accounts. `/contact` says so rather than inventing them.
5. **Statistics need verification:** 150+ events, 300+ participants, 30+ members, 75+ letterhead exchanges, 25+ match club
   agreements. They display with "pending verification" until `statsVerified` is set to `true` in `src/data/club.ts`.
6. **Mission and vision wording** on `/our-story` is proposed (derived from the About Us text and the theme) and is labelled as such.
7. **Collaborations:** no partner records or logos supplied; the page shows an honest empty state.
8. **Legend Zone:** a prototype. Level thresholds (0/50/150/300/500 XP), badge unlock rules and the titles *Rising Legend* and
   *Trailblazer* are proposals. Three titles and the XP values come from the club document. The document says a leaderboard
   should be shown only if members agree. Decide whether to keep, hide or remove the section before launch.
9. **Production domain is not set.** Without `NEXT_PUBLIC_SITE_URL` (or Vercel's production URL) canonical links, share URLs,
   sitemap and robots point at `http://localhost:3000`.
10. **Typos corrected:** the About Us text in the document had two typos ("lub", "proessionals"); they were corrected. Please confirm the wording.

## 4. Not tested / known limitations

- **Not tested:** real phones and tablets, screen readers (NVDA/VoiceOver/TalkBack), Safari and Firefox, Lighthouse scores,
  Vercel deployment, touch-swipe in the lightbox, and the lightbox with real photographs (tested with generated images only).
- axe-core could not compute colour contrast over gradients for some hero text ("incomplete" results). By calculation the worst case
  is about 9.8:1 (ivory) and 4.8:1 (saffron headline) over the brightest glow. A manual check with real photos is still advised.
- Fonts are self-hosted but not preloaded, so a brief fallback-font flash is possible on slow connections.
- The animation library accounts for roughly 46 kB of shared JavaScript. Trimming it further would need a different approach
  to the layout and drag animations used by the archive, leaderboard and lightbox.
- `next lint` is deprecated in Next.js 16; migrate to the ESLint CLI when upgrading.
- Contact and Join depend entirely on the Google Form: there is no on-site form, by design.

## 5. Deployment prerequisites

- [ ] Form link verified publicly (item 3.1)
- [ ] Final domain chosen; `NEXT_PUBLIC_SITE_URL` set
- [ ] Real events and photographs added, placeholders removed (`npm run check:content` shows no placeholder warning)
- [ ] Official contact details added to `club.contact` in `src/data/club.ts`
- [ ] Statistics verified and `statsVerified = true`
- [ ] Mission/vision wording approved
- [ ] Decision made on the Legend Zone prototype
- [ ] `npm run typecheck && npm run lint && npm run check:content && npm run build` all pass
- [ ] Preview deployment reviewed on a real phone and in Safari
- [ ] Share a page on WhatsApp/LinkedIn to confirm the preview card (title, image) looks right

## 6. After launch

Submit `/sitemap.xml` to Google Search Console; review form responses regularly in Google Forms; add events as they happen
(the data model and `check:content` are built for this); revisit the Legend Zone with member input.