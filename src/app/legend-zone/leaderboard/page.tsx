import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DemoLeaderboard } from "@/components/legend-zone/DemoLeaderboard";
import { ZoneHeader } from "@/components/legend-zone/ZoneHeader";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = pageMeta({
  title: "Legend Zone Demo Leaderboard",
  description: "A prototype leaderboard with fictional sample data. Not real members or real contributions.",
  path: "/legend-zone/leaderboard",
});

export default function LeaderboardPage() {
  return (
    <>
      <ZoneHeader title="Demo leaderboard" intro="A look at how a leaderboard could work, using fictional sample members only.">
        <p className="max-w-3xl border-l-2 border-saffron pl-4 text-sm text-ivory/80">
          The club document suggests showing a monthly leaderboard <strong className="text-ivory">only if members agree</strong>, and rewarding teamwork and service, not just popularity. This page is a design preview, not a proposal that has been agreed.
        </p>
      </ZoneHeader>
      <section aria-label="Leaderboard" className="section-y">
        <Container className="max-w-4xl"><DemoLeaderboard /></Container>
      </section>
    </>
  );
}
