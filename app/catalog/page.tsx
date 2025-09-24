"use client";

import Link from "next/link";
import Head from "next/head";
import { products } from "../../data/products.js";
import styles from "./catalog.module.css";

export default function Catalog() {
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
              {p.name} — {p.price} грн
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
