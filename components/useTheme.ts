"use client";
import { useLayoutEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { lightPreference, themeStorageKey, type Theme } from "@/lib/theme";

function currentTheme(): Theme {
  const selected = document.documentElement.dataset.theme;
  if (selected === "dark" || selected === "light") return selected;
  return window.matchMedia(lightPreference).matches ? "light" : "dark";
}

let tabPreference: Theme | null = null;

function restorePreference() {
  let selected: string | null = tabPreference;
  try {
    selected ??= localStorage.getItem(themeStorageKey);
  } catch {
    /* Storage can be unavailable in restricted browser contexts. */
  }
  if (selected === "dark" || selected === "light") {
    document.documentElement.dataset.theme = selected;
  } else {
    delete document.documentElement.dataset.theme;
  }
}

function subscribe(notify: () => void) {
  const media = window.matchMedia(lightPreference);
  function syncStorage(event: StorageEvent) {
    if (event.key !== themeStorageKey && event.key !== null) return;
    tabPreference = null;
    restorePreference();
    notify();
  }
  media.addEventListener("change", notify);
  window.addEventListener("storage", syncStorage);
  window.addEventListener(themeStorageKey, notify);
  return () => {
    media.removeEventListener("change", notify);
    window.removeEventListener("storage", syncStorage);
    window.removeEventListener(themeStorageKey, notify);
  };
}

export function selectTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(themeStorageKey, theme);
    tabPreference = null;
  } catch {
    tabPreference = theme;
  }
  window.dispatchEvent(new Event(themeStorageKey));
}

export function useTheme() {
  const pathname = usePathname();
  // Locale navigation can replace <html> without rerunning its inline script.
  useLayoutEffect(() => {
    restorePreference();
    window.dispatchEvent(new Event(themeStorageKey));
  }, [pathname]);
  return useSyncExternalStore(subscribe, currentTheme, () => undefined);
}
