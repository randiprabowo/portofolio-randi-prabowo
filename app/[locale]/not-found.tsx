"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathFor, shell } from "@/lib/locale";
export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/id/") ? "id" : "en";
  return (
    <div className="page-intro">
      <p className="eyebrow">404</p>
      <h1>{locale === "id" ? "Halaman tidak ditemukan" : "Page not found"}</h1>
      <Link className="quiet-link" href={pathFor(locale)}>
        {shell[locale].home}
      </Link>
    </div>
  );
}
