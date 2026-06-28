/**
 * Registry aller vollständigen Tool-Profile (Profil-Seiten).
 * Wird mit jedem neuen kuratierten Profil erweitert.
 */

import type { ToolProfile } from "@/types/profile";

import { ozgPortal } from "./ozg-portal";
import { vivioakte } from "./vivioakte";

export const toolProfileRegistry: Record<string, ToolProfile> = {
  [vivioakte.slug]: vivioakte,
  [ozgPortal.slug]: ozgPortal,
};
