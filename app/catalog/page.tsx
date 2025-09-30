"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { products } from "../../data/products.js";
import styles from "./catalog.module.css";
import Loader from "@/components/Loader/Loader";

export default function Catalog() {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
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
              <span>
                {p.name} — {p.price} грн
              </span>
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
