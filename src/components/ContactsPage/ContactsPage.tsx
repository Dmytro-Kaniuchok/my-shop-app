"use client";

import { useState, useEffect } from "react";
import { SiTelegram, SiViber } from "react-icons/si";
import { FiPhone, FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { LuClock } from "react-icons/lu";
import styles from "./ContactsPage.module.css";
import Loader from "@/src/components/Loader/Loader";
import toast from "react-hot-toast";

export default function ContactsPage() {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    message: "",
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors = {
      name: "",
      contact: "",
      message: "",
    };

    // Імʼя
    if (formData.name.trim().length < 2) {
      newErrors.name = "Введіть мінімум 2 символи";
    }

    // Email або телефон
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    if (
      !emailRegex.test(formData.contact) &&
      !phoneRegex.test(formData.contact)
    ) {
      newErrors.contact = "Введіть коректний email або телефон";
    }

    // Повідомлення
    if (formData.message.trim().length < 10) {
      newErrors.message = "Введіть мінімум 10 символів";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.contact && !newErrors.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Форма валідна:", formData);

      toast.success(
        <div>
          <div style={{ fontSize: "16px", fontWeight: 700 }}>
            Повідомлення надіслано!
          </div>
          <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "2px" }}>
            Ми зв&apos;яжемося з вами найближчим часом.
          </div>
        </div>,
      );

      // Очистка форми
      setFormData({
        name: "",
        contact: "",
        message: "",
      });

      setErrors({
        name: "",
        contact: "",
        message: "",
      });
    } else {
      toast.error(
        "Перевірте правильність заповнення форми та спробуйте ще раз.",
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Контакти</h1>
        <p>Зв&apos;яжіться з нами будь-яким зручним способом</p>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.infoCard}>
            <FiPhone />
            <div>
              <p>Телефон</p>
              <span>+38 050 123-45-67</span>
              <span>+38 012 345-67-89</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <FiMail />
            <div>
              <p>Email</p>
              <span>info@agroauto.ua</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <GrLocation />
            <div>
              <p>Адреса</p>
              <span>м. Харків, вул. Георгія Тарасенка, 12</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <LuClock />
            <div>
              <p>Графік роботи</p>
              <span>Пн-Пт: 10:00-18:00</span>
              <span>Сб-Нд: вихідний</span>
            </div>
          </div>

          <div className={styles.messengers}>
            <a href="viber://chat?number=%2B380123456789">
              <SiViber /> Viber
            </a>
            <a href="https://t.me/username" target="_blank">
              <SiTelegram /> Telegram
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <h3>Форма зворотного зв&apos;язку</h3>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Ім&apos;я:</label>
            <input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введіть ваше ім'я"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}

            <label htmlFor="contact">Контакт (телефон або email):</label>
            <input
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="+38 (0XX) XXX-XX-XX або email@example.com"
            />
            {errors.contact && (
              <span className={styles.error}>{errors.contact}</span>
            )}

            <label htmlFor="message">Повідомлення:</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              maxLength={200}
              placeholder="Напишіть ваше повідомлення..."
            />
            {errors.message && (
              <span className={styles.error}>{errors.message}</span>
            )}

            <button type="submit">Надіслати повідомлення</button>
          </form>
        </div>
      </div>
    </div>
  );
}
