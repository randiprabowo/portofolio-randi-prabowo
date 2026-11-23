import { pageMetadata } from "@/lib/seo";
import { DownloadCV, SocialLinks } from "@/components/ContactLinks";
import { getSettings, getSocials } from "@/lib/content";
import { readLocale } from "@/lib/locale";
import { ui } from "@/lib/ui";
export default async function Contact({
  params,
}: PageProps<"/[locale]/contact">) {
  const locale = readLocale((await params).locale);
  const [profile, socials] = await Promise.all([getSettings(), getSocials()]);
  return (
    <>
      <div className="page-intro">
        <h1>{ui[locale].contact}</h1>
      </div>
      <section className="contact-panel">
        {profile?.email && (
          <div>
            <p className="meta">{ui[locale].email}</p>
            <a className="email" href={"mailto:" + profile.email}>
              {profile.email}
            </a>
          </div>
        )}
        {!profile?.email && !socials.length && (
          <p className="lede">{ui[locale].noContact}</p>
        )}
        <SocialLinks links={socials} locale={locale} />
        {profile?.location?.[locale] && (
          <div className="fact">
            <p className="meta">{ui[locale].location}</p>
            <p>{profile.location[locale]}</p>
          </div>
        )}
        <DownloadCV settings={profile} locale={locale} />
      </section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">) {
  return pageMetadata(readLocale((await params).locale), "contact");
}
