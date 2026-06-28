"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TOPICS = [
  { value: "allgemein", label: "Allgemeine Anfrage" },
  { value: "tool-anfrage", label: "Anfrage zu einem Tool" },
  { value: "anbieter", label: "Anbieter werden / Eintrag" },
  { value: "korrektur", label: "Daten-Korrektur melden" },
  { value: "thema", label: "Themenvorschlag / Redaktion" },
] as const;

interface KontaktFormProps {
  /** Vorausgewähltes Anliegen (aus ?topic=) */
  initialTopic?: string;
  /** Tool-Name/Slug vorbefüllen (aus ?tool=) */
  initialTool?: string;
}

export function KontaktForm({ initialTopic, initialTool }: KontaktFormProps) {
  const validTopic = TOPICS.some((t) => t.value === initialTopic)
    ? (initialTopic as string)
    : initialTool
      ? "tool-anfrage"
      : "allgemein";

  const [topic, setTopic] = useState<string>(validTopic);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    tool: initialTool ?? "",
    message: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.message) return;
    // Stub — kein echter Endpoint. Später an Amtshelden-Routing anbinden.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-brand-light/50 p-8 lg:p-10">
        <div className="flex items-center gap-2 text-brand-dark">
          <CheckCircle2 size={22} aria-hidden />
          <span className="font-serif text-[22px] font-normal">
            Danke — Ihre Anfrage ist eingegangen.
          </span>
        </div>
        <p className="mt-3 font-sans text-[15px] leading-[1.65] text-mid">
          Amtshelden stellt den Kontakt her und meldet sich persönlich. Keine
          automatisierten Folge-Mails, kein Ticketsystem.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Ihr Anliegen" htmlFor="kf-topic">
        <select
          id="kf-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-ui text-[14px] text-dark outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        >
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      {topic === "tool-anfrage" && (
        <Field label="Um welches Tool geht es?" htmlFor="kf-tool">
          <input
            id="kf-tool"
            type="text"
            value={form.tool}
            onChange={(e) => update("tool", e.target.value)}
            placeholder="z. B. VivioAkte"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 font-ui text-[14px] text-dark placeholder:text-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="kf-name">
          <input
            id="kf-name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 font-ui text-[14px] text-dark outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </Field>
        <Field label="E-Mail *" htmlFor="kf-email">
          <input
            id="kf-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 font-ui text-[14px] text-dark outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </Field>
      </div>

      <Field
        label={topic === "anbieter" ? "Unternehmen" : "Behörde / Organisation"}
        htmlFor="kf-org"
      >
        <input
          id="kf-org"
          type="text"
          value={form.org}
          onChange={(e) => update("org", e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 font-ui text-[14px] text-dark outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </Field>

      <Field label="Ihre Nachricht *" htmlFor="kf-message">
        <textarea
          id="kf-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full resize-y rounded-xl border border-border bg-white px-4 py-3 font-ui text-[14px] leading-[1.6] text-dark outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Anfrage senden
          <ArrowRight size={16} aria-hidden />
        </button>
        <p className="font-ui text-[12px] text-soft">
          Läuft über Amtshelden · kein Spam · DSGVO-konform
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-soft"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
