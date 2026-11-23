import { notFound } from "next/navigation";
export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export function readLocale(value: string): Locale {
  if (value === "en" || value === "id") return value;
  notFound();
}
export const routes = [
  "",
  "about",
  "experience",
  "projects",
  "contact",
] as const;
export const shell = {
  en: {
    pages: ["Home", "About", "Experience", "Projects", "Contact"],
    skip: "Skip to content",
    nav: "Main navigation",
    menu: "Menu",
    footer: "Footer navigation",
    home: "Home",
    theme: "Color theme",
    light: "Light mode",
    dark: "Dark mode",
  },
  id: {
    pages: ["Beranda", "Tentang", "Pengalaman", "Proyek", "Kontak"],
    skip: "Langsung ke konten",
    nav: "Navigasi utama",
    menu: "Menu",
    footer: "Navigasi kaki halaman",
    home: "Beranda",
    theme: "Tema warna",
    light: "Mode terang",
    dark: "Mode gelap",
  },
};
export function pathFor(locale: Locale, route: string = "") {
  return route ? `/${locale}/${route}` : `/${locale}`;
}
