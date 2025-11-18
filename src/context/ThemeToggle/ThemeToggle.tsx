"use client";

import { useTheme } from "@/src/context/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.iconBtn}
      onClick={toggleTheme}
      aria-label="Зміна теми"
    >
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} color="#fff" />}
    </button>
  );
}
