"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

type Status = "idle" | "copied" | "failed" | "shared";

export function ShareEvent({ title, path }: { title: string; path: string }) {
  const [canShare, setCanShare] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  useEffect(() => setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function"), []);

  const url = () => `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}${path}`;

  const share = async () => {
    try {
      await navigator.share({ title, url: url() });
      setStatus("shared");
    } catch (e) {
      if ((e as DOMException).name !== "AbortError") setStatus("failed"); // user cancelling is not an error
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  const cls = "inline-flex min-h-12 items-center gap-2 border border-ivory/35 px-6 text-sm font-semibold transition-colors duration-base hover:border-saffron hover:text-saffron";
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {canShare && <button type="button" onClick={share} className={cls}><Share2 aria-hidden className="size-4" /> Share event</button>}
        <button type="button" onClick={copy} className={cls}>
          {status === "copied" ? <Check aria-hidden className="size-4 text-saffron" /> : <Link2 aria-hidden className="size-4" />} Copy link
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-ivory/65">
        {status === "copied" && "Link copied to clipboard."}
        {status === "shared" && "Shared."}
        {status === "failed" && "Sorry, that didn’t work. Please copy the address from your browser instead."}
      </p>
    </div>
  );
}
