"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import styles from "./Thanks.module.css";

const ThanksPage = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds === 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, router]);

  return (
    <main className={styles.container}>
      <Head>
        <title>Дякуємо за замовлення!</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className={styles.card}>
        <h1 className={styles.title}>Дякуємо! ✅</h1>
        <p className={styles.message}>
          Ми отримали ваше замовлення та скоро зв&apos;яжемося з вами.
        </p>
        <div className={styles.redirect}>
          <span>Вас буде переадресовано на головну через </span>
          <span className={styles.timer}>{seconds}</span>
          <span> секунд</span>
        </div>
        <div
          className={styles.progressBar}
          style={{ width: `${((15 - seconds) / 15) * 100}%` }}
        />
      </div>
    </main>
  );
};

export default ThanksPage;
