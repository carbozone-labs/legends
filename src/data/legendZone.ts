/**
 * LEGEND ZONE: PROTOTYPE CONFIGURATION (frontend demonstration only).
 *
 * Everything here is a PROPOSAL pending club approval. The club document describes the XP system only as
 * an idea; it does not set levels, thresholds, badges or a leaderboard. Change values here, nowhere else.
 */

export type ActionId = "attendance" | "volunteering" | "collaboration" | "initiative";

export type XpAction = { id: ActionId; label: string; xp: number; blurb: string };

/** XP values are the ones proposed in the club document ("The Legend XP System"). */
export const xpActions: XpAction[] = [
  { id: "attendance", label: "Meeting attendance", xp: 10, blurb: "Attending a club meeting." },
  { id: "volunteering", label: "Volunteering for a project", xp: 25, blurb: "Giving time to a club project." },
  { id: "collaboration", label: "Bringing a new collaboration", xp: 50, blurb: "Opening a new partnership for the club." },
  { id: "initiative", label: "Leading a successful initiative", xp: 100, blurb: "Leading an initiative that succeeds." },
];

export type Level = {
  title: string;
  /** Minimum total XP to hold this title (inclusive) */
  minXp: number;
  /** Where the title comes from, so nothing is mistaken for an official award */
  source: "club document" | "phase brief";
};

/** Titles proposed in the club document and the website brief. Thresholds are invented for the demo. */
export const levels: Level[] = [
  { title: "Rookie Legend", minXp: 0, source: "club document" },
  { title: "Rising Legend", minXp: 50, source: "phase brief" },
  { title: "Impact Machine", minXp: 150, source: "club document" },
  { title: "Trailblazer", minXp: 300, source: "phase brief" },
  { title: "Legendary Status", minXp: 500, source: "club document" },
];

/** How long (ms) award buttons stay locked after a simulated award, to prevent accidental double awards. */
export const AWARD_LOCK_MS = 1500;

export type Activity = {
  id: string;
  action: ActionId;
  xp: number;
  /** "sample" = pre-filled fictional history, "simulated" = triggered by the visitor in this session */
  kind: "sample" | "simulated";
  /** Display only. Never a real date. */
  note: string;
};

/** Fictional starting history for "Demo Member". */
export const sampleActivities: Activity[] = [
  { id: "s1", action: "attendance", xp: 10, kind: "sample", note: "Sample entry" },
  { id: "s2", action: "volunteering", xp: 25, kind: "sample", note: "Sample entry" },
  { id: "s3", action: "attendance", xp: 10, kind: "sample", note: "Sample entry" },
];

export type BadgeRule =
  | { type: "count"; action: ActionId; min: number }
  | { type: "distinct"; min: number }
  | { type: "xp"; min: number };

export type Badge = {
  id: string;
  title: string;
  description: string;
  /** Demonstration unlock rule (illustrative, not an official criterion) */
  rule: BadgeRule;
  /** Plain-language version of the rule, shown to visitors */
  ruleText: string;
};

/** Proposed badge categories from the brief. Not confirmed club awards. */
export const badges: Badge[] = [
  { id: "community-service", title: "Community Service", description: "Recognises time given to the community through club projects.", rule: { type: "count", action: "volunteering", min: 1 }, ruleText: "Demo rule: one volunteering contribution." },
  { id: "teamwork", title: "Teamwork", description: "Recognises taking part across different kinds of club activity.", rule: { type: "distinct", min: 3 }, ruleText: "Demo rule: three different activity types." },
  { id: "collaboration", title: "Collaboration", description: "Recognises connecting the club with other clubs and partners.", rule: { type: "count", action: "collaboration", min: 1 }, ruleText: "Demo rule: one new collaboration." },
  { id: "leadership", title: "Leadership", description: "Recognises leading an initiative from idea to result.", rule: { type: "count", action: "initiative", min: 1 }, ruleText: "Demo rule: one led initiative." },
  { id: "consistency", title: "Consistency", description: "Recognises showing up again and again.", rule: { type: "count", action: "attendance", min: 3 }, ruleText: "Demo rule: three meeting attendances." },
  { id: "innovation", title: "Innovation", description: "Recognises sustained, wide-ranging contribution.", rule: { type: "xp", min: 200 }, ruleText: "Demo rule: 200 total XP." },
];

export type DemoMember = { name: string; monthlyXp: number; yearlyXp: number };

/** Fictional leaderboard rows. Not real members and not real contributions. */
export const demoMembers: DemoMember[] = [
  { name: "Demo Member A", monthlyXp: 180, yearlyXp: 820 },
  { name: "Demo Member B", monthlyXp: 150, yearlyXp: 740 },
  { name: "Demo Member C", monthlyXp: 135, yearlyXp: 655 },
  { name: "Demo Member D", monthlyXp: 110, yearlyXp: 540 },
  { name: "Demo Member E", monthlyXp: 95, yearlyXp: 430 },
  { name: "Demo Member F", monthlyXp: 70, yearlyXp: 330 },
  { name: "Demo Member G", monthlyXp: 40, yearlyXp: 220 },
  { name: "Demo Member H", monthlyXp: 25, yearlyXp: 120 },
];

export const YOU_LABEL = "Demo Member (you)";
