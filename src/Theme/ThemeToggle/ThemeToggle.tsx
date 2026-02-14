"use client";

import { useTheme } from "@/src/Theme/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  size?: number;
}

export default function ThemeToggle({ size = 24 }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.iconBtn}
      onClick={toggleTheme}
      aria-label="Зміна теми"
    >
      {theme === "light" ? (
        <Moon size={size} />
      ) : (
        <Sun size={size} color="#fff" />
      )}
    </button>
  );
}
