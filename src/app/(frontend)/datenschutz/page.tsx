import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten nach DSGVO.",
};

function Fill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-accent/30 px-1 font-medium text-dark">
      {children}
    </span>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="font-serif text-[22px] font-normal text-dark">{title}</h2>
      {children}
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <div className="max-w-3xl">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          Rechtliches
        </div>
        <h1 className="mt-3 font-serif text-[clamp(34px,4.4vw,56px)] font-normal leading-[1.05] tracking-tight text-dark">
          Datenschutzerklärung
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-soft">
          Stand: Juni 2026
        </p>

        <div className="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-4 font-sans text-[14px] leading-[1.6] text-mid">
          <strong className="text-dark">Hinweis (Entwurf):</strong> Diese
          Erklärung beschreibt die Datenverarbeitung der Website Supertools. Die{" "}
          <span className="font-medium">gelb markierten</span> Angaben des
          Verantwortlichen sind zu ergänzen; vor produktivem Einsatz bitte
          rechtlich prüfen lassen.
        </div>

        <div className="mt-10 space-y-9 font-sans text-[15.5px] leading-[1.75] text-mid">
          <Section title="1. Verantwortlicher">
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website im
              Sinne von Art. 4 Nr. 7 DSGVO ist der Betreiber von Supertools, ein
              Projekt von Amtshelden:
            </p>
            <p>
              <Fill>[Firmierung / Anschrift — siehe Impressum]</Fill>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:datenschutz@amtshelden.de"
                className="text-brand-dark underline underline-offset-2 hover:text-brand"
              >
                datenschutz@amtshelden.de
              </a>
            </p>
          </Section>

          <Section title="2. Hosting">
            <p>
              Diese Website wird bei der Vercel Inc. (340 S Lemon Ave #4133,
              Walnut, CA 91789, USA) gehostet. Beim Aufruf der Seiten verarbeitet
              Vercel technisch notwendige Verbindungsdaten (u. a. IP-Adresse) zur
              Auslieferung der Inhalte. Rechtsgrundlage ist unser berechtigtes
              Interesse an einem sicheren, performanten Betrieb (Art. 6 Abs. 1
              lit. f DSGVO). Mit Vercel besteht ein Auftragsverarbeitungsvertrag;
              für Übermittlungen in die USA werden die EU-Standardvertragsklauseln
              herangezogen.
            </p>
          </Section>

          <Section title="3. Server-Logfiles">
            <p>
              Der Hosting-Provider erhebt automatisch Informationen in
              Server-Logfiles, die Ihr Browser übermittelt: Browsertyp und
              -version, verwendetes Betriebssystem, Referrer-URL, Uhrzeit der
              Anfrage und IP-Adresse. Diese Daten werden nicht mit anderen
              Datenquellen zusammengeführt und dienen der technischen Bereitstellung
              und Sicherheit (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </Section>

          <Section title="4. Cookies & Reichweitenmessung">
            <p>
              Supertools setzt keine Tracking- oder Marketing-Cookies und keine
              Drittanbieter-Analyse-Tools ein. Es werden ausschließlich technisch
              notwendige Daten verarbeitet. Bild- und Medieninhalte werden über
              unsere eigene Bildoptimierung von unserer Domain ausgeliefert; es
              findet kein direkter Verbindungsaufbau zu Dritt-Bildquellen statt.
            </p>
          </Section>

          <Section title="5. Newsletter">
            <p>
              Wenn Sie unseren Newsletter abonnieren, verarbeiten wir Ihre
              E-Mail-Adresse zum Versand. Die Anmeldung erfolgt im
              Double-Opt-in-Verfahren. Rechtsgrundlage ist Ihre Einwilligung
              (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit mit Wirkung für die
              Zukunft widerrufen können — z. B. über den Abmeldelink in jeder
              E-Mail.
            </p>
          </Section>

          <Section title="6. Kontaktaufnahme & Formulare">
            <p>
              Wenn Sie uns kontaktieren oder ein Formular nutzen („Tool
              vorschlagen", „Daten veraltet?", Anbieter-/Kontaktanfrage),
              verarbeiten wir die von Ihnen gemachten Angaben zur Bearbeitung
              Ihres Anliegens. Rechtsgrundlage ist unser berechtigtes Interesse
              bzw. die Anbahnung/Erfüllung eines Vertrags (Art. 6 Abs. 1 lit. f
              bzw. lit. b DSGVO). Anfragen mit Bezug zu Software-Anbietern können
              im Rahmen der Vermittlung an Amtshelden weitergegeben werden.
            </p>
          </Section>

          <Section title="7. Ihre Rechte">
            <p>Sie haben im Rahmen der DSGVO insbesondere das Recht auf:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Auskunft über die zu Ihnen gespeicherten Daten (Art. 15),</li>
              <li>Berichtigung unrichtiger Daten (Art. 16),</li>
              <li>Löschung (Art. 17) und Einschränkung der Verarbeitung (Art. 18),</li>
              <li>Datenübertragbarkeit (Art. 20),</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21),</li>
              <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3).</li>
            </ul>
            <p>
              Wenden Sie sich dazu an{" "}
              <a
                href="mailto:datenschutz@amtshelden.de"
                className="text-brand-dark underline underline-offset-2 hover:text-brand"
              >
                datenschutz@amtshelden.de
              </a>
              .
            </p>
          </Section>

          <Section title="8. Beschwerderecht">
            <p>
              Ihnen steht ein Beschwerderecht bei einer
              Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat
              Ihres Aufenthaltsorts oder des Orts des mutmaßlichen Verstoßes.
            </p>
          </Section>

          <Section title="9. Aktualität dieser Erklärung">
            <p>
              Wir passen diese Datenschutzerklärung an, sobald Änderungen der
              Verarbeitung dies erforderlich machen. Es gilt die jeweils auf
              dieser Seite veröffentlichte Fassung.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
