export type Theme = "light" | "dark";
export const themeStorageKey = "rp-portfolio-theme";
export const lightPreference = "(prefers-color-scheme: light)";

// Runs synchronously in the document head, before any themed content can paint.
// When there is no override, CSS follows the system scheme on its own.
export const themeBootstrap = `try {
  const theme = localStorage.getItem("${themeStorageKey}");
  if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
} catch {}`;
