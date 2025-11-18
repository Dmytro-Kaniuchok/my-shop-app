"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import styles from "./ThanksPage.module.css";

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
        {/* Анімована галочка */}
        <div className={styles.checkmarkWrapper}>
          <svg className={styles.checkmark} viewBox="0 0 52 52">
            <circle
              className={styles.checkmarkCircle}
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className={styles.checkmarkCheck}
              d="M14 27l7 7 16-16"
              fill="none"
            />
          </svg>
        </div>

        <h1 className={styles.title}>Дякуємо!</h1>
        <p className={styles.message}>
          Ми отримали ваше замовлення та скоро зв&apos;яжемося з вами.
        </p>

        <div className={styles.redirect}>
          <span>Вас буде переадресовано на головну через </span>
          <span className={styles.timer}>{seconds}</span>
          <span> секунд</span>
        </div>

        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${((15 - seconds) / 15) * 100}%` }}
          />
        </div>
      </div>
    </main>
  );
};

export default ThanksPage;
