"use client";

import styles from "./CatalogTopBar.module.css";

interface Props {
  count: number;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

export default function CatalogTopBar({
  count,
  sortOrder,
  setSortOrder,
}: Props) {
  return (
    <div className={styles.topBar}>
      <h1 className={styles.title}>Знайдено {count} товарів</h1>

      <select
        className={styles.sortSelect}
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="default">Всі товари</option>

        <option value="asc">Від дешевих до дорогих</option>

        <option value="desc">Від дорогих до дешевих</option>
      </select>
    </div>
  );
}
