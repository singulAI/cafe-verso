import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { useApi } from "@/hooks/use-api";
import { api, type NFT } from "@/lib/api";

export const Route = createFileRoute("/nfts")({
  head: () => ({
    meta: [
      { title: "NFTs culturais — Café & Verso" },
      {
        name: "description",
        content: "NFTs de presença, visita e participação cultural — memória digital e pertencimento, sem caráter especulativo.",
      },
      { property: "og:title", content: "NFTs culturais — Café & Verso" },
      {
        property: "og:description",
        content: "Memória digital de cada experiência cultural vivida.",
      },
    ],
  }),
  component: NFTsPage,
});

const TONE_MAP: Record<string, string> = {
  amber: "from-amber-300/30 to-amber-500/10",
  rose: "from-rose-300/30 to-rose-500/10",
  sky: "from-sky-300/30 to-sky-500/10",
  emerald: "from-emerald-300/30 to-emerald-500/10",
  violet: "from-violet-300/30 to-violet-500/10",
  slate: "from-slate-300/30 to-slate-500/10",
  indigo: "from-indigo-300/30 to-indigo-500/10",
};

const RARITY_COLORS: Record<string, string> = {
  Comum: "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Incomum: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Raro: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-400",
  Épico: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

function NFTsPage() {
  const [filter, setFilter] = useState("Todas");
  const params = filter !== "Todas" ? { rarity: filter } : undefined;
  const { data: nfts, loading } = useApi(() => api.nfts(params), [filter]);

  return (
    <>
      <PageHero
        eyebrow="NFTs culturais"
        title={<>Memória digital de <span className="italic text-accent">presença</span> e pertencimento.</>}
        subtitle="Os NFTs do Café & Verso registram presença, pertencimento e participação cultural — não são apresentados como investimento, mas como memória, acesso e reputação dentro do ecossistema."
      >
        <div className="flex flex-wrap gap-2">
          {["Todas", "Comum", "Incomum", "Raro", "Épico"].map((f) => (
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
          <SectionLabel number="01">Coleções</SectionLabel>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Cada NFT, uma memória cultural autêntica.
          </h2>

          {loading && (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl border border-border bg-card" />
              ))}
            </div>
          )}

          {nfts && (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {nfts.map((n: NFT) => {
                const gradient = TONE_MAP[n.tone] ?? "from-slate-300/30 to-slate-500/10";
                return (
                  <article key={n.id} className="group overflow-hidden rounded-2xl border border-border bg-card lift">
                    <div className={`relative aspect-[4/5] bg-gradient-to-br ${gradient}`}>
                      <div className="absolute inset-0 grain" />
                      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full text-foreground/35" fill="none" stroke="currentColor" strokeWidth="0.7">
                        <circle cx="100" cy="120" r="60" />
                        <circle cx="100" cy="120" r="40" />
                        <circle cx="100" cy="120" r="22" />
                        <line x1="20" y1="120" x2="180" y2="120" />
                        <line x1="100" y1="40" x2="100" y2="200" />
                      </svg>
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.2em] text-muted-foreground uppercase backdrop-blur">
                        <Sparkles strokeWidth={1.4} className="h-3 w-3" /> {n.collection}
                      </div>
                      <div
                        className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9.5px] tracking-[0.18em] uppercase backdrop-blur ${
                          RARITY_COLORS[n.rarity] ?? RARITY_COLORS["Comum"]
                        }`}
                      >
                        {n.rarity}
                      </div>
                    </div>
                    <div className="border-t border-border p-5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-[18px] leading-tight text-foreground">{n.name}</h3>
                        <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                          {n.issued}/{n.total_supply ?? "∞"}
                        </span>
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground line-clamp-2">{n.description}</p>
                      {n.perks.length > 0 && (
                        <ul className="mt-4 space-y-1">
                          {n.perks.slice(0, 3).map((perk) => (
                            <li key={perk} className="flex items-center gap-1.5 text-[11px] text-foreground/75">
                              <ShieldCheck strokeWidth={1.4} className="h-3 w-3 shrink-0 text-accent" />
                              {perk}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-5 inline-flex items-center gap-1.5 text-[12px] text-foreground underline-grow">
                        Explorar coleção <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:grid-cols-3 sm:px-8">
          {[
            { t: "Não financeiro", d: "Sem promessa de rendimento, valorização ou saque." },
            { t: "Cultural e utilitário", d: "Acesso, identidade, lembrança e reputação." },
            { t: "Auditável e transparente", d: "Cada emissão pode ser verificada no ecossistema." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-6">
              <p className="font-serif text-[18px] text-foreground">{b.t}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
