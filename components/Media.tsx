import Image from "next/image";
import { photoUrl } from "@/lib/content";
import type { Photo } from "@/lib/content-types";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

export function Media({
  photo,
  name,
  locale,
  portrait = false,
  priority = false,
}: {
  photo?: Photo;
  name: string;
  locale: Locale;
  portrait?: boolean;
  priority?: boolean;
}) {
  const src = photoUrl(photo, portrait ? 800 : 1400, portrait ? 920 : 875);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  return (
    <figure className={portrait ? "media portrait" : "media cover"}>
      {src && photo?.alt?.[locale] ? (
        <Image
          src={src}
          alt={photo.alt[locale]}
          fill
          priority={priority}
          sizes={
            portrait
              ? "(max-width: 767px) 90vw, 36vw"
              : "(max-width: 767px) 90vw, (max-width: 1200px) 75vw, 1160px"
          }
        />
      ) : (
        <div className="type-plate">
          <span aria-hidden="true" className="plate-type">
            {portrait ? initials : name}
            <i>.</i>
          </span>
          <span className="plate-caption">
            {portrait ? ui[locale].portrait : ui[locale].cover}
          </span>
        </div>
      )}
    </figure>
  );
}
