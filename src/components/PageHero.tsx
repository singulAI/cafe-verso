import type { ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28">
      <div className="gradient-radial pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <div className="fade-up">
            <SectionLabel number="—">{eyebrow}</SectionLabel>
          </div>
          <h1 className="fade-up delay-100 text-balance font-serif text-[44px] leading-[1.05] tracking-tight text-foreground sm:text-[58px] lg:text-[72px]">
            {title}
          </h1>
          <p className="fade-up delay-200 mt-7 max-w-2xl text-balance text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
            {subtitle}
          </p>
          {children && <div className="fade-up delay-300 mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}
