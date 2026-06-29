"use client";

import { useEffect, useRef, useState } from "react";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { useTheme } from "@/src/Theme/ThemeProvider";
import styles from "./ThemeToggle.module.css";

const themeOptions = [
  { value: "system", label: "Системна" },
  { value: "light", label: "Світла" },
  { value: "dark", label: "Темна" },
] as const;

type ThemeMode = (typeof themeOptions)[number]["value"];

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = themeOptions.find(
    (option) => option.value === themeMode,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelectTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownWrap} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.themeBtn} ${isOpen ? styles.themeBtnOpen : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Вибір теми"
        aria-expanded={isOpen}
      >
        <span>{currentTheme?.label ?? "Системна"}</span>

        <LuChevronDown
          size={16}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          <span className={styles.menuGroup}>Тема</span>

          {themeOptions.map((option) => {
            const isSelected = option.value === themeMode;

            return (
              <li
                key={option.value}
                className={`${styles.menuItem} ${
                  isSelected ? styles.menuItemSelected : ""
                }`}
                onClick={() => handleSelectTheme(option.value)}
              >
                <span>{option.label}</span>

                {isSelected && (
                  <LuCheck size={16} className={styles.checkmark} />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
