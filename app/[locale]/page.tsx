import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { getProjects, getSettings, getSocials } from "@/lib/content";
import { pathFor, readLocale, shell } from "@/lib/locale";
import { ui } from "@/lib/ui";
import { DownloadCV, SocialLinks } from "@/components/ContactLinks";
import { Media } from "@/components/Media";
import { Projects } from "@/components/Projects";
import { HeroCopy } from "@/components/HeroCopy";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const locale = readLocale((await params).locale);
  const [profile, projects, socials] = await Promise.all([
    getSettings(),
    getProjects(),
    getSocials(),
  ]);
  const t = ui[locale];
  const selected = projects.slice(0, 3);
  return (
    <>
      {profile ? (
        <section className="hero">
          <HeroCopy>
            {profile.location?.[locale] && (
              <p className="eyebrow location">{profile.location[locale]}</p>
            )}
            <h1>
              {profile.name.split(/\s+/).map((part, i) => (
                <span key={i}>{part} </span>
              ))}
            </h1>
            <p className="hero-role">{profile.roleTitle?.[locale]}</p>
            {profile.tagline?.[locale] && (
              <p className="specialization">{profile.tagline[locale]}</p>
            )}
            {profile.heroIntro?.[locale] && (
              <p className="intro">{profile.heroIntro[locale]}</p>
            )}
            {profile.availabilityStatus?.[locale] && (
              <p>{profile.availabilityStatus[locale]}</p>
            )}
            <div className="actions">
              <Link
                className="button primary"
                href={pathFor(locale, "projects")}
              >
                {t.projects}
                <span aria-hidden="true">↗</span>
              </Link>
              <DownloadCV settings={profile} locale={locale} />
              <Link className="quiet-link" href={pathFor(locale, "contact")}>
                {t.contact}
              </Link>
            </div>
            <SocialLinks links={socials} locale={locale} />
          </HeroCopy>
          <Media
            photo={profile.profileImage}
            name={profile.name}
            locale={locale}
            portrait
            priority
          />
        </section>
      ) : (
        <div className="page-intro">
          <h1>{shell[locale].pages[0]}</h1>
          <p>{t.noProfile}</p>
        </div>
      )}
      {selected.length > 0 && (
        <section className="section">
          <div className="section-heading">
            <h2 className="section-title">{t.selected}</h2>
            <Link className="quiet-link" href={pathFor(locale, "projects")}>
              {t.all}
            </Link>
          </div>
          <Projects projects={selected} locale={locale} />
        </section>
      )}
    </>
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  return pageMetadata(readLocale((await params).locale), "");
}
