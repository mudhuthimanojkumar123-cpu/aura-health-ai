import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon, Cog, Cpu, Layers, Network, Globe, Eye, Stethoscope, ClipboardCheck, FileText } from "lucide-react";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Project Architecture — FedLung AI" },
      { name: "description", content: "End-to-end federated, multi-modal, explainable lung cancer diagnosis pipeline." },
    ],
  }),
  component: Architecture,
});

const STEPS = [
  { icon: ImageIcon, title: "Multi-Modal Inputs", desc: "CT Images · Chest X-Ray · Histopathology", color: "from-primary to-teal" },
  { icon: Cog, title: "Image Preprocessing", desc: "Normalization, augmentation, lung segmentation", color: "from-teal to-success" },
  { icon: Cpu, title: "CNN Feature Extraction", desc: "Per-modality encoders (ResNet50 / EfficientNet)", color: "from-success to-chart-4" },
  { icon: Layers, title: "Multi-Modal Feature Fusion", desc: "Attention-weighted late fusion of modality embeddings", color: "from-chart-4 to-chart-5" },
  { icon: Network, title: "Federated Learning", desc: "FedAvg across 3 hospital nodes — weights only", color: "from-chart-5 to-primary" },
  { icon: Globe, title: "Global Deep Learning Model", desc: "Aggregated model v2.5 — 95% accuracy", color: "from-primary to-teal" },
  { icon: Eye, title: "Explainable AI", desc: "Grad-CAM heatmaps + SHAP feature importance", color: "from-teal to-success" },
  { icon: Stethoscope, title: "Lung Cancer Prediction", desc: "Diagnosis, confidence, severity, status", color: "from-success to-chart-4" },
  { icon: ClipboardCheck, title: "Clinical Decision Support", desc: "Evidence-based, radiologist-augmenting recommendations", color: "from-chart-4 to-chart-5" },
  { icon: FileText, title: "Diagnosis Report", desc: "Printable, downloadable, audit-ready report", color: "from-chart-5 to-primary" },
];

function Architecture() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10 text-center">
        <span className="text-xs uppercase tracking-widest font-semibold text-teal">System Design</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">Project Architecture</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">A 10-stage pipeline that turns raw multi-modal medical images into clinician-ready, explainable diagnoses — without ever moving patient data between hospitals.</p>
      </header>

      <div className="relative max-w-3xl mx-auto">
        {/* connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-teal to-success -translate-x-1/2" />

        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative animate-flow" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`relative glass-card rounded-2xl p-5 ${i % 2 === 0 ? "lg:mr-auto lg:ml-0 lg:w-[46%]" : "lg:ml-auto lg:mr-0 lg:w-[46%]"}`}>
                <div className="flex items-start gap-4">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-teal font-semibold">Step {i + 1}</div>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
                  </div>
                </div>
              </div>
              {/* dot on axis */}
              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-4 w-4 rounded-full bg-background border-2 border-primary shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
