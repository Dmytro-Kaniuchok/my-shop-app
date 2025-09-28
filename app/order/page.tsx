"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./order.module.css";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Беремо кошик з localStorage
    const storedCart = localStorage.getItem("cart");
    const cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    if (cartItems.length === 0) {
      toast.error("Кошик порожній! Додайте товари перед замовленням.");
      return;
    }

    // Формуємо дані для відправки
    const dataToSend = {
      "Ім’я": formData.name,
      "Номер телефону": formData.phone,
      Email: formData.email,
      "Адреса доставки": formData.address,
      Товари: cartItems
        .map((item) => `${item.name} x${item.quantity} — ${item.price} грн`)
        .join("\n"),
      "Загальна сума": cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(dataToSend), // Відправляємо cart + total
      });

      if (res.ok) {
        toast.success("Замовлення відправлено!");
        localStorage.removeItem("cart");
        router.push("/order/success");
      } else {
        toast.error("Сталася помилка при відправці");
      }
    } catch {
      toast.error("Помилка зʼєднання");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Оформлення замовлення</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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

        <button type="submit" className={styles.submitBtn}>
          Надіслати замовлення
        </button>
      </form>
    </main>
  );
};

export default OrderPage;
