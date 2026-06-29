"use client";

import { useEffect, useRef } from "react";
import styles from "./CatalogFilters.module.css";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  brands: string[];
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  resetFilters: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  filteredCount: number;
}

const categories = [
  "Всі",
  "Фільтри",
  "Мастила",
  "Акумулятори",
  "Гальма",
  "Підшипники",
  "Двірники",
  "Свічки",
];

function FilterContent({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  toggleBrand,
  brands,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  resetFilters,
}: Omit<Props, "isOpen" | "setIsOpen">) {
  return (
    <>
      <div className={styles.filterBlock}>
        <p className={styles.filterTitle}>Пошук</p>
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Введіть назву..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.filterBlock}>
        <p className={styles.filterTitle}>Категорії</p>
        <div className={styles.categoriesList}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={
                selectedCategory === cat
                  ? styles.activeCategory
                  : styles.categoryButton
              }
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.filterBlock}>
        <p className={styles.filterTitle}>Ціна (грн)</p>
        <div className={styles.priceInputs}>
          <input
            type="number"
            value={minPrice || ""}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Від"
            className={styles.priceInput}
          />
          <span className={styles.priceSep}>—</span>
          <input
            type="number"
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="До"
            className={styles.priceInput}
          />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.filterBlock}>
        <p className={styles.filterTitle}>Бренд</p>
        <div className={styles.brandsList}>
          {brands.map((brand) => (
            <label key={brand} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <button className={styles.resetButton} onClick={resetFilters}>
        Скинути фільтри
      </button>
    </>
  );
}

function getEnding(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return "ів";
  if (mod10 === 1) return "";
  if (mod10 >= 2 && mod10 <= 4) return "и";
  return "ів";
}

export default function CatalogFilters(props: Props) {
  const {
    isOpen,
    setIsOpen,
    selectedBrands,
    selectedCategory,
    minPrice = 0,
    maxPrice,
    filteredCount,
  } = props;

  const drawerRef = useRef<HTMLDivElement>(null);

  // Підраховуємо кількість активних фільтрів для бейджу
  const activeCount =
    selectedBrands.length +
    (selectedCategory !== "Всі" ? 1 : 0) +
    (minPrice > 0 ? 1 : 0) +
    (maxPrice > 0 ? 1 : 0);

  // Блокуємо scroll body коли drawer відкритий
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Закриваємо drawer кліком на overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  // Закриваємо по Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setIsOpen]);

  return (
    <>
      {/* Сайдбар тільки desktop */}
      <aside className={styles.sidebar}>
        <FilterContent {...props} />
      </aside>

      {/* Drawer тільки mobile */}
      {isOpen && (
        <div
          className={styles.drawerOverlay}
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
          aria-label="Фільтри"
        >
          <div className={styles.drawer} ref={drawerRef}>
            <div className={styles.drawerHandle} />
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Фільтри</span>
              <button
                className={styles.drawerClose}
                onClick={() => setIsOpen(false)}
                aria-label="Закрити фільтри"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.drawerBody}>
              <FilterContent {...props} />
            </div>
            <div className={styles.drawerFooter}>
              <button
                className={styles.drawerApply}
                onClick={() => setIsOpen(false)}
              >
                Показати {filteredCount} товар{getEnding(filteredCount)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
