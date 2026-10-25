/**
 * Re-mounts on every navigation, so the CSS fade in globals.css (.page-enter) replays between pages.
 * Pure CSS: it needs no JavaScript, never leaves content hidden, and is disabled for reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
