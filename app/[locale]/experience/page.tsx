import { pageMetadata } from "@/lib/seo";
import { Experiences } from "@/components/History";
import { getExperiences } from "@/lib/content";
import { readLocale } from "@/lib/locale";
import { ui } from "@/lib/ui";
export default async function Experience({
  params,
}: PageProps<"/[locale]/experience">) {
  const locale = readLocale((await params).locale);
  const items = await getExperiences();
  return (
    <>
      <div className="page-intro">
        <h1>{ui[locale].work}</h1>
      </div>
      {items.length ? (
        <Experiences items={items} locale={locale} />
      ) : (
        <p>{ui[locale].empty}</p>
      )}
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experience">) {
  return pageMetadata(readLocale((await params).locale), "experience");
}
