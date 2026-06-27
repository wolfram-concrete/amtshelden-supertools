/**
 * Badge — Editorial-Style Tag/Pill
 * Für Kategorien, Status, Verifiziert-Badge, Eyebrow-Labels.
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono font-semibold uppercase tracking-[0.14em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-brand-light text-brand-dark border border-brand/20",
        verified: "bg-brand text-white",
        outline: "border border-border text-mid bg-transparent",
        soft: "bg-cream text-mid",
        eyebrow: "bg-transparent text-brand p-0 normal-case tracking-[0.18em]",
      },
      size: {
        default: "px-2.5 py-1 text-[11px] rounded-full",
        sm: "px-2 py-0.5 text-[10px] rounded-full",
        lg: "px-3 py-1.5 text-xs rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
