import { cache } from "react";
import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import seed from "@/content/seed.json";
import { sanityEnvironment } from "@/sanity/env";
import type {
  Content,
  Photo,
  Settings,
  Project,
  Experience,
  Education,
  Skill,
  Social,
} from "./content-types";

const environment = sanityEnvironment();
const client = environment
  ? createClient({ ...environment, useCdn: false, perspective: "published" })
  : null;
const publishedSeed = (seed as Content[]).filter(
  (doc) => !doc._id.startsWith("drafts."),
);
function local<T extends Content["_type"]>(
  type: T,
): Extract<Content, { _type: T }>[] {
  return publishedSeed
    .filter((doc): doc is Extract<Content, { _type: T }> => doc._type === type)
    .sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity));
}
const options = { next: { revalidate: 60 } };
export const getSettings = cache(async (): Promise<Settings | null> =>
  client
    ? client.fetch(
        '*[_id == "siteSettings"][0]{..., "resumeUrl":resumeFile.asset->url}',
        {},
        options,
      )
    : (local("siteSettings")[0] ?? null),
);
export const getSocials = cache(async (): Promise<Social[]> =>
  client
    ? client.fetch(
        '*[_type == "socialLink" && enabled == true] | order(sortOrder asc, _id asc)',
        {},
        options,
      )
    : local("socialLink").filter((link) => link.enabled),
);
export const getProjects = cache(async (): Promise<Project[]> =>
  client
    ? client.fetch(
        '*[_type == "project" && defined(slug.current)] | order(featured desc, sortOrder asc, _id asc){_id,_type,title,slug,summary,role,category,techStack,coverImage,featured}',
        {},
        options,
      )
    : local("project").sort(
        (a, b) => Number(!!b.featured) - Number(!!a.featured),
      ),
);
export const getProject = cache(
  async (slug: string): Promise<Project | null> =>
    client
      ? client.fetch(
          '*[_type == "project" && slug.current == $slug][0]',
          { slug },
          options,
        )
      : (local("project").find((project) => project.slug.current === slug) ??
        null),
);
export const getExperiences = cache(async (): Promise<Experience[]> =>
  client
    ? client.fetch(
        '*[_type == "experience"] | order(sortOrder asc, _id asc)',
        {},
        options,
      )
    : local("experience"),
);
export const getEducation = cache(async (): Promise<Education[]> =>
  client
    ? client.fetch(
        '*[_type == "education"] | order(sortOrder asc, _id asc)',
        {},
        options,
      )
    : local("education"),
);
export const getSkills = cache(async (): Promise<Skill[]> =>
  client
    ? client.fetch(
        '*[_type == "skill"] | order(featured desc, sortOrder asc, _id asc)',
        {},
        options,
      )
    : local("skill"),
);

export function photoUrl(
  image: Photo | undefined,
  width: number,
  height: number,
) {
  if (environment && image?.asset?._ref) {
    return createImageUrlBuilder(environment)
      .image(image)
      .width(width)
      .height(height)
      .fit("crop")
      .auto("format")
      .url();
  }
}
