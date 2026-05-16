/**
 * Header / Top-Nav für alle Frontend-Seiten.
 * Editorial-Stil: schmal, ruhig, mit Amtshelden-Marker links.
 */

import Link from "next/link";

import { Logo } from "@/components/site/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Kategorien", href: "/kategorien" },
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
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <Logo height={40} priority />


        {/* Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-ui text-[13px] font-medium text-mid transition-colors hover:text-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/anbieter"
          className="hidden lg:inline-flex h-9 items-center rounded-full border border-border px-4 font-ui text-[12px] font-medium text-mid transition-colors hover:bg-cream hover:text-dark"
        >
          Anbieter werden
        </Link>
      </div>
    </header>
  );
}
