import { Info } from "lucide-react";

/** Shown on every Legend Zone page. Never describe this area as secure or genuinely members-only. */
export function PrototypeNotice({ compact }: { compact?: boolean }) {
  return (
    <aside role="note" aria-label="Prototype notice" className="flex max-w-3xl items-start gap-3 border border-dashed border-saffron/70 bg-obsidian/70 p-4 text-sm text-ivory/85">
      <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-saffron" />
      <p>
        <strong className="font-semibold text-ivory">Prototype for demonstration.</strong>{" "}
        {compact
          ? "Demo data only. No login, no real members, no real XP."
          : "This is not a secure or members-only area. There is no login, and no real member data, XP or contributions are recorded or approved. Please don’t enter personal or confidential information. Refreshing the page resets the demo."}
      </p>
    </aside>
  );
}
