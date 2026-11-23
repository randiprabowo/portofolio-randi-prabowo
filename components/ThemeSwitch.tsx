"use client";
import { shell, type Locale } from "@/lib/locale";
import { selectTheme, useTheme } from "./useTheme";

export function ThemeSwitch({ locale }: { locale: Locale }) {
  const current = useTheme();
  const labels = shell[locale];
  return (
    <div className="theme-switch" role="group" aria-label={labels.theme}>
      {(["light", "dark"] as const).map((theme) => (
        <button
          key={theme}
          type="button"
          className={`theme-option theme-${theme}`}
          aria-label={labels[theme]}
          title={labels[theme]}
          aria-pressed={current === theme}
          onClick={() => selectTheme(theme)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {theme === "light" ? (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
              </>
            ) : (
              <path d="M20.5 14A8.8 8.8 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />
            )}
          </svg>
        </button>
      ))}
    </div>
  );
}
