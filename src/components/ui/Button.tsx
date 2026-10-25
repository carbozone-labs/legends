import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 px-7 text-[0.95rem] font-semibold tracking-wide transition-colors duration-base ease-cinematic";
const variants = {
  primary: "bg-saffron text-obsidian hover:bg-ivory",
  secondary: "border border-ivory/35 text-ivory hover:border-saffron hover:text-saffron",
};

export function Button({ href, variant = "primary", external, className, children, onClick }: Props) {
  const cls = cn(base, variants[variant], className);
  const icon = (
    <ArrowUpRight
      aria-hidden
      className="size-4 transition-transform duration-base ease-cinematic group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  );
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {icon}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  return (
    <Link href={href} onClick={onClick} className={cls}>
      {children}
      {icon}
    </Link>
  );
}
