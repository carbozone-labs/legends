import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/** Visual breadcrumb trail. The last item is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1 text-sm text-ivory/70">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 text-ivory/40" />}
            {c.href ? (
              <Link href={c.href} className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-saffron">{c.label}</Link>
            ) : (
              <span aria-current="page" className="text-ivory">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
