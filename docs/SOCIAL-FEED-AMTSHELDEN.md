# Amtshelden Social Feed

Die Startseiten-Section nutzt nach außen weiter die bekannten Amtshelden-Texte
und Follow-Links. Nur die Karten darunter sind als swipebarer Social Feed
angelegt.

## Quellen

- Instagram öffentlich: `https://www.instagram.com/amtshelden/`
- LinkedIn öffentlich: `https://www.linkedin.com/company/86876852/`
- LinkedIn intern/Admin: `https://www.linkedin.com/company/86876852/admin/feed/posts/`
- LinkedIn Organization ID: `86876852`

Der Admin-Link ist nur fuer Redaktion und Import-Kontext gedacht. Oeffentliche
Links auf der Website zeigen auf die normale Company-Seite bzw. konkrete Posts.

## Frontend-Datenfluss

- Fallback/kuratierte Daten: `src/mocks/social.ts`
- Generierte Importdaten: `src/mocks/social-import.generated.ts`
- Wenn `importedSocialFeed` Eintraege enthaelt, werden diese im Frontend genutzt.
- Wenn keine Importdaten vorhanden sind, bleibt der kuratierte Fallback sichtbar.

## Import

```bash
npm run import:social
```

Ohne Tokens aendert der Importer keine Dateien und zeigt nur die benoetigten
Variablen an.

### Instagram

Benötigt einen Instagram Business/Creator Account mit Graph-API-Zugang.

```bash
INSTAGRAM_USER_ID=...
INSTAGRAM_ACCESS_TOKEN=...
npm run import:social
```

Der Import nutzt Media-Felder wie `caption`, `media_type`, `media_url`,
`thumbnail_url`, `permalink` und `timestamp`.

### LinkedIn

Benötigt einen LinkedIn-Access-Token mit Zugriff auf Organisationsposts
(`r_organization_social`) und Admin-/Content-Rolle für die Organisation.

```bash
LINKEDIN_ACCESS_TOKEN=...
LINKEDIN_ORGANIZATION_ID=86876852
LINKEDIN_VERSION=202608
npm run import:social
```

Der Import nutzt die LinkedIn Posts API mit Author Finder:
`urn:li:organization:86876852`.

## Medien

Der Importer speichert API-Medien lokal unter:

```text
public/brand/social/amtshelden/imported/
```

So muss das Frontend nicht dauerhaft auf externe CDN-URLs zeigen.
