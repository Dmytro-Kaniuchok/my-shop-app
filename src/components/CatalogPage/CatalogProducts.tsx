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
      <div className={styles.noResultsWrapper}>
        <p className={styles.noResults}>
          За вашим запитом нічого не знайдено. Спробуйте змінити пошуковий запит
          або скинути фільтри.
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
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Завантажити ще
        </button>
      )}
    </>
  );
}
