import { Container } from "@/components/ui/Container";
import { PrototypeNotice } from "./PrototypeNotice";
import { ZoneNav } from "./ZoneNav";

/** Compact header for the inner Legend Zone pages (title, intro, prototype notice, section navigation). */
export function ZoneHeader({ title, intro, children }: { title: string; intro: string; children?: React.ReactNode }) {
  return (
    <header className="border-b hairline pb-10 pt-32 sm:pt-40">
      <Container>
        <p className="text-sm text-gold">Legend Zone · Prototype</p>
        <h1 className="text-display mt-3 text-[clamp(2.6rem,8vw,6rem)]">{title}</h1>
        <p className="mt-5 max-w-prose text-lg text-ivory/75">{intro}</p>
        <div className="mt-8 space-y-6">
          <PrototypeNotice />
          {children}
          <ZoneNav />
        </div>
      </Container>
    </header>
  );
}
