"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  themeMode: "system",
  setThemeMode: () => {},
});

const getSystemTheme = (): Theme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getSavedThemeMode = (): ThemeMode => {
  const savedThemeMode = localStorage.getItem("themeMode");

  if (
    savedThemeMode === "light" ||
    savedThemeMode === "dark" ||
    savedThemeMode === "system"
  ) {
    return savedThemeMode;
  }

  return "system";
};

const getThemeFromMode = (mode: ThemeMode): Theme => {
  if (mode === "system") {
    return getSystemTheme();
  }

  return mode;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedMode = getSavedThemeMode();
    const nextTheme = getThemeFromMode(savedMode);

    setThemeModeState(savedMode);
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);

    localStorage.removeItem("theme");
  }, []);

  useEffect(() => {
    if (themeMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const nextTheme = event.matches ? "dark" : "light";

      setTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    const nextTheme = getThemeFromMode(mode);

    setThemeModeState(mode);
    setTheme(nextTheme);

    localStorage.setItem("themeMode", mode);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
