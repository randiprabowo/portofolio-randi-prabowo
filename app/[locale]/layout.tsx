import "@fontsource-variable/space-grotesk/wght.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "../globals.css";
import { locales, readLocale, shell } from "@/lib/locale";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings, getSocials } from "@/lib/content";
import { cv } from "@/lib/links";
import { SocialLinks } from "@/components/ContactLinks";

export const revalidate = 60;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = readLocale((await params).locale);
  const [profile, socials] = await Promise.all([getSettings(), getSocials()]);
  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main">
          {shell[locale].skip}
        </a>
        <Header locale={locale} resume={cv(profile, locale)} />
        <main id="main" tabIndex={-1} className="container">
          {children}
        </main>
        <Footer locale={locale} name={profile?.name}>
          <SocialLinks locale={locale} links={socials} />
        </Footer>
      </body>
    </html>
  );
}
