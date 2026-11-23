import { pageMetadata } from "@/lib/seo";
import { getSettings, getSkills, getEducation } from "@/lib/content";
import { readLocale, shell } from "@/lib/locale";
import { ui } from "@/lib/ui";
import { Skills, EducationList } from "@/components/History";
import { Media } from "@/components/Media";

export default async function About({ params }: PageProps<"/[locale]/about">) {
  const locale = readLocale((await params).locale);
  const [profile, skills, education] = await Promise.all([
    getSettings(),
    getSkills(),
    getEducation(),
  ]);
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">{shell[locale].pages[1]}</p>
        <h1>{ui[locale].about}</h1>
      </div>
      {profile && (
        <div className="about-grid">
          <div>
            {profile.aboutSummary?.[locale] && (
              <p className="lede">{profile.aboutSummary[locale]}</p>
            )}
            {profile.tagline?.[locale] && (
              <div className="fact">
                <p className="meta">{ui[locale].specialization}</p>
                <p>{profile.tagline[locale]}</p>
              </div>
            )}
            {profile.approach?.[locale] && (
              <div className="fact">
                <p className="meta">{ui[locale].approach}</p>
                <p>{profile.approach[locale]}</p>
              </div>
            )}
          </div>
          {profile.profileImage && (
            <Media
              photo={profile.profileImage}
              name={profile.name}
              locale={locale}
              portrait
            />
          )}
        </div>
      )}
      <Skills items={skills} locale={locale} />
      <EducationList items={education} locale={locale} />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">) {
  return pageMetadata(readLocale((await params).locale), "about");
}
