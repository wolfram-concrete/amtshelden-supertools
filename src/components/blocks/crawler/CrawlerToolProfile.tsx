import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  ExternalLink,
  FileText,
  Film,
  Info,
  Newspaper,
  Play,
  Video,
} from "lucide-react";

import {
  crawlerContentLabels,
  pickProfileYoutube,
  publicPitch,
  selectProfileResources,
} from "@/lib/crawler-content";
import {
  crawlerToolLogoPreview,
  type CrawlerToolContentPiece,
} from "@/mocks/tools/crawler-preview";
import { formatDateDEShort } from "@/lib/utils";
import type { ToolCardSummary } from "@/types/content";

function ResourceIcon({ kind }: { kind: CrawlerToolContentPiece["kind"] }) {
  const cls = "h-3.5 w-3.5";
  if (kind === "youtube" || kind === "video") return <Video className={cls} aria-hidden />;
  if (kind === "webinar") return <CalendarDays className={cls} aria-hidden />;
  if (kind === "whitepaper") return <BookOpen className={cls} aria-hidden />;
  if (kind === "blog_article") return <Newspaper className={cls} aria-hidden />;
  if (kind === "download") return <FileText className={cls} aria-hidden />;
  return <Film className={cls} aria-hidden />;
}

function SignalPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand/15 bg-brand-light/60 px-2.5 py-1 font-ui text-[11px] font-medium text-brand-dark">
      <BadgeCheck size={12} aria-hidden />
      {children}
    </span>
  );
}

interface CrawlerToolProfileProps {
  tool: ToolCardSummary;
}

/**
 * Tool-Profil-Fallback für freigegebene Crawler-Tools, für die noch kein
 * vollständiges ToolProfile existiert. Klar als „Crawler-Freigabe / noch
 * redaktionell zu prüfen" markiert. Speist sich ausschließlich aus
 * crawlerToolCardPreview, crawlerToolContentPreview und crawlerToolLogoPreview.
 */
export function CrawlerToolProfile({ tool }: CrawlerToolProfileProps) {
  const logo = crawlerToolLogoPreview[tool.slug];
  const pitch = publicPitch(tool.pitch);
  const youtube = pickProfileYoutube(tool.slug);
  const resources = selectProfileResources(tool.slug, tool.name, tool.pitch);

  const youtubeThumb =
    youtube?.thumbnailUrl ||
    (youtube?.videoId
      ? `https://img.youtube.com/vi/${youtube.videoId}/hqdefault.jpg`
      : null);
  const youtubeWatchUrl = youtube?.videoId
    ? `https://www.youtube.com/watch?v=${youtube.videoId}`
    : youtube?.url;

  return (
    <div className="container mx-auto px-6 lg:px-10 py-10 lg:py-14">
      <div className="max-w-3xl">
        <Link
          href={`/kategorien/${tool.categorySlug}`}
          className="inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-soft transition-colors hover:text-brand-dark"
        >
          <ArrowLeft size={15} aria-hidden />
          {tool.categoryLabel}
        </Link>

        {/* Status-Hinweis: Crawler-Freigabe, noch nicht redaktionell final */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-light bg-amber-light/60 p-4 lg:p-5">
          <span
            aria-hidden
            className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/70 text-accent-ink"
          >
            <Info size={15} />
          </span>
          <div>
            <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-accent-ink">
              Crawler-Freigabe · noch redaktionell zu prüfen
            </div>
            <p className="mt-1 font-sans text-[13.5px] leading-[1.6] text-mid">
              Dieser Eintrag stammt aus dem Crawler-Lauf und wurde für den Testlauf
              freigegeben. Die Angaben sind automatisch erfasste Signale, noch kein
              fertiges redaktionelles Profil — Texte, Quellen und Compliance werden
              vor der Aufnahme in die Hauptliste geprüft.
            </p>
          </div>
        </div>

        {/* Kopf */}
        <header className="mt-8 flex items-start gap-5">
          <span
            className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white"
            style={{ background: logo?.backgroundColor || tool.markBg || "var(--color-brand)" }}
          >
            {logo?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.logoUrl}
                alt={`${tool.name} Logo`}
                className="relative h-12 w-12 rounded-lg object-contain"
                loading="lazy"
              />
            ) : (
              <span className="font-ui text-[17px] font-extrabold tracking-tight text-white">
                {tool.mark}
              </span>
            )}
          </span>

          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent-ink">
              Crawler-Freigabe
            </span>
            <h1 className="mt-2 font-serif text-[clamp(30px,4vw,46px)] font-normal leading-[1.05] tracking-tight text-dark">
              {tool.name}
            </h1>
            <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-soft">
              {tool.provider}
            </div>
          </div>
        </header>

        {pitch && (
          <p className="mt-6 font-sans text-[18px] leading-[1.7] text-mid">
            {pitch}
          </p>
        )}

        {/* Signale + Facts */}
        <div className="mt-7 rounded-2xl border border-border bg-white p-5 lg:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="font-serif text-[22px] font-normal leading-none text-dark">
              {tool.facts.price || "auf Anfrage"}
            </div>
            {tool.lastCheckedAt && (
              <div className="font-ui text-[12px] italic text-soft">
                Crawler-Stand {formatDateDEShort(tool.lastCheckedAt)}
              </div>
            )}
          </div>
          {tool.facts.operation && (
            <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-soft">
              {tool.facts.operation}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {tool.compliance.dsgvo && <SignalPill>DSGVO</SignalPill>}
            {tool.compliance.serverDe && <SignalPill>Server DE</SignalPill>}
            {tool.compliance.bsi && <SignalPill>BSI</SignalPill>}
            {tool.compliance.vergabe && <SignalPill>Vergabe</SignalPill>}
          </div>
          <p className="mt-3 font-ui text-[11.5px] leading-[1.5] text-soft">
            Automatisch erfasste Crawler-Signale — Hinweise, keine geprüfte
            juristische Zusage.
          </p>
        </div>

        {/* Produktvideo — nur Thumbnail/Link, keine Einbettung */}
        {youtube && youtubeThumb && youtubeWatchUrl && (
          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-6 block overflow-hidden rounded-2xl border border-border"
          >
            <span className="relative block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={youtubeThumb}
                alt={`Produktvideo ${tool.name} (öffnet YouTube)`}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
              <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-dark/30 transition-colors group-hover:bg-dark/20">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-dark">
                  <Play size={22} className="ml-0.5" />
                </span>
              </span>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-dark/70 px-3 py-1 font-ui text-[11px] font-semibold text-white">
                Auf YouTube ansehen
                <ExternalLink size={12} aria-hidden />
              </span>
            </span>
          </a>
        )}

        {/* Zusatzmaterial — kurze, kontextualisierte Shortlinks */}
        {resources.length > 0 && (
          <div className="mt-7">
            <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
              Zusatzmaterial aus dem Crawler-Lauf
            </div>
            <div className="flex flex-wrap gap-2">
              {resources.map((piece) => (
                <a
                  key={piece.key}
                  href={piece.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex max-w-full items-center gap-2 rounded-full border border-brand/15 bg-brand-light/45 px-3 py-1.5 font-ui text-[12px] font-semibold leading-tight text-brand-dark transition-colors hover:border-brand/45 hover:bg-brand-light"
                >
                  <ResourceIcon kind={piece.kind} />
                  <span className="min-w-0 truncate">
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-brand">
                      {crawlerContentLabels[piece.kind]}
                    </span>
                    <span className="mx-1 text-brand/45" aria-hidden>
                      /
                    </span>
                    {piece.title}
                  </span>
                  <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* CTA + Quelle */}
        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
          <Link
            href={`/anfrage?tool=${tool.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-dark px-5 py-2.5 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand"
          >
            Unverbindlich anfragen
            <ArrowUpRight size={15} aria-hidden />
          </Link>
          {logo?.website && (
            <a
              href={logo.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-5 py-2.5 font-ui text-[13px] font-semibold text-dark transition-colors hover:border-brand hover:text-brand-dark"
            >
              Zur Anbieter-Website
              <ExternalLink size={14} aria-hidden />
            </a>
          )}
        </div>

        {logo?.domain && (
          <p className="mt-4 font-ui text-[11.5px] text-soft">
            Quelle der Crawler-Daten: {logo.domain}. Profil noch nicht
            redaktionell finalisiert.
          </p>
        )}
      </div>
    </div>
  );
}
