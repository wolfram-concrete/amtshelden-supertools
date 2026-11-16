"use client";

import { useState } from "react";

import { Logo } from "@/components/site/Logo";

/**
 * Newsletter-Anmeldung über dem Footer (Wolfram 27.10., überarbeitet 13.11.).
 * Links benennt ein gefülltes Brand-Label klar, wofür man sich anmeldet, rechts
 * zeigt ein Mockup einer Beispielausgabe, wie der Newsletter aussieht. Ruhig,
 * plakativ, Sie-Ansprache, ehrliche Zusage zur Adresse. De-Slop: Brand-Label
 * statt dekorativem Käppchen, Mockup als Markup (kein KI-Bild).
 */

/** Eine Zeile im Newsletter-Mockup (Rubrik + Thema). */
function MockRow({ label, title }: { label: string; title: string }) {
  return (
    <div className="border-t border-border/70 pt-2.5">
      <div className="font-ui text-[10px] font-semibold uppercase tracking-[0.08em] text-brand">
        {label}
      </div>
      <div className="mt-0.5 font-sans text-[13px] leading-snug text-dark">
        {title}
      </div>
    </div>
  );
}

/** Stilisierte Beispielausgabe des Supertools-Newsletters. */
function NewsletterMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* angedeutete zweite Ausgabe dahinter für Tiefe */}
      <div
        aria-hidden
        className="absolute inset-x-5 -bottom-3 top-6 -rotate-2 rounded-2xl bg-white/70 shadow-[0_18px_40px_-30px_rgba(17,17,17,0.26)]"
      />
      <div className="relative rotate-1 rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_26px_55px_-30px_rgba(17,17,17,0.35)]">
        {/* Masthead */}
        <div className="flex items-center justify-between">
          <Logo variant="default" height={18} link={false} />
          <span className="font-ui text-[10.5px] font-medium text-soft">
            Ausgabe · KW 47
          </span>
        </div>

        <div className="mt-4 border-t border-border/70 pt-4">
          <div className="font-ui text-[10px] font-semibold uppercase tracking-[0.08em] text-soft">
            Diese Woche
          </div>
          <div className="mt-1 font-display text-[17px] leading-[1.15] text-dark">
            Das Wichtigste für Ihre Verwaltung
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <MockRow
            label="Tool der Woche"
            title="Online-Terminvergabe für den Bürgerservice"
          />
          <MockRow
            label="Geprüft"
            title="E-Akte: Hosting und DSGVO im Vergleich"
          />
          <MockRow
            label="Aus der Praxis"
            title="Doppik-Umstellung in der Kämmerei"
          />
        </div>

        <div className="mt-5 inline-flex items-center rounded-lg bg-brand px-3.5 py-1.5 font-ui text-[11.5px] font-semibold text-white">
          Zum Verzeichnis
        </div>
      </div>
    </div>
  );
}

export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="container mx-auto px-4 pt-6 sm:px-6 lg:px-10">
      <div className="overflow-hidden rounded-[2rem] bg-brand-light/60 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          {/* Text + Anmeldung */}
          <div>
            <span className="inline-flex items-center rounded-full bg-brand px-3.5 py-1 font-ui text-[12.5px] font-semibold tracking-wide text-white">
              Supertools Newsletter
            </span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,40px)] leading-[1.08] text-dark">
              Einmal pro Woche das Wichtigste für die Verwaltung.
            </h2>
            <p className="mt-4 max-w-xl font-sans text-[16px] leading-[1.6] text-mid">
              Neue Tools, geprüfte Einordnungen und konkrete Praxis für den
              Verwaltungsalltag, kuratiert von Menschen, die selbst aus Behörden
              kommen.
            </p>

            {submitted ? (
              <div
                role="status"
                className="mt-6 max-w-md rounded-2xl card-soft px-5 py-6 text-center font-sans text-[15px] text-brand-dark"
              >
                Danke. Die Bestätigung kommt gleich per E-Mail.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-2.5">
                <label
                  htmlFor="newsletter-band-email"
                  className="block font-ui text-[12px] font-medium text-soft"
                >
                  Ihre dienstliche E-Mail-Adresse
                </label>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <input
                    id="newsletter-band-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihr.name@kommune.de"
                    className="min-w-0 flex-1 rounded-xl border border-border bg-white px-4 py-3.5 font-sans text-[15px] text-dark placeholder:text-soft outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25"
                  />
                  <button
                    type="submit"
                    className="btn-key flex-shrink-0 rounded-xl bg-brand px-6 py-3.5 font-sans text-[15px] font-bold text-white hover:bg-brand-dark"
                  >
                    Anmelden
                  </button>
                </div>
                <p className="font-ui text-[11.5px] leading-[1.5] text-soft">
                  Ihre Adresse bleibt bei uns, jederzeit abbestellbar. Zur
                  Verarbeitung Ihrer Daten siehe Datenschutz.
                </p>
              </form>
            )}
          </div>

          {/* Mockup der Ausgabe */}
          <div className="lg:justify-self-end lg:w-full">
            <NewsletterMockup />
            <p className="mt-6 text-center font-ui text-[11px] text-soft">
              Beispielausgabe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
