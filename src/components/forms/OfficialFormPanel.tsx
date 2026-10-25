import { Button } from "@/components/ui/Button";
import { CLUB_FORM_URL } from "@/data/club";

type Props = { title: string; text: string; note?: string; buttonLabel?: string };

/** Hand-off to the official Google Form. The site never collects or sends enquiry data itself. */
export function OfficialFormPanel({ title, text, note, buttonLabel = "Open Enquiry Form" }: Props) {
  return (
    <div>
      <h3 className="font-display text-3xl uppercase sm:text-4xl">{title}</h3>
      <p className="mt-3 max-w-prose text-ivory/75">{text}</p>
      <div className="mt-8"><Button href={CLUB_FORM_URL} external>{buttonLabel}</Button></div>
      <p className="mt-5 max-w-prose text-sm text-ivory/60">
        {note ?? "You will continue to Google Forms in a new tab. Your answers are handled by Google Forms, not by this website."}
      </p>
    </div>
  );
}
