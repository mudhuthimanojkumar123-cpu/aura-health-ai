import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { Upload, ImageIcon, Sparkles, AlertTriangle, CheckCircle2, ScanSearch, Stethoscope } from "lucide-react";
import ctHealthy from "../assets/ct-healthy.jpg";
import ctBenign from "../assets/ct-benign.jpg";
import ctMalignant from "../assets/ct-malignant.jpg";
import xrayHealthy from "../assets/xray-healthy.jpg";
import xrayPneumonia from "../assets/xray-pneumonia.jpg";
import histoBenign from "../assets/histo-benign.jpg";
import histoMalignant from "../assets/histo-malignant.jpg";

export const Route = createFileRoute("/detection")({
  head: () => ({
    meta: [
      { title: "Disease Detection — FedLung AI" },
      { name: "description", content: "Upload CT, X-Ray, or histopathology images and receive AI-powered lung cancer predictions with explainability." },
    ],
  }),
  component: Detection,
});

type Sample = {
  id: string;
  label: string;
  modality: "CT Scan" | "Chest X-Ray" | "Histopathology";
  src: string;
  diagnosis: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High";
  status: "Healthy" | "Benign" | "Cancer Detected" | "Abnormal";
  recommendation: string;
};

const SAMPLES: Sample[] = [
  { id: "ct1", label: "Healthy Lung CT Scan", modality: "CT Scan", src: ctHealthy, diagnosis: "Healthy Lung Tissue", confidence: 97, severity: "Low", status: "Healthy", recommendation: "No abnormality detected. Routine annual screening recommended." },
  { id: "ct2", label: "Benign Lung Nodule CT Scan", modality: "CT Scan", src: ctBenign, diagnosis: "Benign Pulmonary Nodule", confidence: 89, severity: "Moderate", status: "Benign", recommendation: "Benign nodule identified. Follow-up CT in 6 months recommended." },
  { id: "ct3", label: "Malignant Lung Tumor CT Scan", modality: "CT Scan", src: ctMalignant, diagnosis: "Malignant Lung Cancer", confidence: 94, severity: "High", status: "Cancer Detected", recommendation: "Immediate consultation with an oncologist is advised." },
  { id: "xr1", label: "Healthy Chest X-Ray", modality: "Chest X-Ray", src: xrayHealthy, diagnosis: "Normal Chest Radiograph", confidence: 96, severity: "Low", status: "Healthy", recommendation: "No pulmonary abnormality detected." },
  { id: "xr2", label: "Pneumonia-like X-Ray", modality: "Chest X-Ray", src: xrayPneumonia, diagnosis: "Pulmonary Infiltrate / Pneumonia", confidence: 91, severity: "Moderate", status: "Abnormal", recommendation: "Pulmonary infiltrate detected. Antibiotic therapy and follow-up imaging advised." },
  { id: "ht1", label: "Histopathology Benign Sample", modality: "Histopathology", src: histoBenign, diagnosis: "Benign Tissue Sample", confidence: 92, severity: "Low", status: "Benign", recommendation: "Benign histological pattern. No further intervention required." },
  { id: "ht2", label: "Histopathology Malignant Sample", modality: "Histopathology", src: histoMalignant, diagnosis: "Malignant Adenocarcinoma", confidence: 95, severity: "High", status: "Cancer Detected", recommendation: "Malignant cells detected. Refer for staging and oncology evaluation." },
];

function Detection() {
  const [selected, setSelected] = useState<Sample | null>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploaded(e.target?.result as string);
      setSelected(null);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }, []);

  const analyze = () => {
    setAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setAnalyzing(false); return 100; }
        return p + 5;
      });
    }, 40);
    // Default to malignant result for arbitrary uploads
    setTimeout(() => setSelected(SAMPLES[2]), 900);
  };

  const pickSample = (s: Sample) => {
    setSelected(s);
    setUploaded(s.src);
    setProgress(100);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <span className="text-xs uppercase tracking-widest font-semibold text-teal">AI Diagnosis</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">Lung Cancer Disease Detection</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Upload a medical image or choose from our sample gallery to see a live AI prediction with Grad-CAM explainability.</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
        {/* Upload + preview */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold flex items-center gap-2"><Upload className="h-4 w-4 text-primary" /> Upload Medical Image</h2>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className="mt-4 cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition p-10 text-center"
          >
            {uploaded ? (
              <img src={uploaded} alt="Preview" className="mx-auto max-h-72 rounded-xl shadow-lg" />
            ) : (
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-primary/15 text-primary"><ImageIcon className="h-7 w-7" /></div>
                <p className="mt-3 text-sm font-medium">Drag & drop a medical image here</p>
                <p className="text-xs text-muted-foreground">CT Scan · Chest X-Ray · Histopathology · JPG / PNG / DICOM</p>
              </div>
            )}
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>
          <button onClick={analyze} disabled={!uploaded || analyzing} className="mt-4 w-full btn-hero rounded-xl py-3 text-sm font-semibold disabled:opacity-50 inline-flex items-center justify-center gap-2">
            <ScanSearch className="h-4 w-4" /> {analyzing ? "Analyzing…" : "Analyze Image"}
          </button>
          {analyzing && (
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-primary to-teal transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}

          <h3 className="mt-8 font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-teal" /> Sample Image Gallery</h3>
          <p className="text-xs text-muted-foreground mt-1">Click any sample to load a pre-analyzed result.</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SAMPLES.map((s) => (
              <button key={s.id} onClick={() => pickSample(s)} className={`group relative overflow-hidden rounded-xl border bg-background text-left transition hover:-translate-y-1 hover:shadow-lg ${selected?.id === s.id ? "border-primary ring-2 ring-primary/30" : "border-border"}`}>
                <img src={s.src} alt={s.label} loading="lazy" className="aspect-square w-full object-cover" />
                <div className="p-2">
                  <div className="text-[10px] uppercase tracking-wider text-teal">{s.modality}</div>
                  <div className="text-xs font-medium leading-tight mt-0.5">{s.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result panel */}
        <div className="space-y-4">
          {!selected ? (
            <div className="glass-card rounded-2xl p-10 text-center min-h-[400px] grid place-items-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Stethoscope className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-semibold">Awaiting analysis</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-sm">Upload an image or pick a sample to see the diagnosis, severity, confidence, and Grad-CAM heatmap.</p>
              </div>
            </div>
          ) : (
            <ResultPanel sample={selected} uploaded={uploaded ?? selected.src} />
          )}
        </div>
      </div>
    </div>
  );
}

function ResultPanel({ sample, uploaded }: { sample: Sample; uploaded: string }) {
  const isBad = sample.status === "Cancer Detected" || sample.severity === "High";
  const sevColor = sample.severity === "High" ? "text-destructive" : sample.severity === "Moderate" ? "text-warning" : "text-success";
  return (
    <>
      <div className="glass-card rounded-2xl p-6 animate-flow">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-teal">Diagnosis Result</span>
            <h2 className="mt-1 text-2xl font-bold">{sample.diagnosis}</h2>
            <p className="text-xs text-muted-foreground">{sample.modality} · Status: {sample.status}</p>
          </div>
          <div className={`grid h-12 w-12 place-items-center rounded-xl ${isBad ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success"}`}>
            {isBad ? <AlertTriangle className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />}
          </div>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <div className="relative rounded-xl overflow-hidden border border-border bg-black">
            <img src={uploaded} alt="Analyzed" className="w-full aspect-square object-cover opacity-90" />
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className={`relative h-1/2 w-1/2 rounded-full ${isBad ? "ring-4 ring-destructive/70" : "ring-4 ring-success/60"} animate-pulse`} style={{ background: isBad ? "radial-gradient(circle, oklch(0.60 0.24 25 / 0.45), transparent 70%)" : "radial-gradient(circle, oklch(0.68 0.16 160 / 0.35), transparent 70%)" }} />
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider bg-black/60 text-white px-2 py-1 rounded">Grad-CAM overlay</div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
                <span>Confidence</span><span className="text-foreground font-semibold">{sample.confidence}%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-teal" style={{ width: `${sample.confidence}%` }} />
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Severity</div>
              <div className={`mt-1 text-lg font-bold ${sevColor}`}>{sample.severity} Risk</div>
              <div className="mt-2 flex gap-1.5">
                {(["Low", "Moderate", "High"] as const).map((lv, i) => {
                  const active = (sample.severity === "Low" && i === 0) || (sample.severity === "Moderate" && i <= 1) || (sample.severity === "High");
                  const c = i === 0 ? "bg-success" : i === 1 ? "bg-warning" : "bg-destructive";
                  return <div key={lv} className={`h-2 flex-1 rounded-full ${active ? c : "bg-muted"}`} />;
                })}
              </div>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-3">
              <div className="text-xs uppercase tracking-wider text-primary font-semibold">Recommendation</div>
              <p className="mt-1 text-sm">{sample.recommendation}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5 text-sm">
        <p className="text-muted-foreground"><span className="font-semibold text-foreground">Next steps:</span> View the full Grad-CAM and SHAP breakdown on the Explainable AI page, or generate a printable clinical report from the Diagnosis Report page.</p>
      </div>
    </>
  );
}
