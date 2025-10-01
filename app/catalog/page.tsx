"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { products } from "../../data/products.js";
import styles from "./catalog.module.css";
import Loader from "@/components/Loader/Loader";

export default function Catalog() {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={styles.container}>
      <Head>
        <title className={styles.title}>Каталог автозапчастин</title>
        <meta
          name="description"
          content="Каталог автозапчастин: ціни, описи, бренди. Оформлення замовлення онлайн."
        />
      </Head>

      <div className={styles.div}>
        <h1 className={styles.title}>Каталог товарів</h1>
      </div>

      <ul className={styles.list}>
        {products.slice(0, visibleCount).map((p) => (
          <li key={p.id} className={styles.item}>
            <Link href={`/product/${p.id}`} className={styles.link}>
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
            </Link>
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
