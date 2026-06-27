"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { themenfelder } from "@/mocks/themenfelder";

/**
 * Tool-Finder als geführter 6-Fragen-Wizard (Strategie-Meeting 12.06.2026).
 *
 * Leitet Behörden Schritt für Schritt zur passenden Auswahl — eine Frage
 * pro Schritt, mit Fortschritt und Zurück. „Zusätzlicher Zugang, nicht
 * Ersatz für normale Kategorien."
 *
 * Frage 1 (Was verbessern?) bestimmt das Ziel-Themenfeld. Die übrigen
 * Antworten werden als Query-Parameter mitgegeben (für späteres Filtern).
 */

interface Question {
  key: string;
  label: string;
  /** options: erste Frage nutzt Themenfelder, daher dynamisch */
  options?: { value: string; label: string }[];
  useThemenfelder?: boolean;
}

const QUESTIONS: Question[] = [
  {
    key: "ziel",
    label: "Was möchten Sie verbessern?",
    useThemenfelder: true,
  },
  {
    key: "groesse",
    label: "Wie groß ist Ihre Behörde?",
    options: [
      { value: "klein", label: "bis 10.000 EW" },
      { value: "mittel", label: "10.000–50.000 EW" },
      { value: "gross", label: "über 50.000 EW" },
      { value: "egal", label: "Egal" },
    ],
  },
  {
    key: "nutzer",
    label: "Wer nutzt das Tool vor allem?",
    options: [
      { value: "sachbearbeitung", label: "Sachbearbeitung" },
      { value: "fuehrung", label: "Führung" },
      { value: "it", label: "IT-Team" },
      { value: "buergerkontakt", label: "Bürgerkontakt" },
    ],
  },
  {
    key: "it",
    label: "Gibt es IT-Unterstützung?",
    options: [
      { value: "eigene", label: "Eigene IT" },
      { value: "extern", label: "Externer Dienstleister" },
      { value: "keine", label: "Keine" },
      { value: "egal", label: "Egal" },
    ],
  },
  {
    key: "kommunikation",
    label: "Interne oder externe Kommunikation?",
    options: [
      { value: "intern", label: "Intern" },
      { value: "extern", label: "Extern" },
      { value: "beides", label: "Beides" },
      { value: "na", label: "Nicht relevant" },
    ],
  },
  {
    key: "tempo",
    label: "Sofort nutzbar oder darf es ein Projekt werden?",
    options: [
      { value: "sofort", label: "Sofort startklar" },
      { value: "projekt", label: "Darf ein Projekt sein" },
      { value: "egal", label: "Egal" },
    ],
  },
];

interface ToolFinderWizardProps {
  className?: string;
}

export function ToolFinderWizard({ className }: ToolFinderWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const options =
    q.useThemenfelder
      ? themenfelder.map((t) => ({ value: t.slug, label: t.name }))
      : q.options || [];

  function choose(value: string) {
    const next = { ...answers, [q.key]: value };
    setAnswers(next);
    if (isLast) {
      finish(next);
    } else {
      setStep((s) => s + 1);
    }
  }

  function finish(final: Record<string, string>) {
    const ziel = final.ziel || themenfelder[0].slug;
    const params = new URLSearchParams();
    // Tempo → Betriebsart-Hinweis für spätere Kategorie-Filterung
    if (final.tempo === "sofort") params.set("ops", "Cloud");
    if (final.tempo === "projekt") params.set("ops", "OnPremise");
    if (final.groesse && final.groesse !== "egal")
      params.set("size", final.groesse);
    const query = params.toString();
    router.push(`/themenfelder/${ziel}${query ? `?${query}` : ""}`);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <aside
      className={cn(
        "rounded-3xl bg-brand-dark p-6 lg:p-8 text-white shadow-[0_20px_50px_-32px_rgba(0,107,69,0.7)]",
        className,
      )}
    >
      {/* Kopf */}
      <div className="flex items-center justify-between mb-5">
        <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
          Tool-Finder
        </div>
        <div className="font-ui text-[11px] font-medium text-white/55">
          {step + 1} / {QUESTIONS.length}
        </div>
      </div>

      {/* Fortschrittsbalken */}
      <div className="h-1 w-full rounded-full bg-white/15 mb-6 overflow-hidden">
        <div
          className="h-full rounded-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Frage */}
      <h2 className="font-serif text-[24px] font-semibold leading-[1.15] text-white mb-5">
        {q.label}
      </h2>

      {/* Optionen */}
      <div className="space-y-2">
        {options.map((opt) => {
          const selected = answers[q.key] === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => choose(opt.value)}
              className={cn(
                "w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left font-ui text-[14px] font-medium transition-colors",
                selected
                  ? "bg-white text-brand-dark"
                  : "bg-white/10 text-white hover:bg-white/20",
              )}
            >
              {opt.label}
              <ArrowRight
                size={15}
                className={cn(
                  "flex-shrink-0",
                  selected ? "text-brand" : "text-white/60",
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      {step > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 font-ui text-[12.5px] font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} aria-hidden />
            Zurück
          </button>
        </div>
      )}
    </aside>
  );
}
