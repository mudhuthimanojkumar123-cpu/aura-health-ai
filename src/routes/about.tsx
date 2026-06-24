import { createFileRoute } from "@tanstack/react-router";
import { Target, CheckCircle2, Code2, Workflow } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — FedLung AI" },
      { name: "description", content: "Problem statement, objectives, technologies, and workflow of the FedLung AI research project." },
    ],
  }),
  component: About,
});

const OBJECTIVES = [
  "Automated Lung Cancer Detection",
  "Multi-Modal Medical Image Analysis",
  "Federated Learning Implementation",
  "Explainable AI Integration",
  "Privacy Preservation",
  "Clinical Decision Support",
];

const TECH = [
  "Deep Learning", "CNN", "Federated Learning", "Flower Framework",
  "TensorFlow", "Grad-CAM", "SHAP", "Computer Vision",
  "Python", "Streamlit", "Machine Learning",
];

const WORKFLOW = [
  "Select Hospital",
  "Upload Medical Image",
  "Preprocess Image",
  "Extract Features",
  "Perform Federated Learning Aggregation",
  "Generate Prediction",
  "Generate Explainability",
  "Create Diagnosis Report",
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold text-teal">Research Overview</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">About the Project</h1>
        <p className="mt-2 text-muted-foreground max-w-3xl">A research prototype exploring privacy-preserving, explainable AI for lung cancer diagnosis across multiple hospital networks.</p>
      </header>

      <section className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-destructive/10 text-destructive"><Target className="h-5 w-5" /></div>
          <h2 className="font-semibold text-lg">Problem Statement</h2>
        </div>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Traditional centralized AI-based lung cancer diagnosis systems require sharing sensitive
          patient data across hospitals, creating privacy, security, and regulatory challenges.
          FedLung AI replaces centralization with federated learning — training a single high-accuracy
          global model while patient images never leave their hospital of origin.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <section className="glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><CheckCircle2 className="h-5 w-5" /></div>
            <h2 className="font-semibold text-lg">Objectives</h2>
          </div>
          <ul className="mt-4 grid gap-2">
            {OBJECTIVES.map((o) => (
              <li key={o} className="flex items-start gap-3 rounded-xl bg-background/60 p-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span className="text-sm">{o}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal/20 text-teal"><Code2 className="h-5 w-5" /></div>
            <h2 className="font-semibold text-lg">Technologies Used</h2>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {TECH.map((t) => (
              <span key={t} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">{t}</span>
            ))}
          </div>
        </section>
      </div>

      <section className="glass-card rounded-2xl p-8 mt-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success"><Workflow className="h-5 w-5" /></div>
          <h2 className="font-semibold text-lg">Project Workflow</h2>
        </div>
        <ol className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {WORKFLOW.map((step, i) => (
            <li key={step} className="relative rounded-xl border border-border bg-background/60 p-4">
              <div className="text-xs uppercase tracking-wider text-teal font-semibold">Step {i + 1}</div>
              <div className="mt-1 font-semibold text-sm">{step}</div>
              <div className="absolute top-2 right-3 font-display text-3xl font-bold text-primary/10">{i + 1}</div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
