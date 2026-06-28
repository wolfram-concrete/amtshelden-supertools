import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung gemäß § 5 DDG (TMG).",
};

/** Hervorhebung für noch zu ergänzende, rechtlich erforderliche Angaben. */
function Fill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-accent/30 px-1 font-medium text-dark">
      {children}
    </span>
  );
}

export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <div className="max-w-3xl">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          Rechtliches
        </div>
        <h1 className="mt-3 font-serif text-[clamp(34px,4.4vw,56px)] font-normal leading-[1.05] tracking-tight text-dark">
          Impressum
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-soft">
          Stand: Juni 2026
        </p>

        <div className="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-4 font-sans text-[14px] leading-[1.6] text-mid">
          <strong className="text-dark">Hinweis (Entwurf):</strong> Supertools
          ist ein Projekt von Amtshelden. Die{" "}
          <span className="font-medium">gelb markierten</span> Pflichtangaben
          (Firmierung, Anschrift, Vertretung, Register, USt-IdNr.) sind noch zu
          ergänzen und vor dem produktiven Einsatz rechtlich zu prüfen.
        </div>

        <div className="mt-10 space-y-9 font-sans text-[15.5px] leading-[1.75] text-mid">
          <section className="space-y-2">
            <h2 className="font-serif text-[22px] font-normal text-dark">
              Angaben gemäß § 5 DDG
            </h2>
            <p>
              Supertools — kuratiertes Software-Verzeichnis für die öffentliche
              Verwaltung. Ein Projekt von Amtshelden.
            </p>
            <p>
              <Fill>[Firmierung / Rechtsform, z. B. Amtshelden GmbH]</Fill>
              <br />
              <Fill>[Straße und Hausnummer]</Fill>
              <br />
              <Fill>[PLZ Ort]</Fill>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-[22px] font-normal text-dark">
              Vertreten durch
            </h2>
            <p>
              <Fill>[Vertretungsberechtigte Person(en) / Geschäftsführung]</Fill>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-[22px] font-normal text-dark">
              Kontakt
            </h2>
            <p>
              Telefon: +49 69 87003372
              <br />
              E-Mail:{" "}
              <a
                href="mailto:hallo@amtshelden.de"
                className="text-brand-dark underline underline-offset-2 hover:text-brand"
              >
                hallo@amtshelden.de
              </a>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-[22px] font-normal text-dark">
              Registereintrag &amp; Umsatzsteuer
            </h2>
            <p>
              Registergericht: <Fill>[Amtsgericht …]</Fill>
              <br />
              Registernummer: <Fill>[HRB …]</Fill>
              <br />
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:{" "}
              <Fill>[DE …]</Fill>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-[22px] font-normal text-dark">
              Redaktionell verantwortlich (§ 18 Abs. 2 MStV)
            </h2>
            <p>
              <Fill>[Name, Anschrift der verantwortlichen Person]</Fill>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-[22px] font-normal text-dark">
              Verbraucherstreitbeilegung
            </h2>
            <p>
              Hinweis gemäß Art. 14 Abs. 1 ODR-VO und § 36 VSBG: Zur Teilnahme an
              einem Streitbeilegungsverfahren vor einer
              Verbraucher­schlichtungs­stelle sind wir nicht verpflichtet und
              nicht bereit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-[22px] font-normal text-dark">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-[22px] font-normal text-dark">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber
              verantwortlich.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-[22px] font-normal text-dark">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge
              Dritter sind als solche gekennzeichnet.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
