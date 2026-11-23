import type { MetadataRoute } from "next";
import { origin } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview")
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    sitemap: origin + "/sitemap.xml",
  };
}
