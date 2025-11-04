"use client";

import { useState, useEffect } from "react";
import styles from "./Contact.module.css";
import Loader from "@/src/components/Loader/Loader";

export default function Contacts() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Контакти</h1>
      <p className={styles.description}>
        Зв&apos;яжіться з нами будь-яким зручним способом:
      </p>

      <ul className={styles.list}>
        <li>
          <strong>Телефон:</strong>{" "}
          <a href="tel:+380123456789">+38 (012) 345-67-89</a>
        </li>
        <li>
          <strong>Viber:</strong>{" "}
          <a href="viber://chat?number=%2B380123456789">+38 (012) 345-67-89</a>
        </li>
        <li>
          <strong>Telegram:</strong>{" "}
          <a href="https://t.me/username" target="_blank">
            t.me/username
          </a>
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:example@mail.com">example@mail.com</a>
        </li>
      </ul>
    </div>
  );
}
