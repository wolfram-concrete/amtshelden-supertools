import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { RevealHeading } from "@/components/motion/RevealHeading";
import { directoryToolLogos } from "@/data/directory";

interface CaseTool {
  slug: string;
  name: string;
  provider: string;
}

interface AnwendungsBeispiel {
  kategorie: string;
  ausgangslage: string;
  loesung: string;
  klaeren: string;
  tool: CaseTool;
}

/**
 * Anwendungsbeispiele auf der Startseite (Wolfram-Zusatz + Christian 4.2).
 * Zeigt konkret, wie das Verzeichnis hilft: typische Behörden-Ausgangslage →
 * was diese Software-Art leistet → was vorab zu klären ist → ein passender
 * echter Anbieter aus dem Verzeichnis.
 *
 * Ehrlich: das sind typische Ausgangslagen + passende Anbieter, KEINE erfundene
 * Auftragsreferenz. Echte Praxisfälle (mit benannter Behörde) folgen separat.
 */
const beispiele: AnwendungsBeispiel[] = [
  {
    kategorie: "Barrierefreiheit · BITV 2.0",
    ausgangslage:
      "Der Webauftritt muss barrierefrei werden — die Frist läuft, aber niemand weiß, wo die konkreten Verstöße liegen.",
    loesung:
      "Software für digitale Barrierefreiheit prüft Webauftritte automatisiert gegen WCAG/BFSG, dokumentiert Fehler und Fortschritt — ergänzt um manuelle Prüfung.",
    klaeren:
      "Reicht das automatisierte Tool, oder braucht es zusätzlich eine Prüfung durch Betroffene? Wo werden die Daten verarbeitet?",
    tool: {
      slug: "eye-able-web-inclusion-gmbh",
      name: "Eye-Able",
      provider: "Web Inclusion GmbH",
    },
  },
  {
    kategorie: "Bürgerservice · OZG",
    ausgangslage:
      "Anträge kommen online an, werden aber ausgedruckt und per Hand weiterbearbeitet — der digitale Eindruck endet an der Amtstür.",
    loesung:
      "Portallösungen bilden Antragsstrecken nach FIM-Standard durchgängig ab und binden Fachverfahren, Bezahlung und Postfach an.",
    klaeren:
      "Sind die Prozesse hinter dem Antrag definiert? Welche Fachverfahren müssen angebunden werden?",
    tool: {
      slug: "ozg-portal",
      name: "OZG-Portal",
      provider: "Govman Digital",
    },
  },
  {
    kategorie: "Kommunikation · Social Media",
    ausgangslage:
      "Die Pressestelle bespielt mehrere Kanäle, Freigaben laufen über E-Mail — bei Vertretung oder im Krisenfall fehlt der Überblick.",
    loesung:
      "Social-Media-Management-Software bündelt Planung, mehrstufige Freigabe und Veröffentlichung an einem Ort und dokumentiert Vorgänge.",
    klaeren:
      "Können Freigabeprozesse mehrstufig abgebildet werden? Wo werden die Daten verarbeitet?",
    tool: {
      slug: "facelift-cloud-gmbh",
      name: "Facelift Cloud",
      provider: "Facelift GmbH",
    },
  },
];

function ToolChip({ tool }: { tool: CaseTool }) {
  const logo = directoryToolLogos[tool.slug];
  const initials = tool.name
    .split(/[\s/]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group mt-auto flex items-center gap-3 rounded-xl border border-border bg-cream/60 px-3.5 py-3 transition-colors hover:border-brand"
    >
      <span
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white"
        style={{ background: logo?.backgroundColor || "var(--color-brand)" }}
      >
        {logo?.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo.logoUrl}
            alt={`${tool.name} Logo`}
            className="h-7 w-7 rounded object-contain"
            loading="lazy"
          />
        ) : (
          <span className="font-ui text-[11px] font-extrabold text-white">
            {initials}
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-brand">
          Passend im Verzeichnis
        </span>
        <span className="block truncate font-serif text-[16px] font-normal text-dark transition-colors group-hover:text-brand-dark">
          {tool.name}
        </span>
      </span>
      <ArrowUpRight
        size={16}
        className="flex-shrink-0 text-soft transition-transform group-hover:translate-x-0.5 group-hover:text-brand-dark"
        aria-hidden
      />
    </Link>
  );
}

interface HomeCasesProps {
  eyebrow: string;
  title: string;
  lead?: string;
}

export function HomeCases({ eyebrow, title, lead }: HomeCasesProps) {
  return (
    <section className="bg-cream py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <header className="mb-9 max-w-2xl space-y-3 lg:mb-12">
          <div
            data-reveal
            className="flex items-center gap-2.5 font-sans text-[14px] font-semibold text-brand"
          >
            {eyebrow}
          </div>
          <RevealHeading
            as="h2"
            text={title}
            baseDelay={120}
            className="font-serif text-[clamp(28px,3.4vw,44px)] font-normal leading-[1.05] tracking-tight text-dark"
          />
          {lead && (
            <p
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              className="font-sans text-[16px] leading-[1.65] text-mid"
            >
              {lead}
            </p>
          )}
        </header>

        <div className="grid gap-5 lg:grid-cols-3">
          {beispiele.map((c, i) => (
            <article
              key={c.tool.slug}
              data-reveal="float"
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="flex flex-col rounded-2xl border border-border bg-white p-6"
            >
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">
                {c.kategorie}
              </div>
              <h3 className="mt-3 font-serif text-[20px] font-normal leading-[1.25] text-dark">
                {c.ausgangslage}
              </h3>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-soft">
                    Was Software leistet
                  </div>
                  <p className="mt-1 font-sans text-[13.5px] leading-[1.55] text-mid">
                    {c.loesung}
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-soft">
                    Vorab klären
                  </div>
                  <p className="mt-1 font-sans text-[13.5px] leading-[1.55] text-mid">
                    {c.klaeren}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-1 flex-col justify-end">
                <ToolChip tool={c.tool} />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 font-ui text-[11.5px] leading-[1.5] text-soft">
          Typische Ausgangslagen und passende Anbieter aus dem Verzeichnis — als
          Beispiel, keine Auftragsreferenz. Konkrete Praxisfälle mit benannter
          Verwaltung kennzeichnen wir separat.
        </p>
      </div>
    </section>
  );
}
