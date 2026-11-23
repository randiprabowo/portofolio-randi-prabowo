import { cv, safeUrl } from "@/lib/links";
import type { Settings, Social } from "@/lib/content-types";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";
export function SocialLinks({
  links,
  locale,
}: {
  links: Social[];
  locale: Locale;
}) {
  const visible = links.filter(
    (link) => link.enabled && safeUrl(link.url) && link.label?.[locale],
  );
  if (!visible.length) return null;
  return (
    <ul className="social-links" aria-label={ui[locale].profiles}>
      {visible.map((link) => (
        <li key={link._id}>
          <a href={safeUrl(link.url)}>
            <span aria-hidden="true">↗ </span>
            {link.label[locale]}
          </a>
        </li>
      ))}
    </ul>
  );
}
export function DownloadCV({
  settings,
  locale,
}: {
  settings: Settings | null;
  locale: Locale;
}) {
  const resume = cv(settings, locale);
  return (
    resume && (
      <a
        className="button secondary"
        href={resume.url}
        hrefLang={settings?.resumeLanguage}
      >
        {resume.label}
      </a>
    )
  );
}
