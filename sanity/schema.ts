import { defineArrayMember, defineField, defineType } from "sanity";

const languages = [
  { name: "en", title: "English" },
  { name: "id", title: "Bahasa Indonesia" },
];
const localized = defineType({
  name: "localized",
  title: "Bilingual text",
  type: "object",
  fields: languages.map((lang) =>
    defineField({
      ...lang,
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
  ),
  preview: { select: { title: "en" } },
});
const rich = defineType({
  name: "rich",
  title: "Bilingual rich text",
  type: "object",
  fields: languages.map((lang) =>
    defineField({
      ...lang,
      type: "array",
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Paragraph", value: "normal" }],
          marks: { annotations: [] },
        }),
      ],
    }),
  ),
});
const loc = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: "localized",
    validation: (r) => (required ? r.required() : r),
  });
const image = defineType({
  name: "photo",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [loc("alt", "Image description", true)],
  validation: (r) => r.assetRequired(),
});
const order = defineField({
  name: "sortOrder",
  title: "Display order",
  type: "number",
  initialValue: 10,
  validation: (r) => r.integer().min(0),
});
const ordering = [
  {
    title: "Display order",
    name: "order",
    by: [{ field: "sortOrder", direction: "asc" as const }],
  },
];
const url = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: "url",
    validation: (r) =>
      (required ? r.required() : r).uri({ scheme: ["https", "http"] }),
  });
// Existing Sanity dates are ISO strings. Also accept the lower precision used in CVs.
function validPeriod(value?: string) {
  if (!value) return true;
  if (!/^\d{4}(-(?:0[1-9]|1[0-2])(-\d{2})?)?$/.test(value)) return "Use YYYY, YYYY-MM or YYYY-MM-DD.";
  if (value.length < 10) return true;
  const parsed = new Date(value);
  return (!Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(value + "T")) || "Enter a valid calendar date.";
}
const dates = [
  defineField({
    name: "startDate",
    type: "string",
    title: "Verified start date",
    description: "Year, year-month or full ISO date, as recorded.",
    validation: r => r.custom(validPeriod),
  }),
  defineField({
    name: "endDate",
    type: "string",
    title: "Verified end date",
    description: "Leave empty for a current position.",
    validation: r => r.custom((value, context) => {
      const valid = validPeriod(value);
      const start = (context.parent as {startDate?: string} | undefined)?.startDate;
      if (valid !== true || !value || !start) return valid;
      const precision = Math.min(start.length, value.length);
      return value.slice(0, precision) >= start.slice(0, precision) || "The end precedes the start.";
    }),
  }),
];
const requiredString = (name: string, title: string) =>
  defineField({ name, title, type: "string", validation: (r) => r.required() });
const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    requiredString("name", "Name"),
    loc("roleTitle", "Professional title", true),
    loc("tagline", "Specialization"),
    loc("location", "Public location"),
    loc("heroIntro", "Short introduction"),
    loc("aboutSummary", "About"),
    loc("approach", "Working approach"),
    loc("availabilityStatus", "Availability"),
    defineField({ name: "profileImage", type: "photo", title: "Portrait" }),
    defineField({
      name: "resumeFile",
      title: "CV (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (r) =>
        r.custom(
          (file) =>
            !file || file.asset?._ref.endsWith("-pdf") || "Upload a PDF file.",
        ),
    }),
    loc("resumeLabel", "CV download label"),
    defineField({
      name: "resumeLanguage",
      type: "string",
      options: { list: ["id", "en"] },
    }),
    defineField({
      name: "email",
      type: "email",
      title: "Public contact email",
    }),
    loc("seoTitle", "Homepage SEO title"),
    defineField({ name: "phone", title: "Public phone number", type: "string",
      validation: r => r.regex(/^\+?[\d ()-]+$/) }),
    loc("seoDescription", "Homepage SEO description"),
  ],
  preview: { select: { title: "name" } },
});
const project = defineType({
  name: "project",
  type: "document",
  title: "Projects",
  orderings: ordering,
  fields: [
    requiredString("title", "Project name"),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) =>
        r
          .required()
          .custom(
            (s) =>
              !s?.current ||
              /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.current) ||
              "Use lowercase letters, numbers and hyphens.",
          ),
    }),
    loc("summary", "Summary", true),
    loc("role", "Personal role", true),
    loc("category", "Category"),
    loc("context", "Context or problem"),
    defineField({ name: "description", title: "Contribution", type: "rich" }),
    loc("outcome", "Verified outcome"),
    defineField({ name: "coverImage", title: "Project cover", type: "photo" }),
    defineField({ name: "gallery", type: "array", of: [{ type: "photo" }] }),
    defineField({
      name: "techStack",
      title: "Technology stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    ...dates,
    url("liveUrl", "Live demo URL"),
    url("githubUrl", "GitHub URL"),
    defineField({
      name: "featured",
      title: "Featured project",
      type: "boolean",
      initialValue: false,
    }),
    order,
  ],
  preview: {
    select: { title: "title", subtitle: "summary.en", media: "coverImage" },
  },
});
const experience = defineType({
  name: "experience",
  type: "document",
  title: "Experience",
  orderings: ordering,
  fields: [
    loc("position", "Position", true),
    requiredString("company", "Official company name"),
    loc("location", "Location"),
    ...dates,
    defineField({
      name: "isCurrent",
      title: "Confirmed current position",
      type: "boolean",
    }),
    loc("description", "Description"),
    defineField({
      name: "highlights",
      type: "array",
      of: [{ type: "localized" }],
    }),
    order,
  ],
  preview: { select: { title: "position.en", subtitle: "company" } },
});
export const categories = [
  "programming",
  "frontend",
  "backend",
  "database",
  "tools",
  "collaboration",
  "design",
] as const;
const skill = defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  orderings: ordering,
  fields: [
    requiredString("name", "Skill"),
    defineField({
      name: "category",
      type: "string",
      options: { list: [...categories] },
      validation: (r) => r.required(),
    }),
    loc("level", "Verified proficiency (optional)"),
    defineField({ name: "featured", type: "boolean" }),
    order,
  ],
  preview: { select: { title: "name", subtitle: "category" } },
});
const education = defineType({
  name: "education",
  title: "Education & credentials",
  type: "document",
  orderings: ordering,
  fields: [
    loc("title", "Program or credential", true),
    requiredString("institution", "Institution"),
    defineField({
      name: "kind",
      type: "string",
      options: { list: ["education", "bootcamp", "certification", "course"] },
      validation: (r) => r.required(),
    }),
    ...dates,
    loc("description", "Description"),
    url("credentialUrl", "Verified credential URL"),
    order,
  ],
  preview: { select: { title: "title.en", subtitle: "institution" } },
});
const social = defineType({
  name: "socialLink",
  title: "Social links",
  type: "document",
  orderings: ordering,
  fields: [
    requiredString("platform", "Platform"),
    loc("label", "Link label", true),
    url("url", "Public profile URL", true),
    defineField({ name: "enabled", type: "boolean", initialValue: true }),
    order,
  ],
  preview: { select: { title: "label.en", subtitle: "platform" } },
});
export const schemaTypes = [
  localized,
  rich,
  image,
  siteSettings,
  project,
  experience,
  skill,
  education,
  social,
];
