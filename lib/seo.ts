import type { Metadata } from "next";
import { getSettings, photoUrl } from "./content";
import type { Project } from "./content-types";
import { pathFor, routes, shell, type Locale } from "./locale";

const deploymentDomain =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const origin = new URL(
  process.env.SITE_URL ||
    (deploymentDomain
      ? "https://" + deploymentDomain
      : "http://localhost:3000"),
).origin;
export function alternates(route: string) {
  return {
    en: origin + pathFor("en", route),
    id: origin + pathFor("id", route),
    "x-default": origin + pathFor("en", route),
  };
}
export async function pageMetadata(
  locale: Locale,
  route: (typeof routes)[number],
  project?: Project,
): Promise<Metadata> {
  const profile = await getSettings();
  const path = project ? "projects/" + project.slug.current : route;
  const pageName = project?.title || shell[locale].pages[routes.indexOf(route)];
  const title = route
    ? [pageName, profile?.name].filter(Boolean).join(" · ")
    : profile?.seoTitle?.[locale] ||
      [profile?.name, profile?.roleTitle?.[locale]]
        .filter(Boolean)
        .join(" · ") ||
      pageName;
  const description =
    project?.summary?.[locale] ||
    profile?.seoDescription?.[locale] ||
    profile?.aboutSummary?.[locale];
  const image = project?.coverImage ?? profile?.profileImage;
  const imageUrl = photoUrl(image, 1200, 630);
  const url = origin + pathFor(locale, path);
  return {
    metadataBase: new URL(origin),
    title,
    description,
    alternates: { canonical: url, languages: alternates(path) },
    icons: { icon: "/mark.svg" },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: profile?.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? "en_US" : "id_ID",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: image?.alt?.[locale],
            },
          ]
        : undefined,
    },
  };
}
