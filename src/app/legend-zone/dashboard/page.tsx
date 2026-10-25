import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CTASection } from "@/components/shared/CTASection";
import { DemoDashboard } from "@/components/legend-zone/DemoDashboard";
import { ZoneHeader } from "@/components/legend-zone/ZoneHeader";

export const metadata: Metadata = pageMeta({
  title: "Legend Zone Demo Dashboard",
  description: "A prototype dashboard with simulated XP. Demonstration only; no real member data or contributions.",
  path: "/legend-zone/dashboard",
});

export default function DashboardPage() {
  return (
    <>
      <ZoneHeader title="Demo dashboard" intro="Try the proposed Legend XP system with simulated contributions. Everything on this page is in-memory and resets when you refresh." />
      <DemoDashboard />
      <CTASection title="See how it adds up." actions={[{ label: "Demo leaderboard", href: "/legend-zone/leaderboard" }, { label: "Achievements and levels", href: "/legend-zone/achievements", variant: "secondary" }]} />
    </>
  );
}
