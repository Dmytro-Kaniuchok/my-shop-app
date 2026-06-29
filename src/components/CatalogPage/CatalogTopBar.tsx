"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CatalogTopBar.module.css";

const SORT_OPTIONS = [
  { value: "default", label: "За замовчуванням", group: "Сортування" },
  { value: "asc", label: "Спочатку дешевші", group: "Сортування" },
  { value: "desc", label: "Спочатку дорожчі", group: "Сортування" },
  { value: "popular", label: "Популярні", group: "Популярність" },
  { value: "new", label: "Нові надходження", group: "Популярність" },
  { value: "rating", label: "За рейтингом", group: "Популярність" },
];

interface Props {
  count: number;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  activeFilterCount: number;
  onOpenFilters: () => void;
}

export default function CatalogTopBar({
  count,
  sortOrder,
  setSortOrder,
  activeFilterCount,
  onOpenFilters,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    SORT_OPTIONS.find((o) => o.value === sortOrder) ?? SORT_OPTIONS[0];

  const groups = SORT_OPTIONS.reduce<Record<string, typeof SORT_OPTIONS>>(
    (acc, opt) => {
      (acc[opt.group] ??= []).push(opt);
      return acc;
    },
    {},
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={styles.topBar}>
      <h1 className={styles.title}>
        Знайдено <span className={styles.count}>{count}</span> товарів
      </h1>

      <div className={styles.controls}>
        {/* Кнопка фільтрів — тільки mobile */}
        <button
          className={styles.filterToggle}
          onClick={onOpenFilters}
          aria-label="Відкрити фільтри"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="12" y1="18" x2="20" y2="18" />
          </svg>
          Фільтри
          {activeFilterCount > 0 && (
            <span className={styles.filterBadge}>{activeFilterCount}</span>
          )}
        </button>

        {/* Сортування */}
        <div className={styles.dropdownWrap} ref={ref}>
          <button
            className={`${styles.sortBtn} ${open ? styles.sortBtnOpen : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 6h18M7 12h10M11 18h2" />
            </svg>
            <span>{current.label}</span>
            <svg
              className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {open && (
            <ul className={styles.menu} role="listbox">
              {Object.entries(groups).map(([group, opts], gi) => (
                <li key={group}>
                  {gi > 0 && <div className={styles.menuDivider} />}
                  <span className={styles.menuGroup}>{group}</span>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {opts.map((opt) => (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={sortOrder === opt.value}
                        className={`${styles.menuItem} ${sortOrder === opt.value ? styles.menuItemSelected : ""}`}
                        onClick={() => {
                          setSortOrder(opt.value);
                          setOpen(false);
                        }}
                      >
                        {opt.label}
                        {sortOrder === opt.value && (
                          <svg
                            className={styles.checkmark}
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            aria-hidden="true"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
