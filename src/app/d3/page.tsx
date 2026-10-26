import Image from "next/image";
import Link from "next/link";

import { directoryCategories } from "@/data/directory";

/**
 * Designthese B — Angleichung an das D3-Designsystem.
 * Gegenpol zur Foto-Bühne (These A, "/"): dieselbe Startseiten-Aufgabe (Suche +
 * Bereiche), aber in der D3-Formsprache — Bone-Grund, Indigo-Tinte, Gelb als
 * Signal, kondensierte Versal-Display, Mono-Labels, Hairline-Module, geom. Icon.
 * Reine Präsentationsschicht, nutzt die bestehende Verzeichnis-Datenbasis.
 */

const HAEUFIGE_SUCHEN = [
  "Projektmanagement",
  "Chatbot",
  "E-Akte",
  "Mitarbeiter-App",
  "Recruiting",
  "Bürgerdialog",
];

/** Geometrisches D3-Zeichen (16-Strahl-Stern aus der Formel). */
function D3Star({ className }: { className?: string }) {
  return (
    <svg
      className={`d3t-star ${className ?? ""}`}
      viewBox="0 0 100 100"
      role="img"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M50,0L59.95,25.98L85.36,14.64L74.02,40.05L100,50L74.02,59.95L85.36,85.36L59.95,74.02L50,100L40.05,74.02L14.64,85.36L25.98,59.95L0,50L25.98,40.05L14.64,14.64L40.05,25.98Z"
      />
    </svg>
  );
}

export default function D3ThesisPage() {
  const areas = directoryCategories.filter((c) => (c.toolCount ?? 0) > 0);

  return (
    <>
      {/* Topbar */}
      <header className="d3t-top">
        <span className="d3t-wordmark">
          <b>Supertools</b>
          <span className="d3t-label">by Amtshelden</span>
        </span>
        <nav className="d3t-nav">
          <Link href="/suche">Suche</Link>
          <a href="#bereiche">Bereiche</a>
          <Link href="/wissen">Wissen</Link>
          <Link href="/ueber">Über</Link>
        </nav>
      </header>

      {/* Hero — zweispaltig: Text + Suche links, ein ruhiges Bildmotiv rechts.
          Bewusst reduziert: ein Motiv, eckiger Hairline-Rahmen, kein Dekor. */}
      <section className="d3t-hero">
        <div className="d3t-hero-grid">
          <div className="d3t-hero-text">
            <span className="d3t-eyebrow">
              <D3Star />
              <span className="d3t-label">
                Software-Verzeichnis für die Verwaltung
              </span>
            </span>

            <h1 className="d3t-h1">
              Welche Software passt zu Ihrer <mark>Verwaltung?</mark>
            </h1>

            <p className="d3t-sub">
              Handverlesene Software für Behörden. Suchen Sie nach Aufgabe,
              Tool-Art oder Anbieter. Kuratiert, ehrlich eingeordnet. Kein
              Ranking, keine Sterne.
            </p>

            <form className="d3t-search" action="/suche" method="get">
              <input
                type="search"
                name="q"
                aria-label="Software suchen"
                placeholder="z. B. Projektmanagement, Chatbot, E-Akte"
              />
              <button type="submit">Suchen →</button>
            </form>

            <div className="d3t-common">
              <span className="d3t-label">Häufig gesucht</span>
              {HAEUFIGE_SUCHEN.map((term) => (
                <Link
                  key={term}
                  href={`/suche?q=${encodeURIComponent(term)}`}
                  className="d3t-chip"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>

          <figure className="d3t-figure">
            <Image
              src="/brand/generated/hero-verwaltung-quadrat.jpg"
              alt="Blick in eine moderne Verwaltung bei der Arbeit"
              fill
              sizes="(min-width: 900px) 42vw, 100vw"
              className="d3t-figure-img"
              priority
            />
          </figure>
        </div>
      </section>

      {/* Bereiche */}
      <section className="d3t-areas" id="bereiche">
        <div className="d3t-areas-head">
          <h2>Vier Bereiche</h2>
          <span className="d3t-label">{areas.length} Bereiche · ein Klick zum Tool</span>
        </div>

        <div className="d3t-grid">
          {areas.map((area, i) => (
            <Link
              key={area.slug}
              href={`/kategorien/${area.slug}`}
              className="d3t-mod"
            >
              <div className="d3t-mod-top">
                <D3Star />
                <span className="d3t-mod-no">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="d3t-mod-name">{area.name}</h3>
              {area.tagline && <p className="d3t-mod-tag">{area.tagline}</p>}
              <div className="d3t-mod-meta">
                <span className="n">{area.toolCount} Tools</span>
                <span className="arr" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer-Strip */}
      <footer className="d3t-foot">
        <span className="d3t-label">
          Amtshelden Supertools — Designthese B (D3)
        </span>
        <span className="d3t-label">Visueller Vergleich · Stand 26.10.2026</span>
      </footer>

      {/* These-Umschalter A ↔ B */}
      <div className="d3t-switch" aria-label="Designthese wechseln">
        <Link href="/">These A</Link>
        <Link href="/d3" className="is-active" aria-current="page">
          These B
        </Link>
      </div>
    </>
  );
}
