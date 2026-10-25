export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div role="status" className="border border-dashed border-gold/40 px-6 py-16 text-center">
      <p className="font-display text-3xl uppercase tracking-wide">{title}</p>
      {children && <div className="mx-auto mt-4 max-w-md text-ivory/60">{children}</div>}
    </div>
  );
}
