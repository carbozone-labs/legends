import type { Metadata } from "next";
import { ZoneProvider } from "@/components/legend-zone/ZoneProvider";

// A demonstration prototype: keep it out of search results.
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function LegendZoneLayout({ children }: { children: React.ReactNode }) {
  return <ZoneProvider>{children}</ZoneProvider>;
}
