"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products } from "../../data/products.js";
import Loader from "@/components/Loader/Loader";
import styles from "./catalog.module.css";

export default function Catalog() {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);
  const [loadingItem, setLoadingItem] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  const handleClick = (id: string) => {
    setLoadingItem(true);
    router.push(`/product/${id}`);
  };

  if (loading || loadingItem) {
    return <Loader />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.div}>
        <h1 className={styles.title}>Каталог товарів</h1>
      </div>

      <ul className={styles.list}>
        {products.slice(0, visibleCount).map((p) => (
          <li key={p.id} className={styles.item}>
            <div className={styles.link} onClick={() => handleClick(p.id)}>
              <img
                src={p.image}
                alt={p.name}
                className={styles.image}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://dummyimage.com/200x200/fff/000000&text=No+Image&";
                }}
              />
              <div className={styles.productInfo}>
                <span className={styles.productName}>{p.name}</span>
                <span className={styles.productPrice}>{p.price} грн</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {visibleCount < products.length && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Завантажити ще
        </button>
      )}
    </main>
  );
}
