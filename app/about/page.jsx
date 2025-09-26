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
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Місцеположення</h2>
          <p className={styles.paragraph}>
            Ми знаходимося за адресою: м. Київ, вул. Прикладна, 12. Запрошуємо
            відвідати наш магазин або скористатися доставкою.
          </p>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.123456!2d30.123456!3d50.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c1234567890%3A0xabcdef1234567890!2z0J3QsNC30LAg0JLQtdC90YvQuSDQvtC70YzQvdC-!5e0!3m2!1suk!2sua!4v1691234567890!5m2!1suk!2sua"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </section>
    </main>
  );
}
