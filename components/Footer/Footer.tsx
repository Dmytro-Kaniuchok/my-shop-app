"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { SiTelegram, SiViber, SiGmail } from "react-icons/si";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "ok" | "error" | "loading">(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nav = [
    { href: "/", label: "Головна" },
    { href: "/about", label: "Про нас" },
    { href: "/catalog", label: "Каталог" },
    { href: "/contact", label: "Контакти" },
  ];

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("ok");
      setEmail("");
    }, 900);
  }

  function scrollTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <Link href="/" className={styles.brand}>
            Магазин
          </Link>
          <p className={styles.brandText}>
            Запчастини для вас швидко, вигідно та надійно!
          </p>

          <div className={styles.socials}>
            <a
              href="https://web.telegram.org/k/"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <SiTelegram size={20} color="#0088cc" />
            </a>
            <a
              href="#"
              aria-label="Viber"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <SiViber size={20} color="#665cac" />
            </a>
            <a
              href="https://workspace.google.com/intl/uk/gmail/"
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <SiGmail size={20} color="#D14836" />
            </a>
          </div>
        </div>

        <div className={styles.supportSection}>
          <h4 className={styles.sectionTitle}>Навігація</h4>
          <ul className={styles.list}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.orderSection}>
          <h4 className={styles.sectionTitle}>Підписка на розсилку</h4>
          <form onSubmit={handleSubscribe} className={styles.form}>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введіть email"
              className={styles.input}
            />
            <button
              type="submit"
              className={styles.button}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Підписка..." : "Підписатися"}
            </button>
          </form>
          <p
            className={`${styles.status} ${
              status === "ok"
                ? styles.success
                : status === "error"
                  ? styles.error
                  : ""
            }`}
          >
            {status === "ok"
              ? "Дякуємо! Ви підписані."
              : status === "error"
                ? "Введіть коректний email."
                : "Отримуйте оновлення та акції на email."}
          </p>
        </div>
      </div>

      {mounted && (
        <>
          <div className={styles.bottomBar}>
            <div className={styles.bottomInner}>
              <p className={styles.copy}>
                © {new Date().getFullYear()} Магазин. Всі права захищені.
              </p>
            </div>
          </div>
        </>
      )}
    </footer>
  );
}
