"use client";

import styles from "./CatalogFilters.module.css";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  selectedBrands: string[];
  toggleBrand: (brand: string) => void;

  brands: string[];

  maxPrice: number;
  setMaxPrice: (value: number) => void;

  resetFilters: () => void;
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

export default function CatalogFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  toggleBrand,
  brands,
  maxPrice,
  setMaxPrice,
  resetFilters,
}: Props) {
  return (
    <aside className={styles.sidebar}>
      {/* SEARCH */}
      <div className={styles.filterBlock}>
        <p className={styles.filterTitle}>Пошук</p>

        <input
          className={styles.searchInput}
          type="text"
          placeholder="Введіть назву..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CATEGORIES */}
      <div className={styles.filterBlock}>
        <p className={styles.filterTitle}>Категорії</p>

        <div className={styles.categoriesList}>
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? styles.activeCategory
                  : styles.categoryButton
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className={styles.filterBlock}>
        <p className={styles.filterTitle}>Ціна (грн)</p>

        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="Від"
            className={styles.priceInput}
          />

          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="До"
            className={styles.priceInput}
          />
        </div>
      </div>

      {/* BRANDS */}
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

      {/* RESET */}
      <button className={styles.resetButton} onClick={resetFilters}>
        Скинути фільтри
      </button>
    </aside>
  );
}
