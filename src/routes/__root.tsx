import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Activity, Menu, X } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/detection", label: "Disease Detection" },
  { to: "/hospitals", label: "Hospital Network" },
  { to: "/federated", label: "Federated Learning" },
  { to: "/explainable", label: "Explainable AI" },
  { to: "/architecture", label: "Architecture" },
  { to: "/report", label: "Diagnosis Report" },
  { to: "/about", label: "About" },
] as const;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-card rounded-2xl p-10">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <Link to="/" className="mt-6 inline-flex btn-hero rounded-lg px-5 py-2.5 text-sm font-medium">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-card rounded-2xl p-10">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing or return home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-hero rounded-lg px-4 py-2 text-sm">Try again</button>
          <a href="/" className="rounded-lg border border-input bg-background px-4 py-2 text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FedLung AI — Federated Explainable Lung Cancer Diagnosis" },
      { name: "description", content: "Privacy-preserving AI platform for lung cancer diagnosis using federated learning, multi-modal deep learning, and explainable AI." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl bg-background/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="grid h-9 w-9 place-items-center rounded-xl btn-hero">
              <Activity className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold">FedLung<span className="gradient-text"> AI</span></span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Federated Diagnosis</span>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to} className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <button onClick={() => setOpen(!open)} className="lg:hidden rounded-lg p-2 hover:bg-muted" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden pb-4 grid gap-1">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">{n.label}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 mt-20 py-8 text-center text-sm text-muted-foreground">
      <p>© 2026 FedLung AI · Federated Explainable Multi-Modal Deep Learning for Lung Cancer Diagnosis</p>
      <p className="mt-1 text-xs">Academic prototype · IEEE-inspired final-year project</p>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1"><Outlet /></main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
