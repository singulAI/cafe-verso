import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  MapPin,
  Megaphone,
  Sparkles,
  BarChart3,
  Coins,
  CalendarRange,
  CheckCircle2,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { useApi } from "@/hooks/use-api";
import { api, type Establishment } from "@/lib/api";

export const Route = createFileRoute("/estabelecimentos")({
  head: () => ({
    meta: [
      { title: "Para estabelecimentos — Café & Verso" },
      {
        name: "description",
        content:
          "Cadastre seu café, livraria ou espaço cultural, apareça no mapa global e participe do ecossistema Café & Verso.",
      },
      { property: "og:title", content: "Para estabelecimentos — Café & Verso" },
      {
        property: "og:description",
        content: "Transforme seu espaço em uma experiência cultural conectada.",
      },
    ],
  }),
  component: EstabPage,
});

const BENEFITS = [
  { i: MapPin, t: "Credencial no mapa", d: "Apareça no mapa global cultural com selo verificado." },
  { i: Megaphone, t: "Divulgação cultural", d: "Campanhas curadas para públicos alinhados ao seu espaço." },
  { i: CalendarRange, t: "Eventos e comunidades", d: "Crie clubes, encontros recorrentes e séries culturais." },
  { i: Sparkles, t: "NFTs personalizados", d: "Emita NFTs de visita, presença e coleções exclusivas." },
  { i: Coins, t: "Campanhas com $VERSO", d: "Bonifique visitantes e amplie a recorrência cultural." },
  { i: BarChart3, t: "Dashboard de desempenho", d: "Métricas de presença, eventos e impacto cultural." },
];

const PLANS = [
  {
    name: "Café Aberto",
    tag: "Plano 0",
    price: "Grátis",
    desc: "Entrada gratuita para estabelecimentos que desejam aparecer no mapa Café & Verso.",
    items: [
      "Perfil básico",
      "Credencial no mapa",
      "Visibilidade limitada",
      "Sem envio ativo aos usuários",
      "Cota pequena de $VERSO Experiência",
      "NFT simples de visita",
    ],
  },
  {
    name: "Essencial",
    tag: "Plano 1",
    price: "fictício",
    desc: "Para espaços iniciando ações culturais e divulgação leve.",
    items: ["Perfil completo", "Campanhas básicas", "Eventos simples", "Analytics inicial", "Cota promocional limitada"],
  },
  {
    name: "Comunidade",
    tag: "Plano 2",
    price: "fictício",
    featured: true,
    desc: "Para cafés e livrarias com programação cultural ativa.",
    items: [
      "Envio segmentado para usuários autorizados",
      "Eventos recorrentes",
      "NFTs personalizados",
      "Tradução de vitrine",
      "Analytics avançado",
    ],
  },
  {
    name: "Embaixador",
    tag: "Plano 3",
    price: "fictício",
    desc: "Para espaços de referência cultural global.",
    items: [
      "Destaque global",
      "Campanhas multilíngues",
      "Coleções NFT exclusivas",
      "Ações solidárias",
      "Suporte estratégico",
    ],
  },
];

const STEPS = [
  "Cadastro",
  "Verificação",
  "Escolha de plano",
  "Cadastro da wallet",
  "Publicação no mapa",
  "Criação de eventos",
  "Recebimento",
  "Emissão de NFTs",
];

function EstabPage() {
  const { data: partners, loading: loadingPartners } = useApi(() => api.establishments(), []);

  return (
    <>
      <PageHero
        eyebrow="Para estabelecimentos"
        title={<>Transforme seu espaço em uma <span className="italic text-accent">experiência cultural conectada</span>.</>}
        subtitle="Cadastre seu estabelecimento, apareça no mapa global, crie eventos, receba tráfego qualificado e participe do ecossistema Café & Verso."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#planos"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[13.5px] font-medium text-background transition-all hover:gap-3"
          >
            Ver planos <ArrowUpRight strokeWidth={1.5} className="h-4 w-4" />
          </a>
          <a
            href="#fluxo"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-[13.5px] font-medium text-foreground hover:border-accent/60"
          >
            Como funciona o cadastro
          </a>
        </div>
      </PageHero>

      {/* Benefits */}
      <section className="border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel number="01">Benefícios</SectionLabel>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            O que muda quando seu espaço entra no Café &amp; Verso.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.t} className="bg-card p-7 lift">
                <b.i strokeWidth={1.1} className="h-7 w-7 text-foreground" />
                <h3 className="mt-6 font-serif text-[19px] text-foreground">{b.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="planos" className="scroll-mt-24 border-b border-border bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel number="02">Planos</SectionLabel>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Quatro caminhos — do mapa aberto ao embaixador global.
          </h2>

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {PLANS.map((p) => (
              <article
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-6 lift ${
                  p.featured
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-2.5 left-6 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] tracking-[0.2em] text-accent-foreground uppercase">
                    Recomendado
                  </span>
                )}
                <p className={`font-mono text-[10px] tracking-[0.22em] uppercase ${p.featured ? "text-background/60" : "text-muted-foreground"}`}>
                  {p.tag}
                </p>
                <h3 className={`mt-3 font-serif text-[26px] leading-tight ${p.featured ? "text-background" : "text-foreground"}`}>{p.name}</h3>
                <p className={`mt-3 text-[13px] leading-relaxed ${p.featured ? "text-background/70" : "text-muted-foreground"}`}>{p.desc}</p>
                <p className={`mt-6 font-serif text-3xl ${p.featured ? "text-background" : "text-foreground"}`}>{p.price}</p>

                <ul className="mt-6 flex-1 space-y-2.5 text-[13px]">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <CheckCircle2 strokeWidth={1.4} className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${p.featured ? "text-accent" : "text-accent"}`} />
                      <span className={p.featured ? "text-background/85" : "text-foreground/85"}>{it}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-7 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[12.5px] font-medium transition-all ${
                    p.featured
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "border border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                >
                  Selecionar plano <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section id="fluxo" className="scroll-mt-24 border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel number="03">Fluxo do parceiro</SectionLabel>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Do cadastro à primeira coleção NFT.
          </h2>

          <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s} className="relative rounded-2xl border border-border bg-card p-5 lift">
                <span className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                  Etapa {(i + 1).toString().padStart(2, "0")}
                </span>
                <p className="mt-3 font-serif text-[18px] text-foreground">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Curated */}
      <section className="border-b border-border bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
          <div>
            <SectionLabel number="04">Divulgação validada</SectionLabel>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Curadoria humana, sem ruído.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Campanhas são aprovadas pela plataforma para evitar spam, anúncios ruins
              ou experiências fora da proposta cultural do Café &amp; Verso.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            {[
              { t: "Campanha · Noite de Poesia", s: "Aprovada", c: "emerald" },
              { t: "Campanha · Promoção happy hour", s: "Ajuste solicitado", c: "amber" },
              { t: "Campanha · Clube de leitura mensal", s: "Em revisão", c: "muted" },
              { t: "Campanha · Sorteio em rede social", s: "Recusada · fora do escopo", c: "rose" },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between border-b border-border/60 py-3.5 last:border-0">
                <div className="flex items-start gap-3">
                  <ShieldCheck strokeWidth={1.3} className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <p className="text-[14px] text-foreground/90">{c.t}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase ${
                    c.c === "emerald"
                      ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                      : c.c === "amber"
                      ? "border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                      : c.c === "rose"
                      ? "border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400"
                      : "border border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  {c.s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel number="05">Parceiros ativos</SectionLabel>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Espaços que já fazem parte do ecossistema.
          </h2>

          {loadingPartners && (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-2xl border border-border bg-card" />
              ))}
            </div>
          )}

          {partners && (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((p: Establishment) => (
                <article key={p.id} className="group rounded-2xl border border-border bg-card p-5 lift">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-[17px] leading-tight text-foreground">{p.name}</h3>
                      <p className="mt-1 text-[12px] text-muted-foreground">
                        {p.city}{p.country ? ` · ${p.country}` : ""}
                      </p>
                    </div>
                    {p.verified && (
                      <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.18em] text-emerald-700 dark:text-emerald-400 uppercase">
                        Verificado
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] text-foreground">{p.plan}</span>
                    <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">{p.type}</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/60 pt-4">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">NFTs emitidos</p>
                      <p className="mt-1 font-serif text-[16px] text-foreground">{p.nfts_issued}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">$VERSO rec.</p>
                      <p className="mt-1 font-serif text-[16px] text-foreground">{p.verso_received.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Wallet */}
      <section className="border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel number="06">Wallet do estabelecimento</SectionLabel>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Painel financeiro cultural — claro e auditável.
          </h2>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {[
              { t: "Wallet cadastrada", v: "0x4f...c12a", icon: Wallet },
              { t: "$VERSO recebido", v: "8.420", icon: Coins },
              { t: "NFTs emitidos", v: "127", icon: Sparkles },
              { t: "Campanhas ativas", v: "04", icon: Megaphone },
              { t: "Taxa da plataforma", v: "1,8%", icon: BarChart3 },
              { t: "Interações totais", v: "2.341", icon: CheckCircle2 },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card p-6 lift">
                <div className="flex items-center justify-between">
                  <c.icon strokeWidth={1.2} className="h-5 w-5 text-foreground" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{c.t}</span>
                </div>
                <p className="mt-6 font-serif text-3xl text-foreground">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
