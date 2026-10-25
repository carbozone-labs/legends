# LEGENDS: Rotaract Club of Pune City Legends

The official website for the Rotaract Club of Pune City Legends (chartered 8 August 2024).

A static, frontend-only site. There is **no backend, database, CMS, admin panel or authentication**.
Enquiries go to the club's official Google Form; the website itself collects and stores nothing.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide icons.
Fonts (Anton, Manrope, Tiro Devanagari Marathi) are self-hosted through `@fontsource`.

## Quick start

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command                 | What it does                                                          |
| ----------------------- | --------------------------------------------------------------------- |
| `npm run dev`           | Development server                                                    |
| `npm run build`         | Production build                                                      |
| `npm start`             | Serve the production build (run `build` first)                        |
| `npm run lint`          | ESLint with the Next.js rules                                         |
| `npm run typecheck`     | TypeScript check                                                      |
| `npm run check:content` | Validates image paths and event/leadership records (see below)        |

Before every release run: `npm run typecheck && npm run lint && npm run check:content && npm run build`.

## Routes

| Route                                  | Page                                   |
| -------------------------------------- | -------------------------------------- |
| `/`                                    | Home                                   |
| `/our-story`, `/journey`               | Story and leadership timeline          |
| `/team`, `/team/[slug]`                | Leadership and member profiles         |
| `/events`, `/events/[slug]`            | Searchable event archive and event pages |
| `/collaborations`, `/manifesto`        | Collaborations and the manifesto       |
| `/join`, `/contact`                    | Enquiries (hand off to the Google Form) |
| `/legend-zone` and 3 sub-pages         | **Prototype** XP experience (demo data only) |

Unknown member, event and Legend Zone paths return a proper 404 page.

## Project structure

```
src/
  app/                  Routes (App Router), metadata, sitemap.ts, robots.ts, manifest.ts, icons, share images
  components/
    layout/             Navbar, MobileMenu, Footer, MotionProvider, structured data
    sections/           Homepage sections
    shared/             PageHero, CTASection, YearTimeline, LeadershipCard
    events/             Archive, filters, gallery, lightbox, share, event hero
    collaborations/     Stats, partner showcase, cards
    manifesto/          Manifesto experience
    legend-zone/        Prototype dashboard, leaderboard, achievements
    forms/              Enquiry type selector and Google Form hand-off
    ui/                 Button, Container, Reveal, Counter, Breadcrumbs, SectionHeading
  data/                 ALL editable content (see next section)
  lib/                  Helpers: animations, SEO metadata, site URL, Legend Zone maths
  types/                Shared TypeScript types
public/images/          Logo and (future) event / collaboration photographs
scripts/check-content.mjs   Asset and record validation
```

## Updating content (edit data files, not components)

| To change…                          | Edit                          |
| ----------------------------------- | ----------------------------- |
| Club name, theme, stats, nav, contact details, Google Form link | `src/data/club.ts` |
| Presidents, secretaries, member profiles, photos, bios | `src/data/leadership.ts` |
| Events                              | `src/data/events.ts`          |
| Partner clubs / collaborations      | `src/data/collaborations.ts`  |
| Manifesto wording                   | `src/data/manifesto.ts`       |
| Legend Zone XP values, levels, badges, sample leaderboard | `src/data/legendZone.ts` |

### Adding or updating an event

The four events currently in `events.ts` are **demonstration placeholders** (`placeholder: true`, shown with a
"Demo placeholder" label and excluded from the sitemap). Replace them with real records. Copy the template in the
comment at the top of `src/data/events.ts`. Required for a real event (`placeholder: false`): an official `title`,
a `date` (ISO `YYYY-MM-DD`) or academic `year`, a description, a `coverImage`, and (recommended) a `gallery`.
Never guess a date; omit any field you do not know and the page simply will not show it.

### Adding event photographs

1. Create `public/images/events/<event-slug>/` and put the photos there (JPEG or WebP, about 1600px on the long edge;
   Next.js creates the smaller AVIF/WebP versions automatically).
2. Reference each in the record with its **exact pixel `width` and `height`** (this prevents layout shift) and
   meaningful `alt` text describing what is in the photo.
3. Run `npm run check:content`. It fails on missing files, missing alt text, missing dimensions, bad dates, duplicate or
   badly formatted slugs, and incomplete non-placeholder events.

Only use genuine photographs of the actual event. Where no photo exists the site shows a clearly marked placeholder.

### Updating team data

Edit `src/data/leadership.ts`: add a person to `people` (unique lowercase-hyphenated `slug`), and reference their slug
in `terms`. Optional `photo` (path under `/public`), `bio` and `contributions` appear on the profile page only when
provided. Do not add biographies or contributions that the club has not approved.

### Statistics

The five club figures live in `stats` in `club.ts`. They are shown with a "pending verification" note while
`statsVerified = false`. Once the club confirms them, set it to `true` and the notes disappear everywhere.

## Updating the official Google Form link

Change the single constant `CLUB_FORM_URL` in `src/data/club.ts`. Every "Open Enquiry Form" button and link
(`/join`, `/contact`, footer) reads from it. **The supplied link ends in `usp=publish-editor`; the form owner must
confirm it opens for the public** (see HANDOVER.md). The site never submits data itself and never shows a fake success message.

## Environment variables

| Variable               | Required | Purpose |
| ---------------------- | -------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended for production | Final domain, e.g. `https://example.org` (no trailing slash). Used for canonical URLs, Open Graph, sitemap, robots and structured data. On Vercel the production URL is used automatically if unset; elsewhere it falls back to `http://localhost:3000`, which is wrong for production. |

No secrets, API keys or credentials exist in this project.

## Deployment (Vercel)

1. Push the project to a Git repository.
2. In Vercel: **Add New > Project**, import the repository. Next.js is detected automatically; keep `next build`.
3. Add `NEXT_PUBLIC_SITE_URL` under Settings > Environment Variables once the domain is known.
4. Deploy, then add the custom domain under Settings > Domains.

Any Node-capable host works the same way (`npm run build`, `npm start`). Nothing has been deployed from this project.

## Legend Zone (prototype)

A frontend demonstration of the XP idea in the club document. It is **not** a secure or members-only area: no login, no
backend, no persistence; state lives in React memory and resets on refresh. Leaderboard rows and the dashboard member are
fictional. The XP values come from the club document; level thresholds, badge rules and two of the five titles are proposals
needing club approval, and the document says a leaderboard should be shown only if members agree. The pages are `noindex`.

## Accessibility and motion

Keyboard-operable menus, filters, timelines, tabs and image lightbox; visible focus rings; labelled forms and status
messages; reduced-motion support site-wide (`MotionProvider`); content is never left hidden if JavaScript or animation fails.
