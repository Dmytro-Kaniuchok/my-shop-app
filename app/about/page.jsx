"use client";

import styles from "./About.module.css";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";

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
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Про нас</h1>
        </div>
      </section>
      <section className={styles.content}>
        <h2 className={styles.sectionTitle}>Хто ми?</h2>

        <p className={styles.paragraph}>
          Ми – магазин автозапчастин та комплектуючих для сільськогосподарської
          техніки. Пропонуємо широкий асортимент деталей для вашого автомобіля,
          трактора, комбайна та іншої техніки. Наша мета – забезпечити клієнтів
          якісними запчастинами швидко, зручно та вигідно.
        </p>

        <h2 className={styles.sectionTitle}>Наша місія</h2>
        <p className={styles.paragraph}>
          Ми прагнемо зробити процес покупки запчастин максимально простим та
          надійним. Кожен клієнт отримує не лише товар, а й професійну
          консультацію щодо підбору потрібної деталі для авто чи техніки.
        </p>

        <h2 className={styles.sectionTitle}>Чому обирають нас</h2>
        <ul className={styles.list}>
          <li>✅ Широкий вибір запчастин для авто та сільгосптехніки.</li>
          <li>✅ Якість і надійність запчастин.</li>
          <li>✅ Швидка доставка та зручні способи оплати.</li>
          <li>✅ Прозорі ціни і чесність у роботі.</li>
        </ul>

        <h2 className={styles.sectionTitle}>Наша команда</h2>
        <p className={styles.paragraph}>
          Команда професіоналів з великим досвідом у сфері автозапчастин і
          сільськогосподарської техніки завжди готова допомогти з підбором
          потрібного товару.
        </p>
        <h2 className={styles.sectionTitle}>Місцеположення</h2>
        <p className={styles.paragraph}>
          Ми знаходимося за адресою: м. Харків, вулиця Георгія Тарасенка, 12.
        </p>
        <div className={styles.mapContainer}>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d641.3837833751993!2d36.24864716962924!3d49.982575860577214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a08eb9fc515d%3A0x2d257b983b5750cc!2z0LLRg9C70LjRhtGPINCT0LXQvtGA0LPRltGPINCi0LDRgNCw0YHQtdC90LrQsCwgMTIsINCl0LDRgNC60ZbQsiwg0KXQsNGA0LrRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDYxMDAw!5e0!3m2!1sru!2sua!4v1759322536834!5m2!1sru!2sua"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
