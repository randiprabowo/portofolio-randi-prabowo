import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { locales, pathFor, routes } from "@/lib/locale";
import { origin, alternates } from "@/lib/seo";
export const revalidate = 60;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const paths = [
    ...routes,
    ...projects.map((project) => "projects/" + project.slug.current),
  ];
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: origin + pathFor(lang, path),
      alternates: { languages: alternates(path) },
    })),
  );
}
