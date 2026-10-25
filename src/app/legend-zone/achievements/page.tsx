import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { AchievementsView } from "@/components/legend-zone/AchievementsView";
import { ZoneHeader } from "@/components/legend-zone/ZoneHeader";

export const metadata: Metadata = pageMeta({
  title: "Legend Zone Achievements and Levels",
  description: "Proposed achievement badges and levels for a Legend Zone prototype. Not official club awards.",
  path: "/legend-zone/achievements",
});

export default function AchievementsPage() {
  return (
    <>
      <ZoneHeader title="Achievements" intro="Proposed badge categories and demo levels. None of these are confirmed club awards." />
      <AchievementsView />
    </>
  );
}
