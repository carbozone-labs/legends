import type { EventRecord } from "@/types";
import { formatDate } from "@/lib/utils";

function List({ items }: { items: string[] }) {
  return <ul className="space-y-1">{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}

/** Renders only the facts that exist for this event. */
export function EventMetadata({ event }: { event: EventRecord }) {
  const rows: { label: string; value: React.ReactNode }[] = [];
  rows.push({ label: "Event", value: event.title });
  if (event.date) rows.push({ label: "Date", value: formatDate(event.date) });
  else if (event.year) rows.push({ label: "Academic year", value: event.year });
  if (event.location) rows.push({ label: "Venue", value: event.location });
  if (event.category) rows.push({ label: "Category", value: event.category });
  if (event.organizers?.length) rows.push({ label: "Organizers", value: <List items={event.organizers} /> });
  if (event.collaborators?.length) rows.push({ label: "Collaborating clubs", value: <List items={event.collaborators} /> });
  if (event.participants) rows.push({ label: "Participation", value: event.participants });
  if (event.objectives?.length) rows.push({ label: "Objectives", value: <List items={event.objectives} /> });
  if (event.activities?.length) rows.push({ label: "Activities", value: <List items={event.activities} /> });
  if (event.outcomes?.length) rows.push({ label: "Outcomes", value: <List items={event.outcomes} /> });

  return (
    <dl className="divide-y divide-gold/20 border-y border-gold/20">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <dt className="text-sm text-gold">{r.label}</dt>
          <dd className="text-ivory/85">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
