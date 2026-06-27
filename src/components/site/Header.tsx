/**
 * Header / Top-Nav für alle Frontend-Seiten.
 * Editorial-Magazin meets E-Com-Klarheit:
 *  - Desktop (md+): zentrale Navi als grüne Floating-Pill (Insel), die sich
 *    vom Rest der Seite absetzt — keine durchgezogene Trennlinie.
 *  - Mobile (< md): Logo + Hamburger → MobileNavDrawer mit allen Items + Newsletter
 */

import Link from "next/link";

import { Logo } from "@/components/site/Logo";
import { MegaMenu } from "@/components/site/MegaMenu";
import { MobileNavDrawer } from "@/components/site/MobileNavDrawer";
import { NewsletterPopover } from "@/components/site/NewsletterPopover";
import { cn } from "@/lib/utils";

const secondaryNav = [
  { label: "Wissen", href: "/wissen" },
  { label: "Über", href: "/ueber" },
];

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        className,
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Logo height={36} priority />

        {/* Desktop-Nav — eine grüne Floating-Pill mit allem (Insel) */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-0.5 rounded-full bg-brand-dark/70 backdrop-blur-xl border border-white/15 p-1.5 shadow-[0_12px_34px_-14px_rgba(0,107,69,0.6)]">
            <MegaMenu onDark />
            {secondaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-full h-9 px-3.5 font-ui text-[13px] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            {/* Trenner */}
            <span aria-hidden className="mx-1 h-5 w-px bg-white/15" />

            <Link
              href="/anbieter"
              className="hidden lg:inline-flex items-center rounded-full h-9 px-3.5 font-ui text-[13px] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            >
              Anbieter werden
            </Link>
            <NewsletterPopover onDark />
          </div>
        </nav>

        {/* Mobile-Trigger */}
        <MobileNavDrawer />
      </div>
    </header>
  );
}
