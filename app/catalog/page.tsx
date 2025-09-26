"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { products } from "../../data/products.js";
import styles from "./catalog.module.css";
import Loader from "@/components/Loader/Loader";

export default function Catalog() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

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
        {products.map((p) => (
          <li key={p.id} className={styles.item}>
            <Link href={`/product/${p.id}`} className={styles.link}>
              <img src={p.image} alt={p.name} className={styles.image} />
              <span>
                {p.name} — {p.price} грн
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
