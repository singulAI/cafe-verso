import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutGrid,
  Users,
  Store,
  Layers,
  Megaphone,
  CalendarRange,
  Sparkles,
  Coins,
  Map as MapIcon,
  Heart,
  ShieldAlert,
  FileBarChart,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useApi } from "@/hooks/use-api";
import { api, type Stats, type Establishment } from "@/lib/api";

export const Route = createFileRoute("/gestao")({
  head: () => ({
    meta: [
      { title: "Gestão central — Café & Verso" },
      {
        name: "description",
        content:
          "Painel admin para gestão central do ecossistema Café & Verso: usuários, estabelecimentos, eventos, NFTs e bonificações.",
      },
      { property: "og:title", content: "Gestão · Café & Verso" },
      {
        property: "og:description",
        content: "Monitore o ecossistema Café & Verso em um único painel.",
      },
    ],
  }),
  component: GestaoPage,
});

const NAV = [
  { label: "Visão geral", icon: LayoutGrid, active: true },
  { label: "Usuários", icon: Users },
  { label: "Estabelecimentos", icon: Store },
  { label: "Planos", icon: Layers },
  { label: "Campanhas", icon: Megaphone },
  { label: "Eventos", icon: CalendarRange },
  { label: "NFTs", icon: Sparkles },
  { label: "$VERSO", icon: Coins },
  { label: "Mapa", icon: MapIcon },
  { label: "Doações", icon: Heart },
  { label: "Moderação", icon: ShieldAlert },
  { label: "Relatórios", icon: FileBarChart },
  { label: "Configurações", icon: Settings },
];

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace(".", ",")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString().padStart(2, "0");
}

function GestaoPage() {
  const { data: stats } = useApi(() => api.stats() as Promise<Stats>, []);
  const { data: establishments, loading: loadingEstab } = useApi(
    () => api.establishments() as Promise<Establishment[]>,
    [],
  );

  const kpis = stats
    ? [
        { t: "Usuários ativos", v: fmt(stats.users_active), d: `+${stats.users_growth_pct}%`, up: true },
        { t: "Estabelecimentos credenciados", v: stats.establishments_total.toString(), d: "+3,1%", up: true },
        { t: "Eventos agendados", v: stats.events_scheduled.toString(), d: "+8,7%", up: true },
        { t: "NFTs emitidos", v: fmt(stats.nfts_issued), d: "+22,9%", up: true },
        { t: "$VERSO distribuído", v: fmt(stats.verso_distributed), d: "+5,2%", up: true },
        { t: "Doações realizadas", v: stats.donations_total.toString(), d: "+9,8%", up: true },
        { t: "Campanhas em análise", v: stats.campaigns_pending.toString(), d: "−4", up: false },
        { t: "Denúncias pendentes", v: stats.reports_pending.toString().padStart(2, "0"), d: "−2", up: false },
      ]
    : [
        { t: "Usuários ativos", v: "28.4k", d: "+12,4%", up: true },
        { t: "Estabelecimentos credenciados", v: "342", d: "+3,1%", up: true },
        { t: "Eventos agendados", v: "47", d: "+8,7%", up: true },
        { t: "NFTs emitidos", v: "9.850", d: "+22,9%", up: true },
        { t: "$VERSO distribuído", v: "1,24M", d: "+5,2%", up: true },
        { t: "Doações realizadas", v: "84", d: "+9,8%", up: true },
        { t: "Campanhas em análise", v: "12", d: "−4", up: false },
        { t: "Denúncias pendentes", v: "03", d: "−2", up: false },
      ];

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-background lg:flex">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pt-3 pb-2 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
            Painel
          </p>
          {NAV.map((n) => (
            <button
              key={n.label}
              className={`group mt-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                n.active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <n.icon strokeWidth={1.3} className="h-4 w-4" />
              <span>{n.label}</span>
              {n.active && <span className="ml-auto h-1 w-1 rounded-full bg-accent" />}
            </button>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Operador</p>
            <p className="mt-1 font-serif text-[15px] text-foreground">Rafaela Lima</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Admin · Global</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <p className="hidden font-mono text-[10.5px] tracking-[0.22em] text-muted-foreground uppercase md:block">
              Gestão central · Café &amp; Verso
            </p>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[12.5px] text-muted-foreground sm:flex sm:w-72">
              <Search strokeWidth={1.4} className="h-3.5 w-3.5" />
              <input
                placeholder="Buscar estabelecimentos, usuários, NFTs…"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              />
            </div>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground">
              <Bell strokeWidth={1.4} className="h-4 w-4" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
          {/* Hero */}
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[10.5px] tracking-[0.22em] text-accent uppercase">Visão geral</p>
              <h1 className="mt-3 text-balance font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                Gestão central do ecossistema Café &amp; Verso.
              </h1>
              <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
                Monitore usuários, estabelecimentos, campanhas, eventos, NFTs, bonificações,
                doações e indicadores de crescimento.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-border bg-card px-4 py-2 text-[12.5px] text-foreground hover:border-accent/60">
                Exportar relatório
              </button>
              <button className="rounded-full bg-foreground px-4 py-2 text-[12.5px] text-background hover:bg-foreground/90">
                Nova campanha
              </button>
            </div>
          </div>

          {/* KPIs */}
          <section className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.t} className="bg-card p-5">
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">{k.t}</p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="font-serif text-3xl leading-none text-foreground">{k.v}</p>
                  <span
                    className={`flex items-center gap-1 font-mono text-[11px] ${
                      k.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    <TrendingUp strokeWidth={1.4} className={`h-3 w-3 ${!k.up && "rotate-180"}`} />
                    {k.d}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* Charts */}
          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <ChartCard title="Crescimento mensal de usuários" subtitle="Últimos 12 meses" big>
              <LineChart />
            </ChartCard>
            <ChartCard title="Interações por país" subtitle="Top 6">
              <BarsChart />
            </ChartCard>
            <ChartCard title="Eventos por categoria" subtitle="Trimestre atual">
              <Donut />
            </ChartCard>
            <ChartCard title="Distribuição de $VERSO" subtitle="Por finalidade">
              <Stacked />
            </ChartCard>
            <ChartCard title="NFTs emitidos por tipo" subtitle="Mensal">
              <BarsChart variant="amber" />
            </ChartCard>
            <ChartCard title="Estabelecimentos por plano" subtitle="Distribuição atual">
              <PlanBars />
            </ChartCard>
          </section>

          {/* Estab table */}
          <section className="mt-10 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">Estabelecimentos</p>
                <h3 className="mt-1 font-serif text-[20px] text-foreground">Cadastrados recentes</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full border border-border bg-background px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">Filtrar</button>
                <button className="rounded-full border border-border bg-background px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">Ordenar</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-border text-left font-mono text-[10.5px] tracking-[0.18em] text-muted-foreground uppercase">
                    <th className="px-5 py-3">Nome</th>
                    <th className="px-5 py-3">País</th>
                    <th className="px-5 py-3">Tipo</th>
                    <th className="px-5 py-3">Plano</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Wallet</th>
                    <th className="px-5 py-3">Camp.</th>
                    <th className="px-5 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingEstab && (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">Carregando…</td>
                    </tr>
                  )}
                  {(establishments ?? []).map((e: Establishment) => (
                    <tr key={e.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
                      <td className="px-5 py-3.5 font-serif text-[14px] text-foreground">{e.name}</td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-muted-foreground">{e.country ?? "—"}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{e.type}</td>
                      <td className="px-5 py-3.5">
                        <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] text-foreground">{e.plan}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`font-mono text-[10.5px] tracking-[0.18em] uppercase ${
                            e.status === "Ativo" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-muted-foreground">{e.wallet}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{e.active_campaigns}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button className="inline-flex items-center gap-1 text-[12px] text-foreground underline-grow">
                          Abrir <ArrowUpRight strokeWidth={1.5} className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Approvals + Moderation */}
          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card">
              <div className="border-b border-border p-5">
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">Aprovação de campanhas</p>
                <h3 className="mt-1 font-serif text-[20px] text-foreground">Em revisão</h3>
              </div>
              <ul className="divide-y divide-border/60">
                {[
                  { c: "Café Aurora", p: "Leitores · BR · 18-35", cat: "Evento", s: "Pendente" },
                  { c: "Livraria Atlântica", p: "Multilíngue · Global", cat: "Coleção", s: "Em ajuste" },
                  { c: "Verso House Berlin", p: "DE · 25-50", cat: "Comunidade", s: "Pendente" },
                ].map((r) => (
                  <li key={r.c} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-serif text-[16px] text-foreground">{r.c}</p>
                        <p className="mt-1 font-mono text-[10.5px] tracking-[0.18em] text-muted-foreground uppercase">
                          Público · {r.p}
                        </p>
                      </div>
                      <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] text-foreground">{r.cat}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button className="rounded-full bg-foreground px-3.5 py-1.5 text-[11.5px] text-background">Aprovar</button>
                      <button className="rounded-full border border-border bg-background px-3.5 py-1.5 text-[11.5px] text-foreground hover:border-accent/60">Solicitar ajuste</button>
                      <button className="rounded-full border border-border bg-background px-3.5 py-1.5 text-[11.5px] text-muted-foreground hover:text-foreground">Rejeitar</button>
                      <span className="ml-auto font-mono text-[10.5px] tracking-[0.18em] text-amber-600 dark:text-amber-400 uppercase">{r.s}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card">
              <div className="border-b border-border p-5">
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">Moderação</p>
                <h3 className="mt-1 font-serif text-[20px] text-foreground">Atenção da equipe</h3>
              </div>
              <ul className="divide-y divide-border/60">
                {[
                  { t: "Denúncia", s: "Conteúdo de spam em sala", c: "amber" },
                  { t: "Conteúdo suspeito", s: "Texto promocional fora do escopo", c: "amber" },
                  { t: "Tentativa de fraude", s: "Wallet com padrão automatizado", c: "rose" },
                  { t: "Campanha bloqueada", s: "Promessa financeira indevida", c: "rose" },
                ].map((r, i) => (
                  <li key={i} className="flex items-start justify-between gap-3 p-5">
                    <div>
                      <p className="font-serif text-[15px] text-foreground">{r.t}</p>
                      <p className="mt-1 text-[12.5px] text-muted-foreground">{r.s}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] uppercase ${
                        r.c === "rose"
                          ? "border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          : "border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      Ação
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  big,
  children,
}: {
  title: string;
  subtitle: string;
  big?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 ${big ? "lg:col-span-2" : ""}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-serif text-[16px] text-foreground">{title}</p>
          <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{subtitle}</p>
        </div>
        <button className="text-[11px] text-muted-foreground hover:text-foreground">···</button>
      </div>
      <div className="mt-5 h-44">{children}</div>
    </div>
  );
}

function LineChart() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" fill="none" stroke="currentColor">
      <g className="text-border" strokeWidth="0.5">
        <line x1="0" y1="40" x2="400" y2="40" />
        <line x1="0" y1="80" x2="400" y2="80" />
        <line x1="0" y1="120" x2="400" y2="120" />
      </g>
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(var(--accent))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,130 C40,110 70,90 100,95 C140,100 160,60 200,55 C240,50 270,80 300,65 C340,45 370,35 400,25 L400,160 L0,160 Z" fill="url(#g1)" />
      <path d="M0,130 C40,110 70,90 100,95 C140,100 160,60 200,55 C240,50 270,80 300,65 C340,45 370,35 400,25" className="text-accent" strokeWidth="1.5" />
    </svg>
  );
}

function BarsChart({ variant }: { variant?: "amber" }) {
  const data = [62, 48, 78, 41, 55, 70];
  const labels = ["BR", "US", "DE", "PT", "JP", "AR"];
  return (
    <div className="flex h-full items-end gap-3">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div
            className={`w-full rounded-t ${variant === "amber" ? "bg-accent/60" : "bg-foreground/85"}`}
            style={{ height: `${v}%` }}
          />
          <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Donut() {
  return (
    <div className="grid h-full grid-cols-[1fr_1fr] items-center gap-4">
      <svg viewBox="0 0 36 36" className="mx-auto h-32 w-32 -rotate-90">
        <circle cx="18" cy="18" r="14" fill="none" className="text-secondary" stroke="currentColor" strokeWidth="5" />
        <circle cx="18" cy="18" r="14" fill="none" className="text-accent" stroke="currentColor" strokeWidth="5" strokeDasharray="40 100" />
        <circle cx="18" cy="18" r="14" fill="none" className="text-foreground" stroke="currentColor" strokeWidth="5" strokeDasharray="25 100" strokeDashoffset="-40" />
        <circle cx="18" cy="18" r="14" fill="none" className="text-muted-foreground" stroke="currentColor" strokeWidth="5" strokeDasharray="20 100" strokeDashoffset="-65" />
      </svg>
      <ul className="space-y-2 text-[12px]">
        {[
          { n: "Leitura", c: "bg-accent" },
          { n: "Café", c: "bg-foreground" },
          { n: "Filosofia", c: "bg-muted-foreground" },
          { n: "Outros", c: "bg-secondary border border-border" },
        ].map((l) => (
          <li key={l.n} className="flex items-center gap-2 text-foreground/85">
            <span className={`h-2 w-2 rounded-full ${l.c}`} />
            {l.n}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stacked() {
  return (
    <div className="flex h-full flex-col justify-end gap-2">
      {[
        { l: "Eventos", v: 70, c: "bg-foreground" },
        { l: "Visitas", v: 55, c: "bg-accent" },
        { l: "Doações", v: 38, c: "bg-muted-foreground" },
        { l: "Comunidades", v: 24, c: "bg-secondary border border-border" },
      ].map((b) => (
        <div key={b.l}>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>{b.l}</span>
            <span className="font-mono">{b.v}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className={`h-full ${b.c}`} style={{ width: `${b.v}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PlanBars() {
  const plans = [
    { l: "Café Aberto", v: 48 },
    { l: "Essencial", v: 28 },
    { l: "Comunidade", v: 18 },
    { l: "Embaixador", v: 6 },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {plans.map((p) => (
        <div key={p.l}>
          <div className="flex items-center justify-between text-[12px] text-foreground/85">
            <span>{p.l}</span>
            <span className="font-mono text-muted-foreground">{p.v}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-foreground" style={{ width: `${p.v}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
