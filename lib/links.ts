import type { Settings, Project } from "./content-types";
import type { Locale } from "./locale";
export function safeUrl(value?: string): string | undefined {
  if (!value) return;
  try {
    const url = new URL(value);
    if (["https:", "http:"].includes(url.protocol)) return url.href;
  } catch {
    return;
  }
}
export function cv(settings: Settings | null, locale: Locale) {
  const href = safeUrl(settings?.resumeUrl);
  if (!href || !settings) return;
  const url = new URL(href);
  url.searchParams.set("dl", "CV.pdf");
  return {
    url: url.href,
    label:
      settings.resumeLabel?.[locale] ||
      (locale === "en" ? "Download CV" : "Unduh CV"),
  };
}

export function projectLinks(
  project: Pick<Project, "liveUrl" | "githubUrl">,
  labels: { live: string; github: string },
) {
  const links = [
    { label: labels.live, url: safeUrl(project.liveUrl) },
    { label: labels.github, url: safeUrl(project.githubUrl) },
  ];
  return links.filter((link): link is { label: string; url: string } =>
    Boolean(link.url),
  );
}
