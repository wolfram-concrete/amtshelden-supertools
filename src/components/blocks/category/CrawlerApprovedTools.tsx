import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  FileText,
  Film,
  Newspaper,
  Video,
} from "lucide-react";

import {
  crawlerToolCardPreview,
  crawlerToolContentPreview,
  crawlerToolLogoPreview,
  type CrawlerToolContentPiece,
} from "@/mocks/tools/crawler-preview";
import { formatDateDEShort } from "@/lib/utils";
import { publicPitch } from "@/lib/crawler-content";

const resourcePriority: CrawlerToolContentPiece["kind"][] = [
  "youtube",
  "case_study",
  "use_case",
  "whitepaper",
  "webinar",
  "blog_article",
  "download",
  "video",
];

const hiddenResourceTerms = [
  "capterra",
  "pressemitteilung",
  "status und trends",
  "newsletter anmeldung",
];

const contentLabels: Record<CrawlerToolContentPiece["kind"], string> = {
  youtube: "Video",
  video: "Video",
  webinar: "Webinar",
  case_study: "Praxisbeispiel",
  use_case: "Anwendungsfall",
  whitepaper: "Leitfaden",
  blog_article: "Blog",
  download: "Download",
};

interface CrawlerApprovedToolsProps {
  categorySlug?: string;
  showHeader?: boolean;
}

function topicFromTool(toolName: string, pitch: string) {
  const haystack = `${toolName} ${pitch}`.toLowerCase();
  if (haystack.includes("barrierefreiheit") || haystack.includes("bfsg")) {
    return "digitale Barrierefreiheit";
  }
  if (haystack.includes("social media") || haystack.includes("community")) {
    return "Social Media Management";
  }
  if (haystack.includes("mitarbeiter")) {
    return "Mitarbeiterkommunikation";
  }
  return "das Produkt";
}

function topicPhrase(toolName: string, pitch: string) {
  const topic = topicFromTool(toolName, pitch);
  if (topic === "digitale Barrierefreiheit") return "zur digitalen Barrierefreiheit";
  if (topic === "Mitarbeiterkommunikation") return "zur Mitarbeiterkommunikation";
  if (topic === "Social Media Management") return "zum Social Media Management";
  return "zum Produkt";
}

function isGenericTitle(title: string) {
  const normalized = title.trim().toLowerCase();
  return [
    "blog",
    "webinare",
    "events",
    "guides",
    "jetzt anmelden",
    "case study anschauen",
    "erfolgsgeschichten",
  ].includes(normalized);
}

function shouldHideResource(piece: CrawlerToolContentPiece) {
  const haystack = `${piece.title} ${piece.url}`.toLowerCase();
  return hiddenResourceTerms.some((term) => haystack.includes(term));
}

function resourceTitle(piece: CrawlerToolContentPiece, toolName: string, pitch: string) {
  const phrase = topicPhrase(toolName, pitch);
  const title = piece.title.trim();

  if (piece.kind === "youtube") return `Produktvideo: ${title}`;
  if (piece.kind === "webinar") return `Webinare ${phrase}`;
  if (piece.kind === "blog_article") return `Blog ${phrase}`;
  if (piece.kind === "whitepaper") {
    if (title.toLowerCase().includes("web content accessibility guidelines")) {
      return "WCAG-Leitfaden zur Barrierefreiheit";
    }
    return isGenericTitle(title) ? `Leitfaden ${phrase}` : title;
  }
  if (piece.kind === "download") {
    return isGenericTitle(title) ? `Download ${phrase}` : title.replace(/\.pdf$/i, "");
  }
  if (piece.kind === "case_study") {
    return isGenericTitle(title) ? `Praxisbeispiele ${phrase}` : title;
  }
  if (piece.kind === "use_case") {
    return isGenericTitle(title) ? `Anwendungsfaelle ${phrase}` : title;
  }
  return isGenericTitle(title) ? contentLabels[piece.kind] : title;
}

function selectResources(toolSlug: string, toolName: string, pitch: string) {
  const seenKinds = new Set<string>();
  const pieces = (crawlerToolContentPreview[toolSlug] || [])
    .filter((piece) => !shouldHideResource(piece))
    .sort((a, b) => resourcePriority.indexOf(a.kind) - resourcePriority.indexOf(b.kind));

  const selected: CrawlerToolContentPiece[] = [];
  for (const piece of pieces) {
    const kindGroup = piece.kind === "youtube" || piece.kind === "video" ? "video" : piece.kind;
    if (seenKinds.has(kindGroup)) continue;
    selected.push({
      ...piece,
      title: resourceTitle(piece, toolName, pitch),
    });
    seenKinds.add(kindGroup);
    if (selected.length >= 3) break;
  }
  return selected;
}

function ResourceIcon({ kind }: { kind: CrawlerToolContentPiece["kind"] }) {
  const className = "h-3.5 w-3.5";
  if (kind === "youtube" || kind === "video") return <Video className={className} aria-hidden />;
  if (kind === "webinar") return <CalendarDays className={className} aria-hidden />;
  if (kind === "whitepaper") return <BookOpen className={className} aria-hidden />;
  if (kind === "blog_article") return <Newspaper className={className} aria-hidden />;
  if (kind === "download") return <FileText className={className} aria-hidden />;
  return <Film className={className} aria-hidden />;
}

function ToolLogo({
  slug,
  name,
  mark,
  markBg,
}: {
  slug: string;
  name: string;
  mark: string;
  markBg?: string;
}) {
  const logo = crawlerToolLogoPreview[slug];

  return (
    <span
      aria-hidden
      className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white shadow-[0_10px_30px_-24px_rgba(17,17,17,0.38)]"
      style={{ background: logo?.backgroundColor || markBg || "var(--color-brand)" }}
    >
      {!logo?.logoUrl && (
        <span className="absolute inset-0 flex items-center justify-center font-ui text-[13px] font-extrabold tracking-tight text-white">
          {mark}
        </span>
      )}
      {logo?.logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.logoUrl}
          alt={`${name} Logo`}
          className="relative h-12 w-12 rounded-lg object-contain"
          loading="lazy"
        />
      )}
    </span>
  );
}

function SignalPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand/15 bg-brand-light/50 px-2 py-0.5 font-ui text-[10.5px] font-medium text-brand-dark">
      <span aria-hidden>✓</span>
      {children}
    </span>
  );
}

function ResourceLink({ piece }: { piece: CrawlerToolContentPiece }) {
  return (
    <a
      href={piece.url}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex min-h-9 max-w-full items-center gap-2 rounded-full border border-brand/15 bg-brand-light/45 px-3 py-1.5 font-ui text-[12px] font-semibold leading-tight text-brand-dark transition-colors hover:border-brand/45 hover:bg-brand-light"
    >
      <ResourceIcon kind={piece.kind} />
      <span className="min-w-0 truncate">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-brand">
          {contentLabels[piece.kind]}
        </span>
        <span className="mx-1 text-brand/45" aria-hidden>
          /
        </span>
        {piece.title}
      </span>
      <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </a>
  );
}

export function CrawlerApprovedTools({
  categorySlug,
  showHeader = true,
}: CrawlerApprovedToolsProps) {
  const tools = categorySlug
    ? crawlerToolCardPreview.filter((tool) => tool.categorySlug === categorySlug)
    : crawlerToolCardPreview;

  if (tools.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-10">
      {showHeader && (
        <header className="mb-6 max-w-3xl">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Crawler-Freigabe
          </div>
          <h2 className="mt-2 font-serif text-[clamp(26px,3vw,36px)] font-normal leading-tight text-dark">
            Neu aus dem Review-Lauf
          </h2>
          <p className="mt-3 font-sans text-[15px] leading-[1.7] text-mid">
            Diese Einträge stammen aus dem Crawler-MVP und wurden fuer diesen
            Testlauf freigegeben. Sie bleiben getrennt von der redaktionellen
            Hauptliste, bis Profiltexte und Quellen final geprüft sind.
          </p>
        </header>
      )}

      <div className="grid gap-4">
        {tools.map((tool) => {
          const resources = selectResources(tool.slug, tool.name, tool.pitch);
          return (
            <article id={`crawler-${tool.slug}`} key={tool.slug} className="rounded-2xl bg-white p-5 lg:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <ToolLogo slug={tool.slug} name={tool.name} mark={tool.mark} markBg={tool.markBg} />

                  <div className="min-w-0">
                    <h3 className="font-serif text-[22px] font-normal leading-tight text-dark lg:text-[25px]">
                      {tool.name}
                    </h3>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-soft">
                      {tool.provider}
                    </div>
                    <p className="mt-2.5 max-w-3xl font-sans text-[15px] leading-[1.6] text-mid">
                      {publicPitch(tool.pitch)}
                    </p>
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {tool.compliance.dsgvo && <SignalPill>DSGVO</SignalPill>}
                      {tool.compliance.serverDe && <SignalPill>Server DE</SignalPill>}
                      {tool.compliance.bsi && <SignalPill>BSI</SignalPill>}
                      {tool.compliance.vergabe && <SignalPill>Vergabe</SignalPill>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-shrink-0 items-end justify-between gap-4 border-t border-border pt-4 sm:w-[220px] sm:flex-col sm:items-end sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <div className="sm:text-right">
                    <div className="font-serif text-[20px] font-normal leading-none text-dark">
                      {tool.facts.price || "auf Anfrage"}
                    </div>
                    <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-soft">
                      {[tool.facts.operation, tool.facts.setup].filter(Boolean).join(" · ")}
                    </div>
                    {tool.lastCheckedAt && (
                      <div className="mt-1.5 font-ui text-[11px] italic text-soft">
                        geprüft {formatDateDEShort(tool.lastCheckedAt)}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-cream px-4 py-2.5 font-ui text-[13px] font-semibold text-brand-dark transition-colors hover:bg-brand-light"
                  >
                    Profil ansehen
                    <ChevronRight size={15} aria-hidden />
                  </Link>
                </div>
              </div>

              {resources.length > 0 && (
                <div className="mt-5 border-t border-border pt-4">
                  <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
                    Zusatzmaterial
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resources.map((piece) => (
                      <ResourceLink key={piece.key} piece={piece} />
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
