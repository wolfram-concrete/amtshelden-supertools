"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type Role = "behoerde" | "anbieter";

/**
 * Zwei-Zielgruppen-Formular (Strategie-Meeting 12.06.2026):
 * - Behörden, die ein Tool empfehlen oder vermissen
 * - Unternehmen, die gelistet werden möchten
 *
 * Stub-Submit (kein echter Endpoint) — gleiche UX-Logik wie die anderen
 * Formulare im Projekt.
 */
export function VorschlagForm() {
  const [role, setRole] = useState<Role>("behoerde");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.subject) return;
    setSubmitted(true);
  }

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand bg-brand-light/40 p-8 text-center">
        <div className="text-3xl mb-3" aria-hidden>
          ✓
        </div>
        <h3 className="font-serif text-[24px] font-bold text-dark">
          Danke für Ihren Hinweis.
        </h3>
        <p className="font-sans text-[15px] text-mid mt-2 max-w-md mx-auto">
          {role === "behoerde"
            ? "Wir prüfen Ihren Vorschlag und nehmen das Tool gegebenenfalls in die redaktionelle Pipeline auf."
            : "Wir prüfen, ob Ihr Tool in eines unserer Themenfelder passt, und melden uns persönlich."}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-6 font-ui text-[13px] font-semibold text-brand hover:underline"
        >
          Weiteren Hinweis senden
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 lg:p-8">
      {/* Rollen-Umschalter */}
      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-full bg-cream mb-7">
        <RoleTab
          active={role === "behoerde"}
          onClick={() => setRole("behoerde")}
        >
          Ich bin Behörde
        </RoleTab>
        <RoleTab
          active={role === "anbieter"}
          onClick={() => setRole("anbieter")}
        >
          Ich bin Anbieter
        </RoleTab>
      </div>

      <div className="mb-6">
        <h2 className="font-serif text-[24px] font-bold leading-tight text-dark">
          {role === "behoerde"
            ? "Tool empfehlen oder vermissen"
            : "Unternehmen eintragen"}
        </h2>
        <p className="font-sans text-[14px] leading-[1.6] text-soft mt-1.5">
          {role === "behoerde"
            ? "Sie nutzen ein Tool, das hier fehlt? Oder vermissen eine Lösung für Ihr Problem? Sagen Sie es uns."
            : "Erzählen Sie uns von Ihrem Produkt. Wir prüfen, ob es in eines unserer Themenfelder passt."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Name" htmlFor="vf-name">
          <input
            id="vf-name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={
              role === "behoerde" ? "Ihr Name" : "Ansprechpartner:in"
            }
            className="vf-input"
          />
        </Field>

        <Field label="E-Mail *" htmlFor="vf-email">
          <input
            id="vf-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={
              role === "behoerde" ? "name@kommune.de" : "name@unternehmen.de"
            }
            className="vf-input"
          />
        </Field>

        <Field
          label={role === "behoerde" ? "Tool-Name *" : "Produkt / Unternehmen *"}
          htmlFor="vf-subject"
        >
          <input
            id="vf-subject"
            type="text"
            required
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            placeholder={
              role === "behoerde"
                ? "Welches Tool sollen wir aufnehmen?"
                : "Name Ihres Produkts"
            }
            className="vf-input"
          />
        </Field>

        <Field
          label={role === "behoerde" ? "Kontext (optional)" : "Kurzbeschreibung (optional)"}
          htmlFor="vf-message"
        >
          <textarea
            id="vf-message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={
              role === "behoerde"
                ? "Wofür setzen Sie das Tool ein? Was fehlt Ihnen?"
                : "Was leistet Ihr Produkt für Behörden? In welches Themenfeld passt es?"
            }
            className="vf-input resize-none"
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-full bg-brand px-6 py-3.5 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          {role === "behoerde" ? "Vorschlag senden" : "Eintrag anfragen"}
        </button>

        <p className="font-ui text-[11px] text-soft text-center leading-relaxed">
          Kein automatisiertes Listing. Die Redaktion prüft jeden Eintrag.
        </p>
      </form>

      <style>{`
        .vf-input {
          width: 100%;
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 0.7rem 0.9rem;
          font-family: var(--font-ui);
          font-size: 14px;
          color: var(--color-dark);
          background: var(--color-white, #fff);
          outline: none;
          transition: border-color 0.15s;
        }
        .vf-input::placeholder { color: var(--color-soft); }
        .vf-input:focus {
          border-color: var(--color-brand);
          box-shadow: 0 0 0 3px rgba(0, 148, 96, 0.15);
        }
      `}</style>
    </div>
  );
}

function RoleTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full py-2.5 font-ui text-[13px] font-semibold transition-colors",
        active
          ? "bg-white text-dark shadow-sm"
          : "text-soft hover:text-dark",
      )}
    >
      {children}
    </button>
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
    <label htmlFor={htmlFor} className="block space-y-1.5">
      <span className="font-ui text-[11px] font-bold uppercase tracking-[0.14em] text-soft">
        {label}
      </span>
      {children}
    </label>
  );
}
