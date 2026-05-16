/**
 * Header / Top-Nav für alle Frontend-Seiten.
 * Editorial-Magazin meets E-Com-Klarheit:
 *  - Kategorien als Mega-Menu (sofort sichtbar, kein Suchen)
 *  - Wissen + Über als button-artige Pill-Links
 *  - Newsletter-Popover-Widget rechts
 *  - Anbieter-CTA als sekundärer Pill
 */

import Link from "next/link";

import { Logo } from "@/components/site/Logo";
import { MegaMenu } from "@/components/site/MegaMenu";
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
        "sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80",
        className,
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-6 lg:px-10">
        <Logo height={40} priority />

        <nav className="hidden md:flex items-center gap-1.5">
          <MegaMenu />
          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-full h-9 px-3.5 font-ui text-[13px] font-medium text-mid transition-colors hover:bg-cream hover:text-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/anbieter"
            className="hidden lg:inline-flex h-9 items-center rounded-full border border-border px-4 font-ui text-[12px] font-medium text-mid transition-colors hover:bg-cream hover:text-dark"
          >
            Anbieter werden
          </Link>
          <NewsletterPopover />
        </div>
      </div>
    </header>
  );
}
