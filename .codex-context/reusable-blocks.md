# Reusable Blocks: Wiederkehrende Payload Sektionen sauber modellieren

Dieses Runbook beschreibt, wann ein wiederkehrender Abschnitt als normaler Page-Block, als Global mit Placeholder-Block oder als wiederverwendbare Collection modelliert werden sollte.

Grundregel: Wenn derselbe Inhalt auf mehreren Seiten identisch erscheinen soll, darf er nicht mehrfach in jede Page kopiert werden. Die Seite steuert dann nur noch, ob, wo und mit welchen kleinen Anzeigeoptionen der Block erscheint.

---

## 1. Entscheidungsbaum

| Situation | Best Practice |
| --- | --- |
| Inhalt kommt nur einmal auf einer Seite vor | Normaler Page-Block |
| Gleiche Sektion soll auf vielen Seiten synchron gepflegt werden | Global + schlanker Placeholder-Block |
| Es gibt mehrere wiederverwendbare Varianten, z. B. mehrere CTAs oder Teaser | Collection `ReusableSections` + Relation-Block |
| Jede Seite braucht eigene Texte/Bilder | Normaler Page-Block, keine Synchronisierung |
| Nur Styling/Spacing unterscheidet sich | Global + Placeholder-Block mit Anzeigeoptionen |

Empfehlung fuer einen einzelnen zentralen Website-CTA wie `Lass uns reden`: Global + Placeholder-Block.

---

## 2. Pattern: Global + Placeholder-Block

Dieses Pattern nutzen, wenn eine Sektion zentral gepflegt, aber auf einzelnen Seiten individuell hinzugefuegt, entfernt oder verschoben werden soll.

Aufbau:

- Global, z. B. `SharedContactCTA`: enthaelt die echten Inhalte.
- Page-Block, z. B. `shared-contact-cta`: enthaelt keine kopierten Inhalte.
- Renderer: laedt die Global-Daten und rendert sie an der Position des Page-Blocks.
- Page Layout: Redakteure koennen den Placeholder pro Seite einfuegen, entfernen und sortieren.

Der Placeholder darf nur kleine Anzeigeoptionen enthalten:

- `hideTitle`
- `descriptionOverride`
- `spacingVariant`
- `backgroundVariant`

Keine vollstaendigen Duplikate von Titel, Karten, Kontaktpersonen, Bildern oder Links in den Placeholder kopieren.

---

## 3. Beispiel: Synchroner Kontakt-CTA

Global:

```ts
export const SharedContactCTA: GlobalConfig = {
  slug: "shared-contact-cta",
  label: "Lass uns reden CTA",
  fields: [
    { name: "title", type: "textarea", required: true },
    { name: "description", type: "textarea" },
    { name: "contacts", type: "array", fields: contactFields },
    { name: "team", type: "array", fields: teamFields },
  ],
};
```

Placeholder-Block:

```ts
export const SharedContactCTA: Block = {
  slug: "shared-contact-cta",
  interfaceName: "SharedContactCtaBlock",
  fields: [
    { name: "hideTitle", type: "checkbox", defaultValue: false },
    { name: "descriptionOverride", type: "textarea" },
  ],
};
```

Renderer:

```tsx
case "shared-contact-cta":
  return sharedContactCTA ? (
    <ContactCtaBlock
      {...sharedContactCTA}
      description={block.descriptionOverride || sharedContactCTA.description}
      hideTitle={block.hideTitle}
    />
  ) : null;
```

Wichtig: Den bestehenden visuellen Renderer wiederverwenden, damit Style und Animationen identisch bleiben.

---

## 4. Wann keine Synchronisierung?

Nicht zentralisieren, wenn:

- derselbe visuelle Block pro Seite bewusst andere Inhalte hat,
- Redakteure jede Seite unabhängig testen oder kampagnenartig pflegen sollen,
- ein Override fast alle Felder duplizieren wuerde,
- die Sektion nur zufaellig aehnlich aussieht, aber fachlich anders ist.

Wenn mehr als 2-3 Override-Felder noetig werden, ist meistens ein normaler Page-Block oder eine Reusable-Collection besser.

---

## 5. Migration bestehender duplizierter Blocks

Wenn ein Block bereits auf vielen Seiten als duplizierter Page-Block existiert:

1. Erste vorhandene Instanz als Quelle fuer das Global verwenden.
2. Global mit diesen Daten befuellen.
3. Duplizierte Page-Blocks durch Placeholder-Blocks ersetzen.
4. Abweichende Beschreibung nur als `descriptionOverride` uebernehmen.
5. Originalen Block als Legacy-/Custom-Fallback vorerst behalten.
6. Migration oder Import-Script kontrolliert ausfuehren und vorher Backup nach [backup-info.md](backup-info.md) erstellen.

Das Script darf nicht blind alle Inhalte ueberschreiben. Es sollte nur bekannte Blocktypen ersetzen und danach Counts ausgeben, z. B. `sharedContactBlocks`, `embeddedContactBlocks`, `globalContacts`, `globalTeam`.

---

## 6. Tests und Akzeptanz

Minimal pruefen:

- Global ist im Payload Admin zentral bearbeitbar.
- Page Layout zeigt nur den schlanken Placeholder.
- Placeholder kann pro Seite hinzugefuegt, entfernt und verschoben werden.
- Eine Global-Aenderung aktualisiert alle Seiten mit Placeholder.
- Eine Seite ohne Placeholder rendert den Block nicht.
- Bestehender Legacy-/Custom-Block funktioniert weiter.
- `npm run payload:types`, `npm run payload:importmap`, `npm run lint`, `npm run build` laufen.

Production-Hinweis: Vor einem Content-Migrationsscript immer Production DB und Media sichern. Schema-Migrationen gehoeren in Git; Content-Migrationen muessen bewusst gestartet werden.
