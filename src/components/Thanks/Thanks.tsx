"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import styles from "./Thanks.module.css";

const ThanksPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 30000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className={styles.container}>
      <Head>
        <title>Дякуємо за замовлення!</title>
        <meta name="robots" content="noindex" />
      </Head>

      <h1 className={styles.title}>Дякуємо! ✅</h1>
      <p className={styles.message}>
        Ми отримали ваше замовлення та скоро зв&apos;яжемося з вами.
      </p>
      <p className={styles.redirectNote}>
        Вас буде автоматично переадресовано на головну сторінку через 30 секунд.
      </p>
    </main>
  );
};

export default ThanksPage;
