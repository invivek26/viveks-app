import { Moon, Sun } from "lucide-react";

import { Button } from "#/components/ui/button";

const storageKey = "viveks-theme:v1";

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;

  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // Theme persistence is optional when storage is unavailable.
  }
}

export function ThemeToggle() {
  return (
    <Button
      aria-label="Toggle color theme"
      className="theme-toggle"
      onClick={toggleTheme}
      size="icon"
      type="button"
      variant="ghost"
    >
      <Sun aria-hidden="true" className="theme-icon theme-icon-sun" />
      <Moon aria-hidden="true" className="theme-icon theme-icon-moon" />
    </Button>
  );
}

function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
  const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduceMotion) {
    applyTheme(nextTheme);
    return;
  }

  const bounds = event.currentTarget.getBoundingClientRect();
  document.documentElement.style.setProperty("--theme-x", `${bounds.left + bounds.width / 2}px`);
  document.documentElement.style.setProperty("--theme-y", `${bounds.top + bounds.height / 2}px`);
  document.startViewTransition(() => applyTheme(nextTheme));
}
