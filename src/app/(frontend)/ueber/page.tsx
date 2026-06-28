import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/site/Logo";

export const metadata: Metadata = {
  title: "Über uns — Supertools",
  description:
    "Wer hinter Supertools steht und warum wir Software für die Verwaltung anders kuratieren. Ein Schwesterprojekt von Amtshelden — der Plattform für digitalen Wandel in deutschen Behörden.",
};

export default function UeberPage() {
  return (
    <>
      {/* ============================================================
          1 — HERO (immersiv, analog zur Startseite — Gründer:innen-Motiv)
          ============================================================ */}
      <section className="bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-4 lg:pt-6 pb-10 lg:pb-14">
          <div className="relative flex items-center overflow-hidden rounded-3xl min-h-[560px] lg:min-h-[720px]">
            <Image
              src="/brand/amtshelden-gruender.jpg"
              alt="Julia und Christian, Gründungsteam von Amtshelden"
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
              priority
            />
            <div aria-hidden className="absolute inset-0 bg-black/15" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"
            />

            <div className="relative z-10 max-w-xl p-7 sm:p-10 lg:p-14">
              <h1 className="font-serif text-[clamp(34px,5vw,64px)] font-normal leading-[1.02] tracking-tight text-white">
                Vertrauen entsteht dort, wo Software{" "}
                <em className="not-italic font-medium text-brand-light">
                  ein Gesicht bekommt
                </em>
                .
              </h1>
              <p className="mt-5 font-sans text-[16px] lg:text-[18px] leading-[1.6] text-white/85">
                Supertools ist das Software-Schwesterprojekt von Amtshelden —
                der Plattform für digitalen Wandel in deutschen Behörden. Wir
                kuratieren die Werkzeuge, mit denen Verwaltungen diesen Wandel
                tatsächlich gestalten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2 — EDITORIAL: Warum wir das tun (mit Drop-Cap)
          ============================================================ */}
      <section className="bg-cream/40 border-b border-border">
        <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <header className="lg:col-span-5 space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                Warum es Supertools gibt
              </div>
              <h2 className="font-serif text-[clamp(28px,3.2vw,40px)] font-normal leading-[1.05] tracking-tight text-dark">
                Behörden haben kein Tool-Problem.<br />
                <em className="not-italic font-medium text-brand-dark">
                  Sie haben ein Orientierungsproblem.
                </em>
              </h2>
              <figure className="space-y-2 pt-2">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-white border border-border">
                  <Image
                    src="/brand/amtshelden/perspektive.png"
                    alt="Aus dem Amtshelden-Magazin: Behörden haben kein Content-Problem, sondern ein Perspektivproblem"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="font-ui text-[11px] italic text-soft">
                  Aus dem Amtshelden-Magazin · „Behörden haben kein Content-Problem"
                </figcaption>
              </figure>
            </header>

            <div className="lg:col-span-7 space-y-5 font-sans text-[17px] leading-[1.75] text-mid">
              <p className="first-letter:font-serif first-letter:italic first-letter:font-normal first-letter:text-[64px] first-letter:leading-[0.85] first-letter:mr-2 first-letter:float-left first-letter:pt-1 first-letter:text-brand-dark">
                Die deutsche Verwaltung digitalisiert sich. Nicht so schnell, wie
                Strategien es versprechen — aber spürbar, in vielen kleinen
                Bewegungen, oft trotz statt wegen der Rahmenbedingungen. In
                dieser Bewegung wird Software zur Hebelkraft. Und gleichzeitig
                zum Risiko.
              </p>
              <p>
                Wer im Hauptamt einer Kommune unter 30.000 Einwohnern eine
                neue Fachanwendung einführt, ist meist kein IT-Profi. Wer in
                einer Mittelbehörde über die nächste E-Akte entscheidet, hat
                selten Zeit für drei Anbieter-Demos. Und wer auf Ebene eines
                Landratsamts eine Vergabe formuliert, muss in vier Wochen
                wissen, was er auf eine Million Euro Budget setzen kann.
              </p>
              <p>
                Vorhandene Software-Verzeichnisse helfen diesen Menschen
                wenig. Capterra, G2, OMR Reviews — alle gut, alle nicht für
                den deutschen öffentlichen Sektor gebaut. Sterne, Rankings,
                bezahlte Platzierungen, Tech-Jargon, fehlende DSGVO-Tiefe.
                Und vor allem: keine Behörden­perspektive.
              </p>
              <p>
                Supertools schließt diese Lücke — nicht als weiteres
                Verzeichnis, sondern als kuratiertes Fachmagazin mit
                eingebettetem Verzeichnis. Wir prüfen jedes Tool aus der
                Sicht der Menschen, die es einführen werden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3 — DREI PRINZIPIEN (Source-Serif italic Akzente)
          ============================================================ */}
      <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <header className="border-t border-border pt-8 mb-12 lg:mb-16 max-w-2xl space-y-2">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Drei Grundsätze
          </div>
          <h2 className="font-serif text-[clamp(32px,3.8vw,48px)] font-normal leading-[1.0] tracking-tight text-dark">
            Was uns von einem Verzeichnis unterscheidet.
          </h2>
        </header>

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-3 relative">
          {[
            {
              number: "01",
              title: "Wir vergleichen nicht. Wir ordnen ein.",
              body: 'Keine Sterne, kein „bestes Tool"-Score, keine Rangliste. Wir nehmen jedes Tool für sich ernst — und beschreiben, für welche Behörde es passt und für welche nicht. Vergleichbarkeit ist eine Illusion, wenn Strukturen, Größen und Reifegrade so unterschiedlich sind wie in deutschen Verwaltungen.',
            },
            {
              number: "02",
              title: "Wir vertrauen Behörden, nicht Algorithmen.",
              body: "Unsere Tool-Profile entstehen aus Gesprächen mit Anbietern und mindestens drei Referenz-Behörden. Wir schreiben auf, was funktioniert hat — und was nicht. Niemand wird durch einen Score sortiert. Niemand erkauft sich eine bessere Platzierung.",
            },
            {
              number: "03",
              title: "Wir machen Software sichtbar, die taugt.",
              body: "Lieber 300 ernst gemeinte Profile als 3.000 oberflächliche. Wir verzichten auf Vollständigkeit zugunsten von Tiefe — denn wer eine Software einführt, trägt Verantwortung. Wir liefern die Substanz, die diese Verantwortung handhabbar macht.",
            },
          ].map((p, idx, arr) => (
            <article
              key={p.number}
              className={`space-y-3 md:relative ${
                idx > 0
                  ? "md:before:absolute md:before:top-0 md:before:bottom-0 md:before:-left-5 md:before:w-px md:before:bg-border"
                  : ""
              }`}
              data-count={arr.length}
            >
              <div className="font-serif italic text-[20px] text-soft">
                {p.number}.
              </div>
              <h3 className="font-serif text-[24px] font-normal leading-[1.1] text-dark">
                {p.title}
              </h3>
              <p className="font-sans text-[15px] leading-[1.7] text-mid">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================
          4 — DIE VERBINDUNG ZU AMTSHELDEN (grüne Highlight-Sektion)
          ============================================================ */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-brand-dark text-white my-6 lg:my-10">
        <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Logo
                variant="inverse"
                height={36}
                link={false}
                className="mb-2"
              />
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
                Schwesterprojekt von Amtshelden
              </div>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal leading-[1.02] tracking-tight">
                Eine Plattform.<br />
                Zwei Perspektiven auf denselben Wandel.
              </h2>
              <p className="font-sans text-[16px] leading-[1.7] text-white/85">
                Hinter Supertools steht Amtshelden — die Plattform für
                Inspiration, Austausch und Lernen rund um Verwaltungs­wandel.
                Was die einen zur Kultur sagen, sagen wir zur Technik.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://www.amtshelden.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl bg-white px-5 py-2.5 font-ui text-[13px] font-semibold text-brand-dark transition-colors hover:bg-cream"
                >
                  Zu Amtshelden →
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center rounded-xl border border-white/35 px-5 py-2.5 font-ui text-[13px] font-medium text-white transition-colors hover:bg-white/10"
                >
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {[
                {
                  label: "Amtshelden",
                  title: "Kultur, Kommunikation, Haltung.",
                  body: 'Beratung, Webinare, KI-Führerschein, Amtfluencer-Programm, die Connected-Konferenz — alles zum Thema „Wie verändert sich Verwaltung von innen?".',
                  href: "https://www.amtshelden.de",
                  external: true,
                  image: "/brand/amtshelden/kultur.png",
                  imageAlt: "Amtshelden-Artikel zu Kultur in der Verwaltung",
                },
                {
                  label: "Supertools",
                  title: "Werkzeuge, Verzeichnis, Tiefe.",
                  body: "Kuratiertes Software-Magazin: welche Tools taugen tatsächlich für deutsche Verwaltungen, warum, für wen — und wer dahinter steht.",
                  href: "/",
                  external: false,
                  image: null,
                  imageAlt: null,
                },
                {
                  label: "Gemeinsamer Anspruch",
                  title: "Ehrlichkeit über Vollständigkeit.",
                  body: "Wir nehmen Behörden ernst. Das heißt auch: wir sagen klar, was nicht funktioniert, statt jedes Angebot positiv zu rahmen.",
                  href: null,
                  external: false,
                  image: "/brand/amtshelden/vertrauen.png",
                  imageAlt: "Amtshelden-Artikel zu Vertrauen in der Verwaltung",
                },
                {
                  label: "Gemeinsame Community",
                  title: "12.000+ Verwaltungsprofis.",
                  body: "Newsletter, Podcast, Konferenz, Webinare — eine Community von Menschen, die digitale Verwaltung von innen heraus mitgestalten.",
                  href: "https://www.amtshelden.de",
                  external: true,
                  image: "/brand/amtshelden/connected2026.png",
                  imageAlt: "Amtshelden Connected-Konferenz 2026",
                },
              ].map((entry, idx) => {
                const inner = (
                  <>
                    {entry.image && (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-white/10 mb-4">
                        <Image
                          src={entry.image}
                          alt={entry.imageAlt || entry.label}
                          fill
                          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">
                      {entry.label}
                    </div>
                    <h3 className="font-serif text-[22px] font-normal leading-[1.15] mt-2">
                      {entry.title}
                    </h3>
                    <p className="font-sans text-[14px] leading-[1.7] text-white/85 mt-2">
                      {entry.body}
                    </p>
                  </>
                );
                const baseClass = "block transition-opacity";
                if (!entry.href) {
                  return (
                    <div key={idx} className={baseClass}>
                      {inner}
                    </div>
                  );
                }
                if (entry.external) {
                  return (
                    <a
                      key={idx}
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClass} hover:opacity-90`}
                    >
                      {inner}
                    </a>
                  );
                }
                return (
                  <Link
                    key={idx}
                    href={entry.href}
                    className={`${baseClass} hover:opacity-90`}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5 — REDAKTIONELLE METHODIK / WIE WIR ARBEITEN
          ============================================================ */}
      <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <header className="lg:col-span-5 space-y-3 lg:sticky lg:top-24 lg:self-start">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              Wie wir arbeiten
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-normal leading-[1.02] tracking-tight text-dark">
              Redaktionell.<br />
              Konsequent.<br />
              <em className="not-italic font-medium text-brand-dark">
                Aus Behörden­perspektive.
              </em>
            </h2>
            <p className="font-sans text-[15px] leading-[1.7] text-mid pt-2">
              Wir nutzen das gleiche redaktionelle Handwerk wie ein gutes
              Fachmagazin: Recherche, Quellenarbeit, Gegenrecherche, Haltung.
              Tools werden nicht beworben, sondern beschrieben.
            </p>
          </header>

          <ul className="lg:col-span-7 divide-y divide-border border-y border-border">
            {[
              {
                title: "Gespräch mit dem Anbieter — auch über die Grenzen",
                body: "Wer nicht ehrlich über Schwächen redet, kommt nicht ins Verzeichnis. Wir fragen ausdrücklich, was nicht zur Behörde X passt — und schreiben es auf.",
              },
              {
                title: "Mindestens drei Referenz-Behörden",
                body: "Direkt befragt, nicht aus PR-Material zitiert. Wir wollen wissen, was bei der Einführung schwierig war — nicht nur, was am Ende geglückt ist.",
              },
              {
                title: "Compliance-Audit",
                body: "DSGVO, Serverstandort, BSI, Vergabeeignung — schriftlich nachgewiesen, im Profil dokumentiert. Wir reichen nichts weiter, was wir nicht selbst gesehen haben.",
              },
              {
                title: "Redaktionelles Urteil",
                body: "Erst dann schreibt unsere Redaktion das Profil — aus Behörden­perspektive, mit ehrlicher Für-wen-geeignet- und Für-wen-nicht-Einordnung.",
              },
            ].map((step, idx) => (
              <li key={idx} className="py-6 flex gap-5">
                <div className="font-serif italic text-soft text-[20px] flex-shrink-0 min-w-[44px]">
                  {String(idx + 1).padStart(2, "0")}.
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-[20px] font-normal leading-[1.2] text-dark">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14.5px] leading-[1.7] text-mid mt-2">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================
          6 — TEAM / SITZ
          ============================================================ */}
      <section className="bg-cream/40 border-y border-border">
        <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-3">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                Wer wir sind
              </div>
              <h2 className="font-serif text-[clamp(28px,3.2vw,40px)] font-normal leading-[1.02] tracking-tight text-dark">
                Frankfurt am Main.<br />
                Eine Redaktion mit Verwaltungs-Background.
              </h2>
            </div>
            <div className="space-y-5 font-sans text-[16px] leading-[1.7] text-mid">
              <p>
                Hinter Amtshelden und Supertools stehen{" "}
                <strong className="font-semibold text-dark">
                  Julia und Christian
                </strong>
                {" "}— zusammen mit einer Redaktion aus Menschen, die selbst
                aus der Verwaltung kommen oder lange mit ihr gearbeitet haben.
                Volljuristinnen, ehemalige CIOs, Hauptamtsleiter im Ruhestand,
                kommunale Pressereferentinnen.
              </p>
              <p>
                Wir sitzen in Frankfurt am Main, arbeiten aber bundesweit. Was
                uns verbindet, ist eine ziemlich einfache Überzeugung: Wenn
                der digitale Wandel in der Verwaltung gelingen soll, dann
                braucht es Substanz statt Slogans. Vertrauen statt Skala.
                Haltung statt Wachstumsdruck.
              </p>
              <p className="font-serif italic text-[18px] text-dark pt-2 border-t border-border">
                „Kultur entscheidet, ob Veränderung in der Verwaltung
                überhaupt ankommt." — Amtshelden
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7 — CTA
          ============================================================ */}
      <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Mitmachen
          </div>
          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal leading-[1.02] tracking-tight text-dark">
            Wenn du Verantwortung trägst, wollen wir dich nicht alleine
            lassen.
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-mid">
            Wir freuen uns über Implementierungs­berichte, Themen­vorschläge,
            Korrekturen und ehrliche Kritik. Schreib uns — oder abonniere
            den Newsletter, dann verpasst du nichts.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/kontakt"
              className="inline-flex items-center rounded-xl bg-brand px-6 py-3 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Kontakt aufnehmen
            </Link>
            <Link
              href="/#newsletter"
              className="inline-flex items-center rounded-xl border border-border px-6 py-3 font-ui text-[14px] font-medium text-mid transition-colors hover:bg-cream hover:text-dark"
            >
              Newsletter abonnieren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
