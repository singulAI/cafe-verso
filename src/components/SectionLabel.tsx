import type { ReactNode } from "react";

export function SectionLabel({ children, number }: { children: ReactNode; number?: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
      {number && <span className="text-accent">{number}</span>}
      <span className="h-px w-8 bg-border" />
      {children}
    </div>
  );
}
