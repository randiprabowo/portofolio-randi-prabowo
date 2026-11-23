import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getProject, getProjects, photoUrl } from "@/lib/content";
import { projectLinks } from "@/lib/links";
import { pathFor, readLocale } from "@/lib/locale";
import { ui } from "@/lib/ui";
import { period } from "@/components/History";
import { Media } from "@/components/Media";
import { TechList } from "@/components/Projects";
export const revalidate = 60;
export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({
    slug: project.slug.current,
  }));
}
export default async function ProjectDetail({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale: value, slug } = await params;
  const locale = readLocale(value);
  const [p, list] = await Promise.all([getProject(slug), getProjects()]);
  if (!p) notFound();
  const t = ui[locale];
  const next =
    list.length > 1
      ? list[(list.findIndex((item) => item._id === p._id) + 1) % list.length]
      : null;
  const fields = [
    [t.role, p.role?.[locale]],
    [t.category, p.category?.[locale]],
    [t.period, period(p, locale)],
  ];
  const links = projectLinks(p, t);
  const rich = p.description?.[locale];
  return (
    <article className="detail">
      <header className="page-intro">
        <Link className="back" href={pathFor(locale, "projects")}>
          ← {t.back}
        </Link>
        <h1>{p.title}</h1>
        <p className="lede">{p.summary?.[locale]}</p>
      </header>
      <Media photo={p.coverImage} name={p.title} locale={locale} priority />
      <dl className="facts">
        {fields.map(
          ([label, value]) =>
            value && (
              <div key={label}>
                <dt className="meta">{label}</dt>
                <dd>{value}</dd>
              </div>
            ),
        )}
      </dl>
      {p.context?.[locale] && (
        <section className="reading">
          <h2>{t.context}</h2>
          <p>{p.context[locale]}</p>
        </section>
      )}
      {rich?.length ? (
        <section className="reading">
          <h2>{t.contributions}</h2>
          <PortableText value={rich} />
        </section>
      ) : null}
      {p.outcome?.[locale] && (
        <section className="reading">
          <h2>{t.outcome}</h2>
          <p>{p.outcome[locale]}</p>
        </section>
      )}
      {!!p.techStack?.length && (
        <section className="reading">
          <h2>{t.stack}</h2>
          <TechList items={p.techStack} />
        </section>
      )}
      {!!p.gallery?.length && (
        <section className="section">
          <h2 className="section-title">{t.gallery}</h2>
          <div className="gallery">
            {p.gallery.map((image, i) => (
              <a
                key={image._key || i}
                href={photoUrl(image, 1800, 1200)?.split("?")[0]}
                aria-label={t.original + " · " + image.alt[locale]}
              >
                <Media photo={image} name={p.title} locale={locale} />
              </a>
            ))}
          </div>
        </section>
      )}
      {!!links.length && (
        <div className="actions">
          {links.map(({ label, url }) => (
            <a className="button secondary" key={label} href={url}>
              {label}
            </a>
          ))}
        </div>
      )}
      {next && (
        <Link
          className="next-project"
          href={pathFor(locale, "projects/" + next.slug.current)}
        >
          <span className="meta">{t.next}</span>
          <strong>{next.title} ↗</strong>
        </Link>
      )}
    </article>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  return pageMetadata(readLocale(locale), "projects", project);
}
