"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Frontend-only demonstration. Nothing is stored, persisted or sent anywhere. */
export function ReflectionDemo() {
  const [draft, setDraft] = useState("");
  const [shown, setShown] = useState<string | null>(null);

  return (
    <section aria-labelledby="reflect-title" className="border-t hairline bg-charcoal py-20">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 id="reflect-title" className="font-display text-[clamp(1.9rem,4.5vw,3rem)] uppercase leading-tight">What does being a Legend mean to you?</h2>
          <p className="mt-3 text-sm text-saffron">Demonstration only. Your words stay in this browser tab. They are not saved and are not sent to the club.</p>
          <div className="mt-8">
            <label htmlFor="reflection" className="mb-2 block text-xs text-ivory/55">Your reflection (optional, up to 200 characters)</label>
            <textarea id="reflection" value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={200} rows={3} className="w-full border border-gold/35 bg-obsidian p-4 text-ivory placeholder:text-ivory/50 focus:border-saffron" placeholder="Type here" />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" disabled={!draft.trim()} onClick={() => setShown(draft.trim())} className="min-h-12 border border-saffron px-6 text-sm font-semibold text-saffron transition-colors hover:bg-saffron hover:text-obsidian disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-saffron">Show my reflection</button>
              {(shown !== null || draft) && <button type="button" onClick={() => { setDraft(""); setShown(null); }} className="min-h-12 px-4 text-sm text-ivory/70 underline-offset-4 hover:text-saffron hover:underline">Clear</button>}
              <span className="text-xs text-ivory/55">{draft.length}/200</span>
            </div>
            <div aria-live="polite">
              {shown !== null && <blockquote className="mt-8 border-l-2 border-saffron pl-5 font-display text-3xl uppercase leading-tight">{shown}<p className="mt-3 font-sans text-xs normal-case text-ivory/55">Shown only on your screen, not submitted anywhere.</p></blockquote>}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
