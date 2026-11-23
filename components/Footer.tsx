import Link from "next/link";
import { pathFor, shell, type Locale } from "@/lib/locale";
export function Footer({
  locale,
  name,
  children,
}: {
  locale: Locale;
  name?: string;
  children?: React.ReactNode;
}) {
  return (
    <footer className="container site-footer">
      <Link
        className="wordmark"
        aria-label={"RP. · " + shell[locale].home}
        href={pathFor(locale)}
      >
        RP<span>.</span>
      </Link>
      {name && (
        <p>
          © {new Date().getFullYear()} {name}
        </p>
      )}
      <nav aria-label={shell[locale].footer}>
        <Link href={pathFor(locale, "projects")}>{shell[locale].pages[3]}</Link>
        <Link href={pathFor(locale, "contact")}>{shell[locale].pages[4]}</Link>
      </nav>
      {children}
    </footer>
  );
}
