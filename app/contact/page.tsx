"use client";

import { useState, useEffect } from "react";
import { SiTelegram, SiViber } from "react-icons/si";
import { FiPhone, FiMail } from "react-icons/fi";
import styles from "./Contact.module.css";
import Loader from "@/src/components/Loader/Loader";

export default function Contacts() {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Контакти</h1>
      <div className={styles.cards}>
        <a href="tel:+380123456789" className={styles.card}>
          <FiPhone className={styles.icon} />
          <span>+38 (012) 345-67-89</span>
        </a>
        <a href="mailto:example@mail.com" className={styles.card}>
          <FiMail className={styles.icon} />
          <span>example@mail.com</span>
        </a>
        <a href="viber://chat?number=%2B380123456789" className={styles.card}>
          <SiViber className={styles.icon} />
          <span>Viber</span>
        </a>
        <a href="https://t.me/username" target="_blank" className={styles.card}>
          <SiTelegram className={styles.icon} />
          <span>Telegram</span>
        </a>
      </div>
    </div>
  );
}
