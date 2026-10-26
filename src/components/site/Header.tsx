/**
 * Header / Top-Nav für alle Frontend-Seiten.
 * Editorial-Magazin meets E-Com-Klarheit:
 *  - Startseite: Header transparent, grüne Floating-Pill schwebt über dem Hero.
 *  - Innenseiten (kein Hero): Header verankert (Cream-Fläche + Trennlinie),
 *    damit die Navi klar präsent ist — kein „verlorenes" Pill über Inhalt.
 *  - Mobile (< md): Logo + Hamburger → MobileNavDrawer mit allen Items + Newsletter
 *
 * WICHTIG: kein backdrop-blur/filter/transform am Header — das würde einen
 * Containing-Block erzeugen und das position:fixed Mega-Menü-Panel einsperren.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Logo } from "@/components/site/Logo";
import { MegaMenu } from "@/components/site/MegaMenu";
import { MobileNavDrawer } from "@/components/site/MobileNavDrawer";
import { NewsletterPopover } from "@/components/site/NewsletterPopover";
import { cn } from "@/lib/utils";

const secondaryNav = [
  { label: "Tool-Wissen", href: "/wissen" },
  { label: "Über", href: "/ueber" },
];

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  // Aktive Seite markieren — Hover-Style bleibt auf dem Punkt bestehen
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const themenActive =
    pathname.startsWith("/themenfelder") || pathname.startsWith("/kategorien");

  // Nav ohne Trägerelement: weiße, verteilte Schrift auf der Home (über dem
  // Bild), dunkle Schrift auf Innenseiten (Cream).
  const navBase =
    "inline-flex items-center gap-1.5 font-ui text-[14px] font-medium transition-colors";
  const navColor = isHome
    ? "text-white/80 hover:text-white"
    : "text-dark/70 hover:text-dark";
  const navActive = isHome ? "text-white" : "text-dark";

  // Beim Scrollen eine leichte Frost-Ebene einblenden, damit Logo + Navi
  // über dem durchscrollenden Content lesbar bleiben.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        // Verankert auf Innenseiten (Cream-Fläche), keine graue Trennlinie
        isHome ? "" : "bg-cream",
        className,
      )}
    >
      {/* Frost-Ebene beim Scrollen — Sibling der Navi (KEIN Ancestor des
          fixed Mega-Menüs, sonst würde dessen Positionierung wieder brechen) */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[160%] backdrop-blur-md bg-gradient-to-b from-[rgba(9,26,18,0.92)] to-transparent transition-opacity duration-300 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]",
          scrolled && isHome ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2.5">
          <Logo
            height={43}
            priority
            variant={isHome ? "inverse" : "default"}
          />
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 font-sans text-[11px] font-semibold",
              isHome
                ? "border border-white/45 text-white"
                : "bg-accent/25 text-accent-ink",
            )}
          >
            Beta
          </span>
        </div>

        {/* Desktop-Nav — ohne Trägerelement, Schrift verteilt */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7">
          <Link
            href="/suche"
            aria-current={isActive("/suche") ? "page" : undefined}
            className={cn(navBase, isActive("/suche") ? navActive : navColor)}
          >
            <Search size={15} aria-hidden />
            Suche
          </Link>
          <MegaMenu onDark={isHome} active={themenActive} />
          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                navBase,
                isActive(item.href) ? navActive : navColor,
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/anbieter"
            aria-current={isActive("/anbieter") ? "page" : undefined}
            className={cn(
              navBase,
              "hidden lg:inline-flex",
              isActive("/anbieter") ? navActive : navColor,
            )}
          >
            Anbieter werden
          </Link>
          <NewsletterPopover onDark={isHome} />
        </nav>

        {/* Mobile-Trigger */}
        <MobileNavDrawer />
      </div>
    </header>
  );
}
