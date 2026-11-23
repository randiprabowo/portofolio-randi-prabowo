import type { Metadata } from "next";
import "../theme.css";
import { themeBootstrap } from "@/lib/theme";
export { viewport } from "next-sanity/studio";
export const metadata: Metadata = {
  title: "Portfolio Studio",
  robots: { index: false, follow: false },
};
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
