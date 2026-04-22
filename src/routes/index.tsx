import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Coffee,
  BookOpen,
  Users,
  Sparkles,
  Wallet,
  MapPin,
  Globe2,
  Languages,
  Heart,
  Calendar,
  Compass,
} from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Café & Verso — Leitura, café e comunidade global" },
      {
        name: "description",
        content:
          "Uma rede multilíngue que conecta pessoas, cafés, livrarias e eventos culturais com mapa global, NFTs de presença e bonificações digitais.",
      },
      { property: "og:title", content: "Café & Verso" },
      {
        property: "og:description",
        content: "Leitura, café e comunidade global em uma única plataforma.",
      },
    ],
  }),
  component: HomePage,
});

const HOW = [
  { icon: Compass, title: "Descubra comunidades", desc: "Encontre clubes de leitura, salas culturais e grupos por idioma e tema." },
  { icon: Calendar, title: "Participe de encontros", desc: "Eventos online, presenciais e híbridos em todo o mundo." },
  { icon: Coffee, title: "Visite cafés e livrarias", desc: "Espaços parceiros mapeados em cidades globais." },
  { icon: Sparkles, title: "Receba NFTs de presença", desc: "Memória digital de cada experiência cultural vivida." },
  { icon: Wallet, title: "Use $VERSO no ecossistema", desc: "Bonificação cultural utilitária — sem promessa financeira." },
];

const COMMUNITIES = [
  { name: "Clube Café & Poesia", lang: "PT · EN", members: "2.4k" },
  { name: "Leitores de Fantasia Global", lang: "EN · ES · DE", members: "8.1k" },
  { name: "Café Filosófico", lang: "PT · ES", members: "1.7k" },
  { name: "Livrarias Independentes", lang: "Multilíngue", members: "920" },
  { name: "Encontros Brasil · Alemanha · EUA", lang: "PT · DE · EN", members: "3.3k" },
  { name: "Escrita Criativa Internacional", lang: "Multilíngue", members: "1.2k" },
];

const PINS = [
  { city: "São Paulo", country: "BR", x: 30, y: 68, kind: "Café" },
  { city: "Berlin", country: "DE", x: 53, y: 32, kind: "Livraria" },
  { city: "New York", country: "US", x: 25, y: 38, kind: "Evento" },
  { city: "Lisbon", country: "PT", x: 46, y: 40, kind: "Café" },
  { city: "Tokyo", country: "JP", x: 84, y: 42, kind: "Comunidade" },
  { city: "Buenos Aires", country: "AR", x: 31, y: 78, kind: "Livraria" },
  { city: "Paris", country: "FR", x: 49, y: 35, kind: "Café" },
];

const NFTS = [
  { name: "Verso Passport", edition: "Genesis", tone: "from-amber-300/20 to-amber-500/10" },
  { name: "Verso Moments", edition: "Coleção", tone: "from-rose-300/20 to-rose-500/10" },
  { name: "Café Visit Badge", edition: "Recorrente", tone: "from-emerald-300/20 to-emerald-500/10" },
  { name: "Livraria Experience", edition: "Curadoria", tone: "from-sky-300/20 to-sky-500/10" },
  { name: "Global Reading Room", edition: "Especial", tone: "from-violet-300/20 to-violet-500/10" },
];

const EVENTS = [
  { title: "Noite Café & Poesia", city: "São Paulo · BR", date: "12 mai" },
  { title: "Clube Global de Leitura", city: "Online", date: "18 mai" },
  { title: "Encontro Multilíngue de Escrita Criativa", city: "Online · 6 idiomas", date: "23 mai" },
  { title: "Café Filosófico Online", city: "Online", date: "29 mai" },
  { title: "Rota Cultural · Livrarias Independentes", city: "Lisboa · PT", date: "04 jun" },
];

function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Communities />
      <GlobalMap />
      <NFTSection />
      <VersoToken />
      <Events />
      <Solidario />
      <CTAClose />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32">
      <div className="gradient-radial pointer-events-none absolute inset-0" />
      <div className="editorial-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
        <div>
          <p className="fade-up font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
            cafeeverso.fun · global edition
          </p>
          <h1 className="fade-up delay-100 mt-5 text-balance font-serif text-[40px] leading-[1.04] tracking-tight text-foreground sm:mt-6 sm:text-[58px] lg:text-[80px]">
            Leitura, café e comunidade{" "}
            <span className="italic text-accent">global</span> em uma única plataforma.
          </h1>
          <p className="fade-up delay-200 mt-6 max-w-xl text-balance text-[15.5px] leading-relaxed text-muted-foreground sm:mt-8 sm:text-[18px]">
            O Café &amp; Verso conecta pessoas, cafés, livrarias e eventos culturais em uma
            rede multilíngue com mapa global, NFTs de presença, bonificações digitais e
            experiências reais.
          </p>
          <div className="fade-up delay-300 mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/usuarios"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[13.5px] font-medium tracking-wide text-background transition-all hover:gap-3 hover:bg-foreground/90"
            >
              Conhecer versão usuário
              <ArrowUpRight strokeWidth={1.5} className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/estabelecimentos"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-[13.5px] font-medium text-foreground transition-all hover:border-accent/60 hover:bg-secondary"
            >
              Sou estabelecimento
            </Link>
          </div>
        </div>

        <aside className="fade-up delay-400 relative">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] lift">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                Em tempo real
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                ao vivo
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {[
                { city: "Berlin", evt: "Reading Night · K-fé", t: "+12" },
                { city: "São Paulo", evt: "Café Filosófico", t: "+8" },
                { city: "Lisboa", evt: "Livraria Aurora", t: "+5" },
                { city: "New York", evt: "Verso Sessions", t: "+21" },
              ].map((r) => (
                <div key={r.city} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0">
                  <div>
                    <p className="font-serif text-[15px] text-foreground">{r.evt}</p>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">{r.city}</p>
                  </div>
                  <span className="font-mono text-[11px] text-accent">{r.t} pres.</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
              <Stat n="142" l="cidades" />
              <Stat n="38" l="idiomas" />
              <Stat n="9.4k" l="presenças" />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-serif text-2xl text-foreground">{n}</p>
      <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{l}</p>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="relative border-b border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:items-end">
          <div>
            <SectionLabel number="01">Como funciona</SectionLabel>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Cinco passos para entrar no ecossistema cultural.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-muted-foreground lg:max-w-md">
            Da descoberta ao registro de presença, cada etapa foi pensada para criar
            pertencimento real entre pessoas, espaços e culturas.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {HOW.map((s, i) => (
            <div key={s.title} className="group relative bg-card p-7 transition-colors hover:bg-secondary/60">
              <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground/80 uppercase">
                0{i + 1}
              </p>
              <s.icon strokeWidth={1.1} className="mt-6 h-7 w-7 text-foreground transition-transform group-hover:-translate-y-0.5" />
              <h3 className="mt-5 font-serif text-[19px] text-foreground">{s.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Communities() {
  return (
    <section className="relative border-b border-border bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.5fr_0.5fr] lg:items-end">
          <div>
            <SectionLabel number="02">Comunidades globais</SectionLabel>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Cada pessoa escolhe seu idioma. A conversa acontece globalmente.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-muted-foreground lg:max-w-md">
            Cada usuário define seu idioma de entrada e saída. As mensagens são
            traduzidas automaticamente — preservando intenção e tom cultural.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITIES.map((c) => (
            <article
              key={c.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 lift"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  <Languages strokeWidth={1.5} className="h-3 w-3" />
                  {c.lang}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{c.members}</span>
              </div>
              <h3 className="mt-6 font-serif text-[22px] leading-tight text-foreground">{c.name}</h3>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-[12.5px] text-muted-foreground">Sala ativa</span>
                <ArrowUpRight strokeWidth={1.5} className="h-4 w-4 text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlobalMap() {
  return (
    <section className="relative border-b border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <div>
            <SectionLabel number="03">Mapa global</SectionLabel>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Cafés, livrarias e comunidades em cada continente.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Cafés", "Livrarias", "Eventos", "Comunidades", "Parceiros solidários"].map((f, i) => (
              <button
                key={f}
                className={`rounded-full border px-4 py-2 text-[12.5px] transition-all ${
                  i === 0
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-accent/60 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card">
          <WorldMap pins={PINS} />
        </div>
      </div>
    </section>
  );
}

export function WorldMap({ pins }: { pins: typeof PINS }) {
  return (
    <div className="relative aspect-[2.1/1] w-full bg-secondary/40">
      {/* Stylised world via dot grid + landmasses outline */}
      <svg viewBox="0 0 1000 480" className="absolute inset-0 h-full w-full text-foreground/15" fill="none" stroke="currentColor" strokeWidth="0.6">
        {/* simplified continent silhouettes */}
        <path d="M120,180 q40,-60 110,-50 q70,10 120,60 q40,40 20,90 q-20,50 -90,70 q-90,20 -130,-30 q-50,-60 -30,-140 z" />
        <path d="M380,140 q60,-30 140,-20 q120,15 180,80 q40,40 20,90 q-30,70 -130,80 q-130,10 -200,-50 q-60,-50 -10,-180 z" />
        <path d="M620,90 q60,-20 130,-5 q90,20 120,80 q20,50 -20,90 q-50,50 -130,40 q-90,-10 -120,-80 q-30,-70 20,-125 z" />
        <path d="M260,300 q40,-20 100,-10 q60,10 80,60 q20,50 -20,100 q-50,60 -110,40 q-60,-20 -70,-90 q-10,-60 20,-100 z" />
        <path d="M780,300 q40,-10 80,10 q40,30 30,80 q-10,50 -60,60 q-50,10 -70,-30 q-30,-60 20,-120 z" />
      </svg>
      <DotGrid />

      {pins.map((p) => (
        <div
          key={p.city}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_15%,transparent)]" />
          </span>
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1.5 text-[11px] text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            <span className="font-serif">{p.city}</span>
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">{p.country} · {p.kind}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DotGrid() {
  const dots = [];
  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 50; x++) {
      dots.push(<circle key={`${x}-${y}`} cx={x * 20 + 10} cy={y * 20 + 10} r="0.8" />);
    }
  }
  return (
    <svg viewBox="0 0 1000 480" className="absolute inset-0 h-full w-full text-foreground/20" fill="currentColor">
      {dots}
    </svg>
  );
}

function NFTSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <div>
            <SectionLabel number="04">NFTs culturais</SectionLabel>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Memória digital de cada presença, encontro e visita.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-muted-foreground lg:max-w-md">
            Cada evento, visita ou encontro pode gerar um registro digital único de
            presença e pertencimento — sem caráter especulativo.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {NFTS.map((n, i) => (
            <article
              key={n.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card lift"
            >
              <div className={`relative aspect-[3/4] bg-gradient-to-br ${n.tone}`}>
                <div className="absolute inset-0 grain" />
                <svg viewBox="0 0 200 260" className="absolute inset-0 h-full w-full text-foreground/35" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <circle cx="100" cy="110" r="50" />
                  <circle cx="100" cy="110" r="35" />
                  <circle cx="100" cy="110" r="20" />
                  <line x1="100" y1="40" x2="100" y2="180" />
                  <line x1="40" y1="110" x2="160" y2="110" />
                </svg>
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.2em] text-muted-foreground uppercase backdrop-blur">
                  #{(i + 1).toString().padStart(4, "0")}
                </div>
              </div>
              <div className="border-t border-border p-4">
                <h3 className="font-serif text-[16px] leading-tight text-foreground">{n.name}</h3>
                <p className="mt-1 font-mono text-[10.5px] tracking-[0.18em] text-muted-foreground uppercase">{n.edition}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VersoToken() {
  return (
    <section className="relative border-b border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.5fr_0.5fr] lg:items-center">
          <div>
            <SectionLabel number="05">$VERSO · Bonificação cultural</SectionLabel>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Uma moeda cultural utilitária — não financeira.
            </h2>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">
              $VERSO é uma bonificação digital de utilidade dentro da plataforma. Não é
              apresentado como investimento, não possui saque em dinheiro e é usado
              apenas em experiências, eventos, parceiros e ações culturais vinculadas
              ao Café &amp; Verso.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { t: "Utilidade restrita", d: "Eventos, experiências e ações." },
                { t: "Sem promessa de rendimento", d: "Não é um ativo financeiro." },
                { t: "Sem saque em dinheiro", d: "Circula no ecossistema cultural." },
                { t: "Auditável e transparente", d: "Histórico verificável." },
              ].map((b) => (
                <div key={b.t} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-serif text-[15px] text-foreground">{b.t}</p>
                  <p className="mt-1 text-[12.5px] text-muted-foreground">{b.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] lift">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">Wallet · Demo</p>
                <span className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">$VERSO</span>
              </div>
              <p className="mt-6 font-serif text-[56px] leading-none text-foreground">
                1.284<span className="text-muted-foreground/50">.50</span>
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Saldo cultural
              </p>
              <div className="mt-7 space-y-3">
                {[
                  { t: "Presença · Berlin Reading Night", v: "+ 120" },
                  { t: "Doação · Biblioteca Viva", v: "− 80" },
                  { t: "Visita · Café Aurora", v: "+ 35" },
                  { t: "Evento · Café Filosófico", v: "− 50" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0">
                    <span className="text-[13px] text-foreground/90">{tx.t}</span>
                    <span className={`font-mono text-[12px] ${tx.v.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>{tx.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="relative border-b border-border bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel number="06">Eventos</SectionLabel>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">Agenda cultural global.</h2>
          </div>
          <Link to="/eventos" className="hidden items-center gap-1.5 text-[13px] text-foreground underline-grow sm:inline-flex">
            Ver todos <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-5">
          {EVENTS.map((e) => (
            <article key={e.title} className="group bg-card p-6 transition-colors hover:bg-background">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                <Calendar strokeWidth={1.4} className="h-3.5 w-3.5" /> {e.date}
              </div>
              <h3 className="mt-5 font-serif text-[18px] leading-tight text-foreground">{e.title}</h3>
              <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                <MapPin strokeWidth={1.4} className="h-3.5 w-3.5" /> {e.city}
              </p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-[12px] text-foreground transition-transform group-hover:translate-x-0.5">
                Participar <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solidario() {
  return (
    <section className="relative border-b border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.5fr_0.5fr] lg:items-center">
          <div>
            <SectionLabel number="07">Verso Solidário</SectionLabel>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Cultura que retorna em forma de impacto.
            </h2>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">
              Usuários e estabelecimentos podem destinar bonificações digitais a
              entidades filantrópicas verificadas — bibliotecas comunitárias, projetos
              de leitura infantil e iniciativas culturais sociais.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3">
              <Heart strokeWidth={1.4} className="h-4 w-4 text-accent" />
              <span className="text-[13px] text-foreground">12.480 $VERSO doados em abril</span>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              { name: "Biblioteca Viva", city: "São Paulo · BR", pct: 64 },
              { name: "Reading For All", city: "New York · US", pct: 42 },
              { name: "Páginas Solidárias", city: "Lisboa · PT", pct: 78 },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-card p-5 lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-[18px] text-foreground">{p.name}</p>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">{p.city}</p>
                  </div>
                  <BookOpen strokeWidth={1.3} className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${p.pct}%` }} />
                </div>
                <p className="mt-2 font-mono text-[10.5px] tracking-[0.18em] text-muted-foreground uppercase">
                  {p.pct}% da meta cultural
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAClose() {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background lg:py-32">
      <div className="gradient-warm pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Globe2 strokeWidth={1} className="mx-auto h-9 w-9 text-background/70" />
        <h2 className="mt-6 text-balance font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          Uma página, uma xícara, uma cidade. Em qualquer idioma.
        </h2>
        <p className="mt-6 text-balance text-[15.5px] leading-relaxed text-background/70">
          Junte-se à rede cultural global do Café &amp; Verso e transforme leitura,
          café e encontros em memória digital.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/intro"
            className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-[13.5px] font-medium tracking-wide text-foreground transition-all hover:gap-3"
          >
            Entrar na experiência
            <ArrowUpRight strokeWidth={1.5} className="h-4 w-4" />
          </Link>
          <Link
            to="/estabelecimentos"
            className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3.5 text-[13.5px] font-medium text-background/90 transition-all hover:border-background/60"
          >
            Sou estabelecimento
          </Link>
        </div>
        <p className="mt-10 font-mono text-[11px] tracking-[0.22em] text-background/50 uppercase">
          cafeeverso.fun
        </p>
      </div>
    </section>
  );
}

// re-export icons used inline
export { Users };
