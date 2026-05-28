"use client";

import { useTheme } from "@/src/Theme/ThemeProvider";
import { LuSun, LuMoon } from "react-icons/lu";
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
        <LuMoon size={size} />
      ) : (
        <LuSun size={size} color="#fff" />
      )}
    </button>
  );
}
