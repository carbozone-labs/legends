import { badges, demoMembers, levels, xpActions, YOU_LABEL, type ActionId, type Activity, type Badge, type BadgeRule, type Level } from "@/data/legendZone";

/** All XP and level rules live in data/legendZone.ts; these pure functions only apply them. */

export const getAction = (id: ActionId) => xpActions.find((a) => a.id === id)!;

export const totalXp = (activities: Activity[]) => activities.reduce((sum, a) => sum + a.xp, 0);

export type LevelState = {
  current: Level;
  next: Level | null;
  /** 0 to 1 progress through the current level */
  progress: number;
  xpIntoLevel: number;
  /** XP needed to reach the next title (0 at the top level) */
  xpToNext: number;
  index: number;
};

export function levelFor(xp: number): LevelState {
  let index = 0;
  levels.forEach((l, i) => { if (xp >= l.minXp) index = i; }); // thresholds are inclusive
  const current = levels[index];
  const next = levels[index + 1] ?? null;
  if (!next) return { current, next, progress: 1, xpIntoLevel: xp - current.minXp, xpToNext: 0, index };
  const span = next.minXp - current.minXp;
  return { current, next, progress: (xp - current.minXp) / span, xpIntoLevel: xp - current.minXp, xpToNext: next.minXp - xp, index };
}

function ruleMet(rule: BadgeRule, activities: Activity[]): boolean {
  if (rule.type === "count") return activities.filter((a) => a.action === rule.action).length >= rule.min;
  if (rule.type === "distinct") return new Set(activities.map((a) => a.action)).size >= rule.min;
  return totalXp(activities) >= rule.min;
}

export const isUnlocked = (badge: Badge, activities: Activity[]) => ruleMet(badge.rule, activities);
export const unlockedBadges = (activities: Activity[]) => badges.filter((b) => isUnlocked(b, activities));

export type LeaderRow = { name: string; xp: number; you: boolean; rank: number };

/** Ranks the fictional members plus the visitor's in-memory total. Ties share the better rank. */
export function leaderboard(period: "monthly" | "yearly", yourXp: number): LeaderRow[] {
  const rows = [
    ...demoMembers.map((m) => ({ name: m.name, xp: period === "monthly" ? m.monthlyXp : m.yearlyXp, you: false })),
    { name: YOU_LABEL, xp: yourXp, you: true },
  ].sort((a, b) => b.xp - a.xp || Number(a.you) - Number(b.you));
  return rows.map((r) => ({ ...r, rank: rows.findIndex((x) => x.xp === r.xp) + 1 }));
}
