/**
 * BlockRenderer — Registry für alle Frontend-Blocks.
 *
 * Mapped blockType-Strings auf React-Komponenten. Wird auf jeder Seite
 * verwendet die ein Blocks-Array rendert (Startseite, Kategorie, Wissen).
 *
 * Wenn ein neuer Block hinzukommt:
 * 1. Komponente in src/components/blocks/ anlegen
 * 2. Interface in src/types/blocks.ts ergänzen
 * 3. Hier im BLOCKS-Map registrieren
 */

import type { BlockBase } from "@/types/blocks";

// Block-Imports (werden ergänzt, sobald die Blocks existieren)
// import { HeroBlock } from "@/components/blocks/HeroBlock";
// import { EditorialIntroBlock } from "@/components/blocks/EditorialIntroBlock";

type BlockComponent = React.ComponentType<Record<string, unknown>>;

const BLOCKS: Record<string, BlockComponent> = {
  // hero: HeroBlock as BlockComponent,
  // editorial_intro: EditorialIntroBlock as BlockComponent,
};

export interface BlockRendererProps {
  blocks: BlockBase[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block, idx) => {
        const Component = block.blockType ? BLOCKS[block.blockType] : null;

        if (!Component) {
          if (process.env.NODE_ENV !== "production") {
            return (
              <div
                key={block.id || idx}
                className="container mx-auto py-8 my-4 border border-dashed border-amber-500 bg-amber-50 text-amber-900 text-sm"
              >
                <strong>Unbekannter Block:</strong>{" "}
                <code>{block.blockType || "ohne blockType"}</code>
              </div>
            );
          }
          return null;
        }

        return <Component key={block.id || idx} {...block} />;
      })}
    </>
  );
}
