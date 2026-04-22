import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/lib/theme";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl text-foreground">Página não encontrada</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
          A página que você procura não existe ou foi movida para outra estante.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-[13px] font-medium text-background transition-all hover:bg-foreground/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Café & Verso — Leitura, café e comunidade global" },
      {
        name: "description",
        content:
          "Café & Verso conecta leitores, cafés, livrarias e comunidades culturais em uma rede multilíngue global com mapa, eventos e NFTs de presença.",
      },
      { name: "author", content: "Café & Verso" },
      { property: "og:title", content: "Café & Verso — Leitura, café e comunidade global" },
      {
        property: "og:description",
        content: "Leitura, café e comunidade global em uma única plataforma.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Café & Verso — Leitura, café e comunidade global" },
      { name: "description", content: "Café & Verso" },
      { property: "og:description", content: "Café & Verso" },
      { name: "twitter:description", content: "Café & Verso" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/1KZhBnt2mfTE8JP9txPjq6Ufa0b2/social-images/social-1776843581796-7dbe8857-06e4-4cb7-9b24-858a42c5ece3.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/1KZhBnt2mfTE8JP9txPjq6Ufa0b2/social-images/social-1776843581796-7dbe8857-06e4-4cb7-9b24-858a42c5ece3.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

function Layout() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const hideChrome = path === "/intro";
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {!hideChrome && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
}
