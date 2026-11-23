"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { pathFor, routes, shell, type Locale } from "@/lib/locale";

export function Header({
  locale,
  resume,
}: {
  locale: Locale;
  resume?: { url: string; label: string };
}) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const labels = shell[locale];
  function closeMenu() {
    if (menu.current) menu.current.open = false;
  }
  const items = routes.map((route, index) => {
    const href = pathFor(locale, route);
    const active =
      pathname === href || (route && pathname.startsWith(href + "/"));
    return (
      <Link
        key={href}
        href={href}
        onClick={closeMenu}
        aria-current={active ? "page" : undefined}
      >
        {labels.pages[index]}
      </Link>
    );
  });
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link
          className="wordmark"
          href={pathFor(locale)}
          aria-label={"RP. · " + labels.home}
        >
          RP<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label={labels.nav}>
          {items}
        </nav>
        <div className="header-actions">
          <div
            className="languages"
            aria-label={locale === "en" ? "Language" : "Bahasa"}
          >
            {(["en", "id"] as const).map((lang) => (
              <Link
                key={lang}
                href={pathname.replace(/^\/(en|id)(?=\/|$)/, "/" + lang)}
                hrefLang={lang}
                lang={lang}
                aria-label={lang === "en" ? "EN · English" : "ID · Bahasa Indonesia"}
                aria-current={locale === lang ? "true" : undefined}
                onClick={closeMenu}
              >
                {lang.toUpperCase()}
              </Link>
            ))}
          </div>
          {resume && (
            <a className="header-cv" href={resume.url}>
              {resume.label}
            </a>
          )}
          <details
            className="mobile-menu"
            ref={menu}
            onBlur={(event) => {
              if (
                event.relatedTarget &&
                !event.currentTarget.contains(event.relatedTarget)
              )
                closeMenu();
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape" && menu.current?.open) {
                closeMenu();
                menu.current.querySelector("summary")?.focus();
              }
            }}
          >
            <summary>{labels.menu}</summary>
            <nav aria-label={labels.nav}>
              {items}
              {resume && <a href={resume.url}>{resume.label}</a>}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
