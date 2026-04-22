import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Languages, Globe2, Calendar, Users, Zap } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { useApi } from "@/hooks/use-api";
import { api, type Community } from "@/lib/api";

export const Route = createFileRoute("/comunidades")({
  head: () => ({
    meta: [
      { title: "Comunidades — Café & Verso" },
      {
        name: "description",
        content: "Salas de leitura, café e cultura em múltiplos idiomas, com tradução automática.",
      },
      { property: "og:title", content: "Comunidades — Café & Verso" },
      {
        property: "og:description",
        content: "Comunidades multilíngues conectando leitores em todo o mundo.",
      },
    ],
  }),
  component: ComunidadesPage,
});

const FILTERS = ["Todas", "Poesia", "Fantasia", "Filosofia", "Escrita", "Curadoria", "Café & Livros"];

function ComunidadesPage() {
  const [filter, setFilter] = useState("Todas");
  const params = filter !== "Todas" ? { category: filter } : undefined;
  const { data: communities, loading } = useApi(() => api.communities(params), [filter]);

  return (
    <>
      <PageHero
        eyebrow="Comunidades"
        title={<>Salas culturais que <span className="italic text-accent">conversam</span> em todos os idiomas.</>}
        subtitle="Salas de leitura, café, idioma, país e tema literário — com tradução automática entre participantes."
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-[12.5px] transition-all ${
                filter === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:border-accent/60 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel number="01">Comunidades em destaque</SectionLabel>

          {loading && (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-56 rounded-2xl border border-border bg-card animate-pulse" />
              ))}
            </div>
          )}

          {communities && (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {communities.map((c: Community) => (
                <article key={c.id} className="group flex flex-col rounded-2xl border border-border bg-card p-6 lift">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      <Languages strokeWidth={1.5} className="h-3 w-3" /> {c.langs.join(" · ")}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {c.members >= 1000 ? `${(c.members / 1000).toFixed(1)}k` : c.members}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-[22px] leading-tight text-foreground">{c.name}</h3>
                  <p className="mt-2 text-[13px] text-muted-foreground">{c.category}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">{c.description}</p>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-[12px] text-foreground/85">
                    <p className="flex items-center gap-1.5">
                      <Globe2 strokeWidth={1.4} className="h-3.5 w-3.5 text-muted-foreground" />
                      {c.country_flags.slice(0, 3).join(" · ")}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar strokeWidth={1.4} className="h-3.5 w-3.5 text-muted-foreground" />
                      {c.events_this_month} eventos/mês
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Zap strokeWidth={1.4} className="h-3.5 w-3.5 text-accent" />
                      <span className="text-accent">{c.active_now} ativos agora</span>
                    </p>
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                      <Users strokeWidth={1.4} className="h-3.5 w-3.5" /> Sala ativa
                    </span>
                    <button className="inline-flex items-center gap-1.5 text-[12px] text-foreground underline-grow">
                      Entrar na sala <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
          <div>
            <SectionLabel number="02">Tradução automática</SectionLabel>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Você escreve no seu idioma. O mundo lê no dele.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              A tradução acontece entre participantes — preservando contexto cultural,
              tom e intenção. Cada pessoa escolhe como envia e como recebe.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            {[
              { u: "Yuki", c: "Tokyo · JP", t: "今夜は静かな読書夜です。", v: "Tonight is a quiet reading night.", side: "left" },
              { u: "Marina", c: "Lisboa · PT", t: "Acabei de começar Saramago.", v: "I just started Saramago.", side: "right" },
              { u: "Eli", c: "Berlin · DE", t: "Saramago verändert die Wahrnehmung.", v: "Saramago changes perception.", side: "left" },
            ].map((m, i) => (
              <div key={i} className={`mt-3 flex first:mt-0 ${m.side === "right" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl border border-border p-4 ${m.side === "right" ? "bg-secondary" : "bg-background"}`}>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    {m.u} · {m.c}
                  </p>
                  <p className="mt-2 text-[14px] text-foreground/90">{m.t}</p>
                  <p className="mt-2 border-t border-border/60 pt-2 text-[12.5px] italic text-muted-foreground">
                    {m.v}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
