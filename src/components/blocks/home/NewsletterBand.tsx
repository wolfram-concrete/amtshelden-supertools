"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

/**
 * Newsletter-Hinweis über dem Footer (Wolfram 27.10.). Ruhiger, plakativer
 * Block, der zur Anmeldung einlädt, ohne Werbedruck. Sie-Ansprache, ehrliche
 * Zusage (kein Verkauf der Adresse). Übergang hell → dunkler Footer.
 */
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
      <div className="overflow-hidden rounded-[2rem] border border-brand/15 bg-brand-light/50 px-6 py-12 sm:px-10 lg:px-14 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Text */}
          <div>
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-brand" aria-hidden />
              <span className="font-sans font-semibold text-brand">
                Newsletter
              </span>
            </div>
            <h2 className="mt-3 font-display text-[clamp(26px,3.2vw,40px)] leading-[1.08] text-dark">
              Einmal pro Woche das Wichtigste für die Verwaltung.
            </h2>
            <p className="mt-4 max-w-xl font-sans text-[16px] leading-[1.6] text-mid">
              Neue Tools, geprüfte Einordnungen und konkrete Praxis, kuratiert
              von Menschen, die aus der Verwaltung kommen. Kein Werbe-Newsletter,
              keine Weitergabe Ihrer Adresse.
            </p>
          </div>

          {/* Form */}
          <div className="lg:justify-self-end lg:w-full lg:max-w-md">
            {submitted ? (
              <div
                role="status"
                className="rounded-2xl border border-brand bg-white px-5 py-6 text-center font-sans text-[15px] text-brand-dark"
              >
                Danke. Die Bestätigung kommt gleich per E-Mail.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
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
                    className="flex-shrink-0 rounded-xl bg-brand px-6 py-3.5 font-sans text-[15px] font-bold text-white transition-colors hover:bg-brand-dark"
                  >
                    Anmelden
                  </button>
                </div>
                <p className="font-ui text-[11.5px] leading-[1.5] text-soft">
                  Jederzeit abbestellbar. Zur Verarbeitung Ihrer Daten siehe
                  Datenschutz.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
