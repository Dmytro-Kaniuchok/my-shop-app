"use client";

import styles from "./About.module.css";
import { useState, useEffect } from "react";
import Loader from "@/src/components/Loader/Loader";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Про нас</h1>
          <p className={styles.heroSubtitle}>
            Ми забезпечуємо якісні запчастини для сільськогосподарської техніки
            та автомобілів
          </p>
        </div>
      </section>

      {/* Контент */}
      <section className={styles.content}>
        {/* Хто ми */}
        <div className={styles.block}>
          <h2 className={styles.sectionTitle}>Хто ми?</h2>
          <p className={styles.paragraph}>
            Ми – магазин автозапчастин та комплектуючих для
            сільськогосподарської техніки. Пропонуємо широкий асортимент деталей
            – швидко, зручно та вигідно.
          </p>
        </div>

        {/* Наша місія */}
        <div className={styles.block}>
          <h2 className={styles.sectionTitle}>Наша місія</h2>
          <p className={styles.paragraph}>
            Ми прагнемо зробити покупку запчастин максимально простою й
            надійною, забезпечивши кожному клієнту професійну консультацію.
          </p>
        </div>

        {/* Чому обирають нас */}
        <div className={styles.block}>
          <h2 className={styles.sectionTitle}>Чому обирають нас?</h2>
          <ul className={styles.list}>
            <li>Широкий вибір запчастин для авто та техніки</li>
            <li>Гарантована якість та надійність</li>
            <li>Швидка доставка по Україні</li>
            <li>Чесні ціни і відкритість</li>
          </ul>
        </div>

        {/* Мапа */}
        <div className={`${styles.block} ${styles.mapGrid}`}>
          <div>
            <h2 className={styles.sectionTitle}>Місцеположення</h2>
            <p className={styles.paragraph}>
              Ми знаходимося за адресою:
              <br />
              <strong>м. Харків, вул. Георгія Тарасенка, 12</strong>
            </p>
            <a
              href="https://www.google.com/maps/place/%D0%B3%D0%B5%D0%BE%D1%80%D0%B3%D1%96%D1%8F+%D1%82%D0%B0%D1%80%D0%B0%D1%81%D0%B5%D0%BD%D0%BA%D0%B0,+12,+%D0%A5%D0%B0%D1%80%D0%BA%D1%96%D0%B2,+%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapButton}
            >
              Відкрити у Google Maps
            </a>
          </div>

          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d641.3837833751993!2d36.24864716962924!3d49.982575860577214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a08eb9fc515d%3A0x2d257b983b5750cc!2z0LLRg9C70LjRhtGPINCT0LXQvtGA0LPRltGPINCi0LDRgNCw0YHQtdC90LrQsCwgMTIsINCl0LDRgNC60ZbQsiwg0KXQsNGA0LrRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDYxMDAw!5e0!3m2!1sru!2sua!4v1759322536834!5m2!1sru!2sua"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
