import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "Plataforma",
    items: [
      { to: "/usuarios", label: "Para usuários" },
      { to: "/estabelecimentos", label: "Para estabelecimentos" },
      { to: "/gestao", label: "Painel de gestão" },
      { to: "/mapa", label: "Mapa global" },
    ],
  },
  {
    title: "Cultura",
    items: [
      { to: "/comunidades", label: "Comunidades" },
      { to: "/eventos", label: "Eventos" },
      { to: "/nfts", label: "NFTs culturais" },
      { to: "/intro", label: "Conhecer proposta" },
    ],
  },
  {
    title: "Sobre",
    items: [
      { to: "/", label: "Manifesto" },
      { to: "/", label: "Verso Solidário" },
      { to: "/", label: "Imprensa" },
      { to: "/", label: "Contato" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              Uma rede global onde leitura, café e encontros culturais se transformam em
              experiências reais e memória digital.
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-muted-foreground/70 uppercase">
              cafeeverso.fun
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-sans text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <Link
                        to={it.to}
                        className="text-[14px] text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-border/70 bg-background/50 p-5">
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground/80 uppercase">
            Aviso
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            Café &amp; Verso é uma iniciativa em fase de validação. $VERSO é apresentado como
            bonificação digital de utilidade restrita ao ecossistema, sem promessa de
            investimento, rendimento, saque ou conversão em dinheiro.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/70 pt-6 text-[12px] text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Café &amp; Verso. Todos os direitos reservados.</p>
          <p className="font-mono tracking-wider">MVP · cafeeverso.fun</p>
        </div>
      </div>
    </footer>
  );
}
