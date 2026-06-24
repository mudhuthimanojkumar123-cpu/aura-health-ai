import { createFileRoute } from "@tanstack/react-router";
import { Building2, Server, GitMerge, TrendingUp, Layers } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

export const Route = createFileRoute("/federated")({
  head: () => ({
    meta: [
      { title: "Federated Learning Dashboard — FedLung AI" },
      { name: "description", content: "Real-time view of federated learning rounds, hospital contributions, and global model accuracy." },
    ],
  }),
  component: Federated,
});

const STATS = [
  { label: "Connected Hospitals", value: "3", icon: Building2 },
  { label: "Global Model Version", value: "v2.5", icon: Layers },
  { label: "Training Rounds", value: "25", icon: GitMerge },
  { label: "Global Accuracy", value: "95%", icon: TrendingUp },
];

const ACCURACY = Array.from({ length: 25 }, (_, i) => ({
  round: `R${i + 1}`,
  accuracy: +(0.72 + (1 - Math.exp(-i / 6)) * 0.23 + Math.sin(i) * 0.005).toFixed(3),
  loss: +(0.58 - (1 - Math.exp(-i / 6)) * 0.45 + Math.cos(i) * 0.01).toFixed(3),
}));

const CONTRIB = [
  { hospital: "Hospital A", contribution: 38, color: "var(--color-chart-1)" },
  { hospital: "Hospital B", contribution: 42, color: "var(--color-chart-2)" },
  { hospital: "Hospital C", contribution: 20, color: "var(--color-chart-3)" },
];

const PERF = [
  { metric: "Accuracy", value: 95 },
  { metric: "Precision", value: 93 },
  { metric: "Recall", value: 94 },
  { metric: "F1 Score", value: 93 },
  { metric: "AUC", value: 97 },
];

function Federated() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <span className="text-xs uppercase tracking-widest font-semibold text-teal">Real-time Telemetry</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">Federated Learning Dashboard</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Track aggregated weight updates, accuracy convergence, and per-hospital contributions across federated rounds.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl btn-hero">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 text-3xl font-bold gradient-text">{s.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Simulation */}
      <div className="mt-8 glass-card rounded-2xl p-6">
        <h2 className="font-semibold">Federated Round Simulation</h2>
        <div className="mt-6 grid lg:grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="grid gap-3">
            {["Hospital A", "Hospital B", "Hospital C"].map((h, i) => (
              <div key={h} className="rounded-xl border border-border bg-background/60 p-3 animate-flow" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg btn-hero"><Building2 className="h-4 w-4" /></div>
                  <div>
                    <div className="text-sm font-semibold">{h}</div>
                    <div className="text-xs text-muted-foreground">Local training → Weight sharing</div>
                  </div>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-teal" style={{ width: "100%" }} />
                </div>
              </div>
            ))}
          </div>

          <svg viewBox="0 0 120 200" className="h-48 w-32 mx-auto text-primary">
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
              </marker>
            </defs>
            {[30, 100, 170].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" className="animate-dash" markerEnd="url(#arr)" />
            ))}
            <circle cx="105" cy="100" r="10" fill="currentColor" />
          </svg>

          <div className="space-y-3">
            <div className="rounded-2xl p-5 text-white" style={{ background: "var(--gradient-primary)" }}>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <div className="font-semibold">Federated Server</div>
              </div>
              <div className="mt-3 text-sm opacity-90">Federated Averaging (FedAvg)</div>
              <div className="mt-2 text-xs opacity-75">∑ wᵢ · nᵢ / N — aggregating local weights</div>
            </div>
            <div className="rounded-xl border border-success/30 bg-success/10 p-4">
              <div className="text-xs uppercase tracking-wider text-success font-semibold">Global Model Update</div>
              <div className="mt-1 text-sm">v2.5 deployed to all hospitals — accuracy 95%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <ChartCard title="Training Accuracy & Loss Trend">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={ACCURACY}>
              <defs>
                <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="round" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} domain={[0.5, 1]} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Legend />
              <Area type="monotone" dataKey="accuracy" stroke="var(--color-chart-1)" fill="url(#ga)" strokeWidth={2} />
              <Line type="monotone" dataKey="loss" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Federated Rounds Progress">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={ACCURACY}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="round" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="accuracy" stroke="var(--color-chart-2)" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Hospital Contribution (Data Volume)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={CONTRIB}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="hospital" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} unit="%" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Bar dataKey="contribution" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Global Model Performance Metrics">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={PERF} layout="vertical">
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} domain={[0, 100]} unit="%" />
              <YAxis dataKey="metric" type="category" stroke="var(--color-muted-foreground)" fontSize={11} width={80} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Bar dataKey="value" fill="var(--color-chart-3)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      {children}
    </div>
  );
}
