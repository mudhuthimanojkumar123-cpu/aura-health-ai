import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Brain, Building2, Eye, Layers, Lock, Network, Stethoscope, FileText, ShieldCheck, Sparkles, ArrowRight, ImageIcon, CheckCircle2 } from "lucide-react";
import hero from "../assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FedLung AI — Federated Explainable Lung Cancer Diagnosis" },
      { name: "description", content: "AI-powered, privacy-preserving lung cancer diagnosis using federated learning, multi-modal deep learning, and explainable AI." },
      { property: "og:title", content: "FedLung AI — Lung Cancer Diagnosis Platform" },
      { property: "og:description", content: "Privacy-preserving federated, multi-modal, explainable AI for lung cancer." },
    ],
  }),
  component: Home,
});

const STATS = [
  { label: "Connected Hospitals", value: "3", icon: Building2, accent: "from-primary to-teal" },
  { label: "Medical Images Processed", value: "12,450", icon: ImageIcon, accent: "from-teal to-success" },
  { label: "Prediction Accuracy", value: "95%", icon: Sparkles, accent: "from-success to-primary" },
  { label: "Data Privacy", value: "100%", icon: ShieldCheck, accent: "from-primary to-chart-5" },
];

const FEATURES = [
  { icon: Stethoscope, title: "Lung Cancer Detection", desc: "Detect malignant, benign, and healthy patterns from CT, X-ray and histopathology." },
  { icon: Layers, title: "Multi-Modal Imaging", desc: "Fuse CT, X-Ray, and histopathology features for richer clinical insight." },
  { icon: Network, title: "Federated Learning", desc: "Train on data from multiple hospitals — without moving patient records." },
  { icon: Eye, title: "Explainable AI", desc: "Grad-CAM heatmaps and SHAP analysis make every prediction interpretable." },
  { icon: Lock, title: "Privacy Preservation", desc: "Only model weights leave the hospital. Patient data stays local, always." },
  { icon: Brain, title: "Clinical Decision Support", desc: "Evidence-based recommendations that augment radiologist workflow." },
  { icon: FileText, title: "Medical Report Generation", desc: "Auto-generated, printable, clinician-ready diagnostic reports." },
  { icon: Building2, title: "Multi-Hospital Collaboration", desc: "Connect specialty centers into a single, privacy-safe learning network." },
];

const BENEFITS = [
  "HIPAA-aligned data privacy by design",
  "No raw image transfer between hospitals",
  "95% diagnostic accuracy across modalities",
  "Transparent, audit-ready model decisions",
  "Sub-second inference on standard hardware",
  "Continuous improvement via federated rounds",
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, oklch(0.70 0.14 195 / 0.4), transparent 50%)" }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-[1.1fr_1fr] items-center gap-12">
            <div className="text-white animate-flow">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>
                IEEE-inspired · Final-year research prototype
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
                Federated Explainable<br />
                Multi-Modal Deep Learning<br />
                <span className="bg-gradient-to-r from-teal to-white bg-clip-text text-transparent">for Lung Cancer Diagnosis</span>
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-white/80">
                AI-powered, privacy-preserving lung cancer diagnosis combining Federated Learning,
                Multi-Modal Deep Learning, and Explainable Artificial Intelligence across hospitals.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/detection" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary shadow-lg hover:shadow-2xl transition">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/architecture" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition">
                  View Architecture
                </Link>
              </div>
            </div>
            <div className="relative animate-float">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-teal/30 to-primary/30 blur-2xl" />
              <img src={hero} alt="AI lung scan visualization" width={1536} height={1024} className="relative rounded-3xl border border-white/20 shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} text-white`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-3xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-teal">Platform Capabilities</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Eight pillars of a modern AI diagnosis stack</h2>
          <p className="mt-3 text-muted-foreground">Designed for radiologists, researchers, and hospital networks who can't compromise on accuracy or privacy.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition group">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center glass-card rounded-3xl p-8 lg:p-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-teal">Why FedLung AI</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Built for accuracy.<br />Engineered for privacy.</h2>
            <p className="mt-4 text-muted-foreground">Centralized AI models put patient data at risk. FedLung AI trains a single global model across hospitals — without ever moving an image.</p>
            <Link to="/federated" className="mt-6 inline-flex items-center gap-2 btn-hero rounded-xl px-5 py-3 text-sm font-semibold">
              Explore Federated Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-xl bg-background/60 p-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
