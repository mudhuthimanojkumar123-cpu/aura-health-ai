import { createFileRoute } from "@tanstack/react-router";
import { Eye, Brain, Sparkles } from "lucide-react";
import ctMalignant from "../assets/ct-malignant.jpg";

export const Route = createFileRoute("/explainable")({
  head: () => ({
    meta: [
      { title: "Explainable AI — FedLung AI" },
      { name: "description", content: "Grad-CAM heatmaps and SHAP feature importance reveal exactly why the model predicted what it did." },
    ],
  }),
  component: Explainable,
});

const SHAP = [
  { feature: "Texture Pattern", value: 32, desc: "Local binary patterns in nodule region" },
  { feature: "Nodule Density", value: 26, desc: "Hounsfield-unit density distribution" },
  { feature: "Shape Features", value: 18, desc: "Spiculation, lobulation, circularity" },
  { feature: "Image Contrast", value: 14, desc: "Edge gradient & intensity variance" },
  { feature: "Tissue Irregularity", value: 10, desc: "Surrounding parenchymal anomalies" },
];

function Explainable() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <span className="text-xs uppercase tracking-widest font-semibold text-teal">Model Interpretability</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">Explainable AI</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Every prediction is accompanied by visual and quantitative reasoning, giving clinicians full transparency into the model's decisions.</p>
      </header>

      {/* Grad-CAM */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary"><Eye className="h-5 w-5" /></div>
          <div>
            <h2 className="font-semibold text-lg">Grad-CAM Visualization</h2>
            <p className="text-sm text-muted-foreground">Suspicious Region Detection — AI highlights lung regions contributing most to prediction.</p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Frame label="Original Image">
            <img src={ctMalignant} alt="Original CT" className="w-full aspect-square object-cover" />
          </Frame>
          <Frame label="Heatmap Overlay">
            <div className="relative">
              <img src={ctMalignant} alt="Heatmap" className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 mix-blend-screen" style={{
                background: "radial-gradient(circle at 62% 38%, oklch(0.70 0.25 25 / 0.85) 0%, oklch(0.75 0.22 60 / 0.55) 25%, oklch(0.80 0.20 130 / 0.35) 45%, transparent 70%)",
              }} />
            </div>
          </Frame>
          <Frame label="Highlighted Tumor Region">
            <div className="relative">
              <img src={ctMalignant} alt="Tumor" className="w-full aspect-square object-cover" />
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <circle cx="62" cy="38" r="13" fill="none" stroke="oklch(0.65 0.25 25)" strokeWidth="1.2" className="animate-pulse" />
                <circle cx="62" cy="38" r="6" fill="oklch(0.70 0.25 25 / 0.3)" stroke="oklch(0.70 0.25 25)" strokeWidth="0.8" />
                <line x1="62" y1="38" x2="88" y2="14" stroke="oklch(0.70 0.25 25)" strokeWidth="0.5" />
                <text x="89" y="13" fontSize="4" fill="white" stroke="black" strokeWidth="0.2">Suspicious lesion · 94%</text>
              </svg>
            </div>
          </Frame>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">The model concentrated 76% of its attention on a 14mm spiculated mass in the left lung — consistent with radiologist findings.</p>
      </section>

      {/* SHAP */}
      <section className="glass-card rounded-2xl p-6 mt-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal/20 text-teal"><Brain className="h-5 w-5" /></div>
          <div>
            <h2 className="font-semibold text-lg">SHAP Feature Analysis</h2>
            <p className="text-sm text-muted-foreground">Shapley values quantify each feature's contribution to the final prediction.</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {SHAP.map((f, i) => (
            <div key={f.feature} className="animate-flow" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-baseline justify-between text-sm">
                <div>
                  <span className="font-semibold">{f.feature}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{f.desc}</span>
                </div>
                <span className="font-bold gradient-text text-lg">{f.value}%</span>
              </div>
              <div className="mt-1.5 h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${f.value * 2.5}%`, background: "var(--gradient-primary)" }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-primary/5 border border-primary/20 p-4 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold">Interpretation:</span> Texture pattern and nodule density together drive 58% of the malignancy decision — aligning with established radiomic biomarkers for non-small-cell lung cancer.
          </div>
        </div>
      </section>
    </div>
  );
}

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-black relative">
      {children}
      <div className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider bg-black/60 text-white px-2 py-1 rounded">{label}</div>
    </div>
  );
}
