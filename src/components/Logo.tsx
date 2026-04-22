import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-baseline gap-2 font-serif text-[19px] tracking-tight text-foreground ${className}`}
    >
      <span className="relative">
        Café
        <span className="absolute -top-1 -right-1.5 h-1 w-1 rounded-full bg-accent" />
      </span>
      <span className="text-muted-foreground/70">&amp;</span>
      <span>Verso</span>
    </Link>
  );
}
