import { Outlet, createRootRoute, Link } from "@tanstack/react-router";

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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

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
