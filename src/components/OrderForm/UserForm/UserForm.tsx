"use client";

import React from "react";
import styles from "../UserForm/UserForm.module.css";

interface UserFormProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserForm({ formData, handleChange }: UserFormProps) {
  return (
    <>
      <label className={styles.label}>
        Ім&apos;я:
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Іван"
          pattern="[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\s]+"
          title="Вводьте тільки літери"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.label}>
        Телефон:
        <input
          className={styles.input}
          type="tel"
          name="phone"
          placeholder="+380..."
          pattern="[0-9+]*"
          maxLength={13}
          title="Вводьте лише цифри та знак +"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.label}>
        Email:
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        Адреса доставки:
        <input
          className={styles.input}
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.checkboxLabel}>
        <input type="checkbox" name="consent" required /> Я згоден(на) на
        обробку персональних даних
      </label>
    </>
  );
}
