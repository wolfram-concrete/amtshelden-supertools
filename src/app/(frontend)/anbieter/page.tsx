import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  FileSearch,
  MessageSquare,
  Radar,
  Target,
  Users,
} from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { themenfelder } from "@/mocks/themenfelder";

export const metadata: Metadata = {
  title: "Für Anbieter — Supertools",
  description:
    "Erreichen Sie genau die Behörden, für die Ihr Produkt relevant ist. Supertools ist das kuratierte Software-Verzeichnis für die öffentliche Verwaltung — Reichweite B2G ohne Streuverlust.",
};

const vorteile = [
  {
    icon: Radar,
    title: "Reichweite B2G ohne Streuverlust",
    body: "Sie erreichen Behörden, die bereits mit einer konkreten Suchabsicht unterwegs sind — nicht die breite Masse, sondern genau Ihre Zielgruppe.",
  },
  {
    icon: Target,
    title: "Positionierung im Themenfeld",
    body: "Ihr Produkt erscheint dort, wo es thematisch hingehört — in einem der vier Themenfelder, in denen Amtshelden für Behörden relevant ist.",
  },
  {
    icon: MessageSquare,
    title: "Erklärungsfläche für komplexe Produkte",
    body: "Verwaltungssoftware ist erklärungsbedürftig. Hier haben Sie Raum, verständlich darzulegen, was Ihr Produkt für Behörden konkret leistet.",
  },
  {
    icon: FileSearch,
    title: "Auffindbarkeit über SEO/GEO",
    body: "Quellenbasierte, strukturierte Profile sind für Suchmaschinen und KI-Suchen gut auffindbar — Ihre Sichtbarkeit im Behördenmarkt steigt.",
  },
  {
    icon: BarChart3,
    title: "Qualifizierte Kontakte & Leads",
    body: "Anfragen kommen von Menschen, die sich aktiv mit Ihrem Themenfeld beschäftigen. Reichweite ist gut — auf Dauer zählt Messbarkeit.",
  },
  {
    icon: Users,
    title: "Teil eines glaubwürdigen Ökosystems",
    body: "Amtshelden bringt Vertrauen in der Behördenwelt mit. Als Teil dieses Ökosystems profitieren Sie von dieser Glaubwürdigkeit.",
  },
];

export default function AnbieterPage() {
  return (
    <>

      {/* ── 1 · HERO (immersiv, radiale Kanten — analog Startseite) ── */}
      <section className="bg-white">
        <div className="container mx-auto px-6 lg:px-10 pt-16 pb-10 lg:pt-24 lg:pb-14">
          <div className="max-w-3xl">
            <h1
              data-reveal
              className="font-sans font-bold text-[clamp(36px,5.5vw,68px)] leading-[1.02] tracking-[-0.03em] text-dark"
            >
              Erreichen Sie genau die Behörden, für die Ihr Produkt{" "}
              <span className="text-brand">relevant ist</span>.
            </h1>
            <p
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
              className="mt-5 max-w-2xl font-sans text-[18px] lg:text-[20px] leading-[1.55] text-mid"
            >
              Supertools ist das kuratierte Software-Verzeichnis für die
              öffentliche Verwaltung. Während klassische B2B-Werbung breit streut,
              erreichen Sie hier Behörden mit konkreter Suchabsicht.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kontakt?topic=anbieter"
                className="inline-flex items-center rounded-xl bg-brand px-6 py-3 font-sans text-[14px] font-bold text-white transition-colors hover:bg-brand-dark"
              >
                Unternehmen eintragen
              </Link>
              <Link
                href="#profilarten"
                className="inline-flex items-center rounded-xl border border-border px-6 py-3 font-sans text-[14px] font-semibold text-dark transition-colors hover:border-brand hover:text-brand-dark"
              >
                Wie funktioniert das?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · VORTEILE ── */}
      <section className="bg-cream/40 border-b border-border">
        <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <header className="max-w-2xl space-y-3 mb-12 lg:mb-16">
            <div
              data-reveal
              className="font-sans font-semibold text-brand"
            >
              Ihr Nutzen
            </div>
            <RevealHeading
              as="h2"
              text="Sichtbarkeit, die zur Verwaltung passt."
              baseDelay={120}
              className="font-sans text-[clamp(32px,3.8vw,48px)] font-normal leading-[1.0] tracking-tight text-dark"
            />
          </header>

          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {vorteile.map((v) => {
              const Icon = v.icon;
              return (
                <article key={v.title} className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
                    <Icon size={18} aria-hidden />
                  </div>
                  <h3 className="font-sans text-[20px] font-normal leading-tight text-dark">
                    {v.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-[1.65] text-mid">
                    {v.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3 · THEMENFELDER ── */}
      <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <header className="lg:sticky lg:top-24 space-y-3">
            <div
              data-reveal
              className="font-sans font-semibold text-brand"
            >
              Themenfelder
            </div>
            <RevealHeading
              as="h2"
              text="Vier Felder, in denen Behörden Sie suchen."
              baseDelay={120}
              className="font-sans text-[clamp(28px,3.5vw,42px)] font-normal leading-[1.02] tracking-tight text-dark"
            />
            <p
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
              className="font-sans text-[15px] leading-[1.7] text-mid pt-2"
            >
              Wir nehmen nicht jede Software auf, sondern Tools, die in den
              Themenfeldern von Amtshelden für Behörden relevant sind. Passt
              Ihr Produkt in eines dieser Felder?
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-4">
            {themenfelder.map((tf) => (
              <div
                key={tf.slug}
                className="rounded-xl border border-border bg-white p-5"
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand-dark"
                >
                  {tf.icon && <BrandIcon name={tf.icon} size={20} />}
                </span>
                <h3 className="mt-3 font-sans text-[18px] font-normal leading-tight text-dark">
                  {tf.name}
                </h3>
                <p className="mt-1.5 font-sans text-[13px] leading-[1.55] text-soft">
                  {tf.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · PROFILARTEN ── */}
      <section
        id="profilarten"
        className="bg-cream/40 border-y border-border scroll-mt-24"
      >
        <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <header className="max-w-2xl space-y-3 mb-12">
            <div
              data-reveal
              className="font-sans font-semibold text-brand"
            >
              Profilarten
            </div>
            <RevealHeading
              as="h2"
              text="Basis-Profil und erweitertes Profil."
              baseDelay={120}
              className="font-sans text-[clamp(32px,3.8vw,48px)] font-normal leading-[1.0] tracking-tight text-dark"
            />
          </header>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Basis */}
            <div className="rounded-2xl border border-border bg-white p-7 lg:p-8">
              <div className="font-sans font-semibold text-soft">
                Basis-Profil
              </div>
              <div className="mt-2 font-sans text-[28px] font-normal text-dark">
                Kostenfrei
              </div>
              <p className="mt-3 font-sans text-[14px] leading-[1.65] text-mid">
                Aus öffentlich verfügbaren Quellen erstellt und redaktionell
                strukturiert. Für jedes relevante Tool — auch ohne Ihr Zutun.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Standardisierte Basisinformationen",
                  "Einordnung in Themenfeld und Kategorie",
                  "Quellenbasiert, mit Prüfdatum",
                  "Korrektur jederzeit anfragbar",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 mt-0.5 text-brand"
                      aria-hidden
                    />
                    <span className="font-sans text-[14px] text-mid">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Erweitert */}
            <div className="rounded-2xl border-2 border-brand bg-white p-7 lg:p-8">
              <div className="font-sans font-semibold text-brand-dark">
                Erweitertes Profil
              </div>
              <div className="mt-2 font-sans text-[28px] font-normal text-dark">
                Auf Anfrage
              </div>
              <p className="mt-3 font-sans text-[14px] leading-[1.65] text-mid">
                Tiefere Darstellung für erklärungsbedürftige Produkte — mehr
                Raum, Ihr Angebot für Behörden verständlich zu machen.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Ausführlichere Produktbeschreibung",
                  "Konkrete Use Cases & Einsatzszenarien",
                  "Cases / Referenzen aus Behörden",
                  "Direkter Ansprechpartner & Kontaktwege",
                  "Demo- oder Angebotsanfrage",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 mt-0.5 text-brand-dark"
                      aria-hidden
                    />
                    <span className="font-sans text-[14px] text-mid">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Transparenz-Hinweis */}
          <div className="mt-8 max-w-3xl rounded-xl border border-dashed border-border bg-white px-5 py-4">
            <p className="font-sans text-[14px] leading-[1.65] text-mid">
              <strong className="text-dark font-semibold">Wichtig:</strong>{" "}
              Ein erweitertes Profil ist keine bessere Bewertung und keine
              Empfehlung. Es ist ausführlicher, wird aber nicht bevorzugt
              dargestellt. Unser Verkaufsversprechen lautet:{" "}
              <em className="not-italic font-normal text-brand-dark">
                Je besser Ihr Profil erklärt, was Ihr Produkt für Behörden
                leistet, desto leichter können Behörden einschätzen, ob es
                passt.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* ── 5 · WAS AMTSHELDEN ÜBERNIMMT ── */}
      <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <header className="lg:col-span-5 lg:sticky lg:top-24 space-y-3">
            <div
              data-reveal
              className="font-sans font-semibold text-brand"
            >
              Was wir übernehmen
            </div>
            <RevealHeading
              as="h2"
              text="Wir recherchieren, strukturieren und prüfen."
              baseDelay={120}
              className="font-sans text-[clamp(28px,3.5vw,42px)] font-normal leading-[1.02] tracking-tight text-dark"
            />
            <p
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
              className="font-sans text-[15px] leading-[1.7] text-mid pt-2"
            >
              Amtshelden tritt nicht als Bewerter auf, sondern macht
              Informationen vergleichbar — aus Behördenperspektive, in einer
              einheitlichen Struktur.
            </p>
          </header>

          <ul className="lg:col-span-7 divide-y divide-border border-y border-border">
            {[
              {
                t: "Öffentlich verfügbare Informationen sammeln",
                d: "Wir tragen zusammen, was zu Ihrem Tool öffentlich auffindbar ist.",
              },
              {
                t: "Anbieterinformationen auswerten",
                d: "Ihre Angaben werten wir aus und bringen sie in unsere Struktur.",
              },
              {
                t: "Profile in eine einheitliche Struktur bringen",
                d: "Jedes Tool wird gleich aufgebaut — gleiche Kriterien, gleiche Tiefe.",
              },
              {
                t: "Fehlende Informationen sichtbar machen",
                d: "Was wir nicht prüfen konnten, benennen wir offen.",
              },
              {
                t: "Thematisch einordnen",
                d: "Ihr Tool erscheint im passenden Themenfeld und in der passenden Kategorie.",
              },
            ].map((step, idx) => (
              <li key={idx} className="py-5 flex gap-5">
                <span className="font-sans italic text-soft text-[18px] flex-shrink-0 min-w-[40px]">
                  {String(idx + 1).padStart(2, "0")}.
                </span>
                <div>
                  <h3 className="font-sans text-[18px] font-normal leading-tight text-dark">
                    {step.t}
                  </h3>
                  <p className="font-sans text-[14px] leading-[1.6] text-mid mt-1">
                    {step.d}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 6 · CTA (grün, radiale Kanten) ── */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-brand-dark text-white my-6 lg:my-10">
        <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="max-w-2xl">
            <div className="max-w-2xl space-y-6">
              <div
                data-reveal
                className="font-sans font-semibold text-white/80"
              >
                Nächster Schritt
              </div>
              <RevealHeading
                as="h2"
                text="Bringen Sie Ihr Tool ins Verzeichnis."
                baseDelay={120}
                className="font-sans text-[clamp(32px,4vw,56px)] font-normal leading-[1.0] tracking-tight"
              />
              <p
                data-reveal
                style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
                className="font-sans text-[16px] leading-[1.7] text-white/85"
              >
                Erzählen Sie uns von Ihrem Produkt. Wir prüfen, ob es in eines
                unserer Themenfelder passt, und legen ein quellenbasiertes Profil
                an. Ob erweitert oder Basis — Sie entscheiden.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/kontakt?topic=anbieter"
                  className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-ui text-[14px] font-semibold text-brand-dark transition-colors hover:bg-cream"
                >
                  Unternehmen eintragen
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center rounded-xl border border-white/35 px-6 py-3 font-ui text-[14px] font-medium text-white transition-colors hover:bg-white/10"
                >
                  Fragen? Kontakt aufnehmen
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
