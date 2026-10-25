import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PrototypeNotice } from "@/components/legend-zone/PrototypeNotice";

export const metadata: Metadata = { title: "Legend Zone page not found" };

export default function LegendZoneNotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-6 pt-24 text-center">
      <div className="flex flex-col items-center">
        <h1 className="text-display text-5xl sm:text-7xl">Page not found</h1>
        <p className="mt-4 text-ivory/65">There’s no such page in the Legend Zone prototype.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/legend-zone">Legend Zone overview</Button>
          <Button href="/" variant="secondary">Home</Button>
        </div>
        <div className="mt-10"><PrototypeNotice compact /></div>
      </div>
    </section>
  );
}
