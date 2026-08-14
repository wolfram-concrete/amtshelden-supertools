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
  crawlerToolScreenshotPreview,
  crawlerToolSummaryPreview,
  type CrawlerToolContentPiece,
} from "@/mocks/tools/crawler-preview";
import { GeprueftBadge } from "@/components/ui/GeprueftBadge";
import { ProductShots } from "@/components/blocks/crawler/ProductShots";
import { InfoPopover } from "@/components/ui/InfoPopover";
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

function RailLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-soft">
      {children}
    </div>
  );
}

interface CrawlerToolProfileProps {
  tool: ToolCardSummary;
}

/**
 * Tool-Profil-Fallback für freigegebene Verzeichnis-Tools, für die noch kein
 * vollständiges ToolProfile existiert. Öffentlich als Basis-Profil markiert.
 * Speist sich ausschließlich aus dem geprüften Verzeichnis-Export.
 *
 * Layout spiegelt das volle Profil: Inhalt links, sticky Info-Leiste rechts
 * (Facts/Compliance, CTA, Material vom Anbieter, Quelle).
 */
export function CrawlerToolProfile({ tool }: CrawlerToolProfileProps) {
  const logo = crawlerToolLogoPreview[tool.slug];
  const pitch = publicPitch(tool.pitch);
  const youtube = pickProfileYoutube(tool.slug);
  const resources = selectProfileResources(tool.slug, tool.name, tool.pitch);
  const summary = crawlerToolSummaryPreview[tool.slug];
  const shots = crawlerToolScreenshotPreview[tool.slug];

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
      <Link
        href={`/kategorien/${tool.categorySlug}`}
        className="inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-soft transition-colors hover:text-brand-dark"
      >
        <ArrowLeft size={15} aria-hidden />
        {tool.categoryLabel}
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        {/* ── MAIN ── */}
        <main className="min-w-0">
          {/* Kopf */}
          <header data-reveal className="flex items-start gap-5">
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
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent-ink">
                  Basis-Profil
                </span>
                <InfoPopover
                  label="Was ist ein Basis-Profil?"
                  title="Basis-Profil — wird redaktionell ausgebaut"
                  text="Dieses Profil ist ein Basis-Eintrag: Kerninfos sind erfasst, die ausführliche redaktionelle Einordnung — Stärken, Grenzen, Praxis — folgt. Compliance-Angaben sind Hinweise, keine juristische Zusage."
                />
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
            <p
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className="mt-6 max-w-2xl font-sans text-[18px] leading-[1.7] text-mid"
            >
              {pitch}
            </p>
          )}

          {summary && (
            <div
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              className="mt-7 max-w-2xl"
            >
              <div className="mb-2 font-sans text-[14px] font-semibold text-brand">
                Über das Produkt
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-mid">
                {summary}
              </p>
            </div>
          )}

          {/* Einblick ins Produkt — Screenshots (Platzhalter bis Freigabe) */}
          <div className="mt-9">
            <div className="mb-3 font-sans text-[14px] font-semibold text-brand">
              Einblick ins Produkt
            </div>
            <ProductShots domain={logo?.domain} shots={shots} placeholders={2} />
          </div>

          {/* Produktvideo — nur Thumbnail/Link, keine Einbettung */}
          {youtube && youtubeThumb && youtubeWatchUrl && (
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 block max-w-2xl overflow-hidden rounded-2xl border border-border"
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
        </main>

        {/* ── STICKY INFO-LEISTE ── */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {/* Facts + Compliance */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="font-serif text-[22px] font-normal leading-none text-dark">
                {tool.facts.price || "auf Anfrage"}
              </div>
              {tool.lastCheckedAt && <GeprueftBadge date={tool.lastCheckedAt} />}
            </div>
            {tool.facts.operation && (
              <div className="mt-1.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-soft">
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
              Angaben aus öffentlich verfügbaren Quellen — Hinweise, keine
              geprüfte juristische Zusage.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-2">
            <Link
              href={`/anfrage?tool=${tool.slug}`}
              className="flex items-center justify-between gap-2 rounded-xl bg-brand-dark px-4 py-3 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand"
            >
              Unverbindlich anfragen
              <ArrowUpRight size={15} aria-hidden />
            </Link>
            {logo?.website && (
              <a
                href={logo.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-white px-4 py-3 font-ui text-[13px] font-semibold text-dark transition-colors hover:border-brand hover:text-brand-dark"
              >
                Zur Anbieter-Website
                <ExternalLink size={14} aria-hidden />
              </a>
            )}
          </div>

          {/* Material vom Anbieter — als Leisten-Liste */}
          {resources.length > 0 && (
            <div className="pt-1">
              <RailLabel>Material vom Anbieter</RailLabel>
              <div className="mt-2 space-y-2">
                {resources.map((piece) => (
                  <a
                    key={piece.key}
                    href={piece.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-2.5 rounded-lg border border-border bg-white px-3.5 py-3 transition-colors hover:border-brand"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-brand-dark">
                      <ResourceIcon kind={piece.kind} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-brand">
                        {crawlerContentLabels[piece.kind]}
                      </div>
                      <div className="mt-0.5 font-ui text-[12.5px] font-semibold leading-[1.35] text-dark transition-colors group-hover:text-brand-dark">
                        {piece.title}
                      </div>
                    </div>
                    <ExternalLink
                      className="mt-0.5 h-3 w-3 flex-shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Quelle / Stand */}
          {logo?.domain && (
            <p className="px-1 pt-1 font-ui text-[11.5px] leading-[1.5] text-soft">
              Quelle: {logo.domain}. Profil wird redaktionell ausgebaut.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
