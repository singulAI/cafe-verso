import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Languages, Sparkles, Coins, ArrowUpRight, Globe2, Coffee, BookOpen, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { useApi } from "@/hooks/use-api";
import { api, type Event } from "@/lib/api";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos culturais — Café & Verso" },
      {
        name: "description",
        content: "Eventos online, presenciais e híbridos: clubes de leitura, encontros em cafés e experiências em livrarias.",
      },
      { property: "og:title", content: "Eventos — Café & Verso" },
      {
        property: "og:description",
        content: "Agenda cultural global multilíngue.",
      },
    ],
  }),
  component: EventosPage,
});

const TYPES = ["Todos", "Online", "Presencial", "Híbrido"];

function EventosPage() {
  const [filter, setFilter] = useState("Todos");
  const params = filter !== "Todos" ? { mode: filter } : undefined;
  const { data: events, loading, error } = useApi(() => api.events(params), [filter]);

  return (
    <>
      <PageHero
        eyebrow="Eventos"
        title={<>Encontros culturais que <span className="italic text-accent">cruzam idiomas</span> e cidades.</>}
        subtitle="Online, presenciais ou híbridos — clubes de leitura, cafés filosóficos, livrarias abertas e experiências em qualquer fuso."
      >
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full border px-4 py-2 text-[12.5px] transition-all ${
                filter === t
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:border-accent/60 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel number="01">Próximos eventos</SectionLabel>

          {loading && (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl border border-border bg-card animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <p className="mt-10 text-sm text-muted-foreground">Não foi possível carregar os eventos. Tente novamente.</p>
          )}

          {events && (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((e: Event) => (
                <article key={e.id} className="group flex flex-col rounded-2xl border border-border bg-card p-6 lift">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.2em] text-accent uppercase">
                      <Calendar strokeWidth={1.4} className="h-3.5 w-3.5" /> {e.date_label}
                    </span>
                    <span className="rounded-full border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      {e.mode}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-[22px] leading-tight text-foreground">{e.title}</h3>
                  <p className="mt-2 text-[13px] text-muted-foreground">por {e.host}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">{e.description}</p>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-[12px] text-foreground/85">
                    <p className="flex items-center gap-1.5">
                      <MapPin strokeWidth={1.4} className="h-3.5 w-3.5 text-muted-foreground" />
                      {e.city}{e.country ? ` · ${e.country}` : ""}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Languages strokeWidth={1.4} className="h-3.5 w-3.5 text-muted-foreground" />
                      {e.langs.join(" · ")}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Users strokeWidth={1.4} className="h-3.5 w-3.5 text-muted-foreground" />
                      {e.participants}/{e.capacity} vagas
                    </p>
                    {e.nft && (
                      <p className="flex items-center gap-1.5"><Sparkles strokeWidth={1.4} className="h-3.5 w-3.5 text-muted-foreground" /> NFT disponível</p>
                    )}
                    <p className="flex items-center gap-1.5">
                      <Coins strokeWidth={1.4} className="h-3.5 w-3.5 text-muted-foreground" />
                      +{e.verso_reward} $VERSO
                    </p>
                  </div>

                  <div className="mt-4 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${Math.round((e.participants / e.capacity) * 100)}%` }}
                    />
                  </div>

                  <button className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-[12.5px] font-medium text-background transition-all hover:gap-2.5">
                    Participar <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 sm:px-8">
          {[
            { i: Globe2, t: "Multilíngue por padrão", d: "Tradução em tempo real entre participantes." },
            { i: Coffee, t: "Em cafés reais", d: "Encontros presenciais com hospedagem cultural." },
            { i: BookOpen, t: "Curadoria literária", d: "Programações guiadas por leitores e editores." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6">
              <c.i strokeWidth={1.2} className="h-6 w-6 text-foreground" />
              <p className="mt-5 font-serif text-[18px] text-foreground">{c.t}</p>
              <p className="mt-1.5 text-[13px] text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
