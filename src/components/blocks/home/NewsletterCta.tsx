"use client";

import { FormEvent, useState } from "react";

interface NewsletterCtaProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  privacyNote?: string;
}

/**
 * Newsletter / Pulse-Abo CTA — Client Component (Form-State).
 * Stub: kein echter Submit, nur visuelles Feedback.
 */
export function NewsletterCta({
  eyebrow,
  title,
  description,
  ctaLabel = "Anmelden",
  privacyNote = "Wir versenden 1–2× pro Woche. Abmelden jederzeit möglich.",
}: NewsletterCtaProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: echter API-Call (Payload / externes Newsletter-Tool)
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-cream border border-border px-8 py-14 lg:px-14 lg:py-20 text-center space-y-6">
        <div className="flex items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-normal leading-[1.02] tracking-tight text-dark max-w-2xl mx-auto">
          {title}
        </h2>
        <p className="font-sans text-[16px] leading-[1.65] text-mid max-w-xl mx-auto">
          {description}
        </p>

        {submitted ? (
          <div className="mx-auto max-w-md rounded-xl border border-brand bg-brand-light/40 px-5 py-4 font-ui text-[14px] text-brand-dark">
            ✓ Danke! Wir bestätigen die Anmeldung gleich per E-Mail.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col sm:flex-row gap-2 max-w-md"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              E-Mail-Adresse
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dein.name@kommune.de"
              className="flex-1 rounded-full border border-border bg-white px-5 py-3 font-ui text-[14px] text-dark placeholder:text-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-3 font-ui text-[14px] font-semibold text-accent-ink transition-[filter] hover:brightness-95"
            >
              {ctaLabel}
            </button>
          </form>
        )}

        <p className="font-ui text-[11px] text-soft">{privacyNote}</p>
      </div>
    </section>
  );
}
