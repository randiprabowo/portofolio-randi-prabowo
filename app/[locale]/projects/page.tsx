import { pageMetadata } from "@/lib/seo";
import { Projects } from "@/components/Projects";
import { getProjects } from "@/lib/content";
import { readLocale } from "@/lib/locale";
import { ui } from "@/lib/ui";
export default async function ProjectIndex({
  params,
}: PageProps<"/[locale]/projects">) {
  const locale = readLocale((await params).locale);
  const projects = await getProjects();
  return (
    <>
      <div className="page-intro">
        <h1>{ui[locale].projectsIndex}</h1>
      </div>
      {projects.length ? (
        <Projects projects={projects} locale={locale} />
      ) : (
        <p>{ui[locale].empty}</p>
      )}
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">) {
  return pageMetadata(readLocale((await params).locale), "projects");
}
