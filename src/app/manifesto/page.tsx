import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ManifestoHero } from "@/components/manifesto/ManifestoHero";
import { ManifestoSequence } from "@/components/manifesto/ManifestoSequence";
import { ClosingStatement } from "@/components/manifesto/ClosingStatement";
import { ReflectionDemo } from "@/components/manifesto/ReflectionDemo";
import { ManifestoNav } from "@/components/manifesto/ManifestoNav";

export const metadata: Metadata = pageMeta({
  title: "The Legends Manifesto",
  description: "What the Rotaract Club of Pune City Legends believes: leadership isn’t a title, service doesn’t need an audience, and teamwork builds Legends.",
  path: "/manifesto",
});

export default function ManifestoPage() {
  return (
    <>
      <ManifestoHero />
      <ManifestoSequence />
      <ClosingStatement />
      <ReflectionDemo />
      <ManifestoNav />
    </>
  );
}
