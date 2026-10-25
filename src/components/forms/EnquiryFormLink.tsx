import { ArrowUpRight } from "lucide-react";
import { CLUB_FORM_URL } from "@/data/club";

/** Plain text link to the official form, for footers and lists. */
export function EnquiryFormLink({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <a href={CLUB_FORM_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight aria-hidden className="ml-1 inline size-3.5" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
