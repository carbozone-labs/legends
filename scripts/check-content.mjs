#!/usr/bin/env node
/**
 * Content and asset check (no dependencies). Run: npm run check:content
 *  - every /images/... or /icons/... path referenced in src/ must exist in public/
 *  - event and leadership records must be internally consistent
 *  - any event NOT marked placeholder must be complete (name, date or year, description, cover, gallery, alt text)
 * Exits with code 1 if there are errors. Placeholders are reported as warnings.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const root = new URL("..", import.meta.url).pathname;
const errors = [];
const warnings = [];

// 1. Asset references
const walk = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const refs = new Map();
for (const file of walk(join(root, "src")).filter((f) => /\.(ts|tsx)$/.test(f))) {
  // Ignore comments, which contain documentation examples
  const text = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  for (const m of text.matchAll(/["'`](\/(?:images|icons)\/[^"'`\s]+\.(?:png|jpe?g|webp|avif|svg|gif))["'`]/g)) {
    if (!refs.has(m[1])) refs.set(m[1], relative(root, file));
  }
}
for (const [path, file] of refs) if (!existsSync(join(root, "public", path))) errors.push(`Missing image: ${path} (referenced in ${file})`);

// 2. Records
const load = (p) => import(pathToFileURL(join(root, p)).href);
const { events } = await load("src/data/events.ts");
const { people, terms } = await load("src/data/leadership.ts");

const dupes = (arr, what) => { const seen = new Set(); arr.forEach((x) => { if (seen.has(x)) errors.push(`Duplicate ${what}: ${x}`); seen.add(x); }); };
dupes(events.map((e) => e.slug), "event slug");
dupes(people.map((p) => p.slug), "person slug");
const slugOk = (s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
events.forEach((e) => { if (!slugOk(e.slug)) errors.push(`Event slug is not lowercase-hyphenated: ${e.slug}`); });
terms.forEach((t) => [t.president, t.secretary].forEach((s) => { if (!people.some((p) => p.slug === s)) errors.push(`Term ${t.year} references unknown person: ${s}`); }));

const photoProblems = (ph, where) => {
  if (!ph.alt || ph.alt.trim().length < 5) errors.push(`${where}: photo needs meaningful alt text (${ph.src})`);
  if (!(ph.width > 0 && ph.height > 0)) errors.push(`${where}: photo needs width and height (${ph.src})`);
};
let placeholders = 0;
for (const e of events) {
  const where = `Event "${e.slug}"`;
  if (e.placeholder) { placeholders++; continue; }
  if (!e.title?.trim()) errors.push(`${where}: missing title`);
  if (!e.date && !e.year) errors.push(`${where}: needs a date or an academic year`);
  if (e.date && !/^\d{4}-\d{2}-\d{2}$/.test(e.date)) errors.push(`${where}: date must be YYYY-MM-DD`);
  if (!(e.description || e.shortDescription)) errors.push(`${where}: missing description`);
  if (!e.coverImage) errors.push(`${where}: missing cover photograph`); else photoProblems(e.coverImage, where);
  if (!e.gallery?.length) warnings.push(`${where}: no gallery photographs yet`); else e.gallery.forEach((g) => photoProblems(g, where));
}
for (const p of people) {
  if (p.photo && !existsSync(join(root, "public", p.photo))) errors.push(`Person "${p.slug}": photo not found: ${p.photo}`);
}
if (placeholders) warnings.push(`${placeholders} event record(s) are demonstration placeholders. Replace them before launch.`);

console.log(`Checked ${refs.size} image reference(s), ${events.length} event(s), ${people.length} people, ${terms.length} leadership year(s).`);
warnings.forEach((w) => console.log(`  warning: ${w}`));
errors.forEach((e) => console.log(`  ERROR:   ${e}`));
console.log(errors.length ? `\n${errors.length} error(s).` : "\nNo errors.");
process.exit(errors.length ? 1 : 0);
