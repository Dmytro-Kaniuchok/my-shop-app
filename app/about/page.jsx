import styles from "./About.module.css";

export default function About() {
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
          Ми – магазин автозапчастин, що пропонує широкий вибір комплектуючих
          для вашого автомобіля. Наша мета – забезпечити клієнтів якісними
          запчастинами швидко та вигідно.
        </p>

        <h2 className={styles.sectionTitle}>Наша місія</h2>
        <p className={styles.paragraph}>
          Ми прагнемо зробити процес покупки автозапчастин максимально простим
          та надійним. Кожен клієнт отримує не лише товар, а й підтримку від
          наших експертів.
        </p>

        <h2 className={styles.sectionTitle}>Наші цінності</h2>
        <ul className={styles.list}>
          <li>Якість і надійність запчастин</li>
          <li>Швидка доставка</li>
          <li>Прозорі ціни і чесність у роботі</li>
        </ul>

        <h2 className={styles.sectionTitle}>Наша команда</h2>
        <p className={styles.paragraph}>
          Команда професіоналів з великим досвідом у сфері автозапчастин завжди
          готова допомогти з підбором потрібного товару.
        </p>
      </section>
    </main>
  );
}
