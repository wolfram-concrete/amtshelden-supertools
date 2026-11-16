import { BarHeading } from "@/components/ui/BarHeading";
import type { CategoryDefinition } from "@/types/content";

interface KategorieHeroProps {
  category: CategoryDefinition;
}

/**
 * Kategorie-Header, mittelachsig wie der Home-Hero und die Themenfeld-Seiten:
 * Headline im grünen Balken (BarHeading), Tagline zentriert plain darunter,
 * zugehörige Themenfelder als zentrierte, griffige Tags.
 */
export function KategorieHero({ category }: KategorieHeroProps) {
  return (
    <header className="container mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-10 lg:pb-14">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <BarHeading
          as="h1"
          className="text-center text-[clamp(34px,5vw,62px)]"
        >
          {category.name}
        </BarHeading>

        {category.tagline && (
          <p className="mt-7 max-w-2xl font-sans text-[16px] leading-[1.7] text-mid lg:text-[17px]">
            {category.tagline}
          </p>
        )}

        {category.topics && category.topics.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {category.topics.map((topic) => (
              <span
                key={topic}
                className="tag px-3 py-1 font-ui text-[12.5px] font-medium text-mid"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
