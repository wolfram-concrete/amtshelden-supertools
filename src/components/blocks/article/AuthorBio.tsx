import Image from "next/image";

import type { Author } from "@/types/content";

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="mt-10 flex gap-5 rounded-2xl border border-border bg-cream/40 p-6 lg:p-7">
      {author.avatar?.url && (
        <Image
          src={author.avatar.url}
          alt={author.avatar.alt}
          width={72}
          height={72}
          sizes="72px"
          className="h-[72px] w-[72px] flex-shrink-0 rounded-full object-cover"
        />
      )}

      <div className="space-y-1.5">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
          Über die Autor:in
        </div>
        <h3 className="font-serif text-[20px] font-normal leading-tight text-dark">
          {author.name}
        </h3>
        {author.role && (
          <div className="font-ui text-[12px] text-soft">{author.role}</div>
        )}
        {author.bio && (
          <p className="pt-2 font-sans text-[14px] leading-[1.65] text-mid">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}
