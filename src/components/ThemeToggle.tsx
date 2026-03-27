"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";
type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label="Toggle night mode"
      className="inline-flex cursor-pointer items-center justify-center text-foreground transition-opacity hover:opacity-80"
    >
      {/* simple crescent icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.5 14.5c-1.2.6-2.6.9-4.1.9-4.9 0-8.8-4-8.8-8.8 0-1.5.4-2.9 1-4.1C5.2 3.6 3 6.4 3 9.8 3 15 7.2 19.2 12.4 19.2c3.5 0 6.4-2.1 8.1-4.7Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

