import Link from "next/link";
import type { Project } from "@/lib/content-types";
import { pathFor, type Locale } from "@/lib/locale";
import { Media } from "./Media";

export function TechList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="tech-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
export function Projects({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) {
  return (
    <div className="project-list">
      {projects.map((p, i) => (
        <article className={i === 0 ? "project lead" : "project"} key={p._id}>
          <Link
            className="project-link"
            href={pathFor(locale, "projects/" + p.slug.current)}
          >
            <Media photo={p.coverImage} name={p.title} locale={locale} />
            <div className="project-info">
              <p className="meta">{p.role?.[locale]}</p>
              <h2>
                {p.title}
                <span aria-hidden="true" className="open-arrow">
                  ↗
                </span>
              </h2>
              <p>{p.summary?.[locale]}</p>
              <TechList items={p.techStack?.slice(0, 4)} />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
