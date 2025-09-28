import Head from "next/head";
import styles from "./Thanks.module.css";

const ThanksPage = () => {
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
    </main>
  );
};

export default ThanksPage;
