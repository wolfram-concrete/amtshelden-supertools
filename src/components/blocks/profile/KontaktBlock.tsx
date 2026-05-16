import { Globe, Mail, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import type { KontaktData } from "@/types/profile";

import { SectionHead } from "./SectionHead";

interface KontaktBlockProps extends KontaktData {
  className?: string;
}

export function KontaktBlock({ intro, links, className }: KontaktBlockProps) {
  const buttons = [
    links?.website && {
      icon: Globe,
      label: links.website.replace(/^https?:\/\//, ""),
      href: links.website,
      external: true,
    },
    links?.email && {
      icon: Mail,
      label: links.email,
      href: `mailto:${links.email}`,
    },
    links?.phone && {
      icon: Phone,
      label: links.phone,
      href: `tel:${links.phone.replace(/\s/g, "")}`,
    },
  ].filter(Boolean) as Array<{
    icon: typeof Globe;
    label: string;
    href: string;
    external?: boolean;
  }>;

  return (
    <section className={cn("space-y-5", className)}>
      <SectionHead eyebrow="Kontakt" title="Anfrage über Amtshelden stellen" />

      <p className="font-sans text-[17px] leading-[1.75] text-mid">{intro}</p>

      {buttons.length > 0 && (
        <div className="flex flex-wrap gap-2.5">
          {buttons.map((btn) => {
            const Icon = btn.icon;
            return (
              <a
                key={btn.href}
                href={btn.href}
                target={btn.external ? "_blank" : undefined}
                rel={btn.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 font-ui text-[13px] font-medium text-dark transition-colors hover:border-brand hover:text-brand"
              >
                <Icon size={14} aria-hidden />
                {btn.label}
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
