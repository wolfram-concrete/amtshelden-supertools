"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, Menu, X } from "lucide-react";

import { Logo } from "@/components/site/Logo";
import { cn } from "@/lib/utils";
import { categories } from "@/mocks/categories";

/**
 * Mobile-Nav: Hamburger-Button + Slide-in-Drawer von rechts.
 * Enthält alle Nav-Items, eine Kategorien-Akkordeon-Sektion,
 * Newsletter-Form und Service-Links.
 *
 * Wird auf Desktop (md+) ausgeblendet — dort übernimmt die normale
 * Header-Nav (mit MegaMenu).
 */
export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Body-Scroll-Lock + ESC + Body-Class fürs Backdrop-Styling
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);

      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <>
      {/* Trigger (nur Mobile) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menü öffnen"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-dark hover:bg-cream transition-colors"
      >
        <Menu size={20} aria-hidden />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-dark/40 backdrop-blur-[2px] md:hidden animate-drawer-fade"
        />
      )}

      {/* Drawer */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Hauptnavigation"
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl md:hidden flex flex-col",
          open
            ? "translate-x-0 animate-drawer-in"
            : "translate-x-full pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 h-20">
          <Logo height={32} link={false} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menü schließen"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-soft hover:text-dark hover:bg-cream transition-colors"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        {/* Scroll-Bereich */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Newsletter */}
          <section className="px-5 py-6 border-b border-border bg-cream/40">
            <div className="flex items-center gap-2 mb-3">
              <Mail size={14} className="text-brand" aria-hidden />
              <span className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                Newsletter
              </span>
            </div>
            <h2 className="font-serif text-[20px] font-bold leading-[1.2] text-dark mb-3">
              1× pro Woche das Wichtigste.
            </h2>

            {submitted ? (
              <div className="rounded-lg border border-brand bg-brand-light/40 px-4 py-3 font-ui text-[12px] text-brand-dark">
                ✓ Danke! Bestätigung kommt per E-Mail.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dein.name@kommune.de"
                  className="w-full rounded-full border border-border bg-white px-4 py-3 font-ui text-[14px] text-dark placeholder:text-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand px-5 py-3 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Anmelden
                </button>
              </form>
            )}
          </section>

          {/* Primary Nav */}
          <nav className="px-3 py-4" aria-label="Hauptmenü">
            {/* Kategorien-Akkordeon */}
            <div>
              <button
                type="button"
                onClick={() => setCatsOpen((v) => !v)}
                aria-expanded={catsOpen}
                className="w-full flex items-center justify-between px-3 py-3.5 rounded-lg font-ui text-[15px] font-semibold text-dark hover:bg-cream transition-colors"
              >
                Kategorien
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform text-soft",
                    catsOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
              {catsOpen && (
                <ul className="pl-3 mt-1 space-y-px animate-drawer-fade">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/kategorien/${c.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cream transition-colors"
                      >
                        <span
                          aria-hidden
                          className="text-base flex-shrink-0"
                          style={{ color: c.accentColor || "#009460" }}
                        >
                          {c.icon}
                        </span>
                        <span className="flex-1 font-ui text-[13px] text-dark">
                          {c.name}
                        </span>
                        <span className="font-ui text-[10px] text-soft">
                          {c.toolCount}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="pt-1">
                    <Link
                      href="/kategorien"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 font-ui text-[12px] font-semibold text-brand hover:underline"
                    >
                      Alle Kategorien ansehen →
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            <DrawerLink href="/wissen" onClick={() => setOpen(false)}>
              Wissen & Magazin
            </DrawerLink>
            <DrawerLink href="/ueber" onClick={() => setOpen(false)}>
              Über uns
            </DrawerLink>
          </nav>

          {/* Service-Links */}
          <nav
            className="px-3 py-4 border-t border-border"
            aria-label="Service"
          >
            <DrawerLink
              href="/anbieter"
              onClick={() => setOpen(false)}
              variant="muted"
            >
              Anbieter werden
            </DrawerLink>
            <DrawerLink
              href="/kontakt"
              onClick={() => setOpen(false)}
              variant="muted"
            >
              Kontakt
            </DrawerLink>
          </nav>

          {/* Footer-Links */}
          <div className="px-5 py-4 border-t border-border flex flex-wrap gap-x-4 gap-y-1">
            <Link
              href="/impressum"
              onClick={() => setOpen(false)}
              className="font-ui text-[11px] text-soft hover:text-dark transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              onClick={() => setOpen(false)}
              className="font-ui text-[11px] text-soft hover:text-dark transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </aside>

      <style>{`
        @keyframes drawer-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes drawer-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-drawer-in { animation: drawer-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-drawer-fade { animation: drawer-fade 0.18s ease-out forwards; }
      `}</style>
    </>
  );
}

function DrawerLink({
  href,
  onClick,
  children,
  variant = "default",
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "muted";
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block px-3 py-3.5 rounded-lg font-ui transition-colors hover:bg-cream",
        variant === "default"
          ? "text-[15px] font-semibold text-dark"
          : "text-[13.5px] font-medium text-mid hover:text-dark",
      )}
    >
      {children}
    </Link>
  );
}
