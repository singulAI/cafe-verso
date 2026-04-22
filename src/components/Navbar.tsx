import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/usuarios", label: "Usuários" },
  { to: "/estabelecimentos", label: "Estabelecimentos" },
  { to: "/gestao", label: "Gestão" },
  { to: "/comunidades", label: "Comunidades" },
  { to: "/mapa", label: "Mapa" },
  { to: "/nfts", label: "NFTs" },
  { to: "/eventos", label: "Eventos" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-background/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative text-[13px] tracking-wide transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/intro"
            className="hidden text-[13px] text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Entrar
          </Link>
          <Link
            to="/intro"
            className="hidden items-center gap-1.5 rounded-full border border-foreground/90 bg-foreground px-4 py-2 text-[12.5px] font-medium tracking-wide text-background transition-all hover:gap-2 hover:bg-foreground/90 md:inline-flex"
          >
            Explorar plataforma
            <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
          >
            {open ? <X strokeWidth={1.5} className="h-4 w-4" /> : <Menu strokeWidth={1.5} className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 sm:px-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2.5 text-[15px] text-foreground/90 transition-colors hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/intro"
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-3 text-[13px] font-medium text-background"
          >
            Explorar plataforma
            <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
