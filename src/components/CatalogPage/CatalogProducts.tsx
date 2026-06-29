"use client";

import ProductCard from "@/src/components/Products/ProductCard/ProductCard";
import styles from "./CatalogProducts.module.css";
import { Product } from "@/src/types/products";

interface Props {
  products: Product[];
  visibleCount: number;
  handleLoadMore: () => void;
  resetFilters: () => void;
}

export default function CatalogProducts({
  products,
  visibleCount,
  handleLoadMore,
  resetFilters,
}: Props) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          style={{ color: "#d1d5db" }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M8 11h6M11 8v6" />
        </svg>
        <p className={styles.emptyText}>Нічого не знайдено</p>
        <p className={styles.emptyHint}>
          Спробуйте змінити пошуковий запит або скинути фільтри
        </p>
        <button className={styles.resetButton} onClick={resetFilters}>
          Скинути фільтри
        </button>
      </div>
    );
  }

  return (
    <>
      <ul className={styles.list}>
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>

      {visibleCount < products.length && (
        <div className={styles.loadMoreWrap}>
          <button className={styles.loadMore} onClick={handleLoadMore}>
            Завантажити ще
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
