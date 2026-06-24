import { createFileRoute } from "@tanstack/react-router";
import { Building2, CheckCircle2, Wifi, Database, Activity } from "lucide-react";

export const Route = createFileRoute("/hospitals")({
  head: () => ({
    meta: [
      { title: "Hospital Network — FedLung AI" },
      { name: "description", content: "Three specialty hospitals collaboratively training a single global model — without sharing patient data." },
    ],
  }),
  component: Hospitals,
});

const HOSPITALS = [
  { id: "A", name: "Hospital A", spec: "CT Imaging Center", images: 4820, progress: 100, color: "from-primary to-teal" },
  { id: "B", name: "Hospital B", spec: "Chest X-Ray Diagnostics", images: 5230, progress: 100, color: "from-teal to-success" },
  { id: "C", name: "Hospital C", spec: "Histopathology Laboratory", images: 2400, progress: 100, color: "from-success to-primary" },
];

function Hospitals() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold text-teal">Collaborating Institutions</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">Hospital Network</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Three specialty hospitals contribute model weights — never raw patient images — to the federated global model.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-5">
        {HOSPITALS.map((h) => (
          <div key={h.id} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition">
            <div className="flex items-start justify-between">
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${h.color} text-white shadow-lg`}>
                <Building2 className="h-7 w-7" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 text-success px-2.5 py-1 text-xs font-medium">
                <Wifi className="h-3 w-3" /> Online
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold">{h.name}</h3>
            <p className="text-sm text-muted-foreground">{h.spec}</p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-background/60 p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Database className="h-3 w-3" /> Images</div>
                <div className="text-lg font-bold gradient-text">{h.images.toLocaleString()}</div>
              </div>
              <div className="rounded-xl bg-background/60 p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Activity className="h-3 w-3" /> Local Model</div>
                <div className="text-sm font-semibold text-success">Active</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Training Progress</span>
                <span className="font-semibold">{h.progress}%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${h.color}`} style={{ width: `${h.progress}%` }} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-success">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-semibold">Training Complete</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 glass-card rounded-2xl p-6">
        <h2 className="font-semibold">Network Topology</h2>
        <div className="mt-6 grid md:grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="grid gap-3">
            {HOSPITALS.map((h) => (
              <div key={h.id} className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3">
                <div className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${h.color} text-white`}><Building2 className="h-4 w-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{h.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{h.spec}</div>
                </div>
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              </div>
            ))}
          </div>
          <svg viewBox="0 0 100 100" className="h-32 w-32 mx-auto text-primary">
            <line x1="0" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" className="animate-dash" />
            <line x1="0" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" className="animate-dash" />
            <line x1="0" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" className="animate-dash" />
            <line x1="50" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1.5" className="animate-dash" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
          <div className="rounded-2xl p-5 text-white text-center" style={{ background: "var(--gradient-primary)" }}>
            <div className="text-xs uppercase tracking-wider opacity-80">Federated Server</div>
            <div className="mt-1 text-2xl font-bold">FedAvg Aggregator</div>
            <div className="mt-2 text-sm opacity-90">v2.5 · Global Model</div>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-teal animate-pulse" /> Aggregating weights
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
