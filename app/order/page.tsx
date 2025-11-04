"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./order.module.css";
import toast from "react-hot-toast";
import { products } from "../../data/products";
import { SiTelegram, SiViber } from "react-icons/si";
import Loader from "@/src/components/Loader/Loader";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Обгортка для хуку useSearchParams
function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Формування cartItems ---
  const productId = searchParams.get("id");
  const quantityParam = Number(searchParams.get("quantity") || 1);

  // Продукт із query-параметрів
  const singleProduct = productId
    ? products.find((p) => p.id === productId)
    : null;

  const cartItemsFromQuery: CartItem[] = singleProduct
    ? [
        {
          id: singleProduct.id,
          name: singleProduct.name,
          price: singleProduct.price,
          quantity: quantityParam,
        },
      ]
    : [];

  // Кошик із localStorage
  const storedCart =
    typeof window !== "undefined" ? localStorage.getItem("cart") : null;
  const cartItems: CartItem[] = storedCart
    ? JSON.parse(storedCart)
    : cartItemsFromQuery;

  // --- Генерація посилань для Viber/Telegram ---
  const generateMessageLink = (
    cart: CartItem[],
    messenger: "viber" | "telegram"
  ) => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const message = cart
      .map(
        (item) =>
          `${item.name} (${item.id}) — ${item.quantity} шт × ${item.price} грн`
      )
      .join("\n");

    const fullMessage = `🛒 Нове замовлення:\n\n👤 Ім’я: ${formData.name}\n📞 Телефон: ${formData.phone}\n🏠 Адреса: ${formData.address}\n📧 Email: ${formData.email || "-"}\n\nТовари:\n${message}\n\n💰 Загальна сума: ${total} грн`;

    if (messenger === "viber") {
      return `viber://chat?number=+380XXXXXXXXX&text=${encodeURIComponent(
        fullMessage
      )}`;
    }

    if (messenger === "telegram") {
      return `https://t.me/knc_d?text=${encodeURIComponent(fullMessage)}`;
    }

    return "#";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Кошик порожній! Додайте товари перед замовленням.");
      return;
    }

    const now = new Date().toLocaleString();

    // plain-text лист
    const message = `
🕒 Замовлення створено: ${now}

👤 Ім’я: ${formData.name}
📞 Телефон: ${formData.phone}
🏠 Адреса: ${formData.address}
📧 Email: ${formData.email || "не вказано"}

📦 Товари:
${cartItems
  .map(
    (item, index) =>
      `${index + 1}. ${item.name} (${item.id})
       Кількість: ${item.quantity} шт
       Ціна за одиницю: ${item.price} грн
       Підсумок: ${item.quantity * item.price} грн`
  )
  .join("\n------------------------\n")}

💰 Загальна сума: ${cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )} грн
`;

    const dataToSend = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      subject: "Нове замовлення з сайту",
      from_name: formData.name,
      from_email: formData.email || "no-email",
      message,
    };

    try {
      setLoading(true);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();
      setLoading(false);

      if (result.success) {
        toast.success("Замовлення успішно відправлено!");
        if (!productId) {
          localStorage.removeItem("cart");
          window.dispatchEvent(new Event("cartUpdated"));
        }
        router.push("/order/success");
      } else {
        toast.error("Не вдалося відправити замовлення. Спробуйте пізніше.");
      }
    } catch {
      setLoading(false);
      toast.error("Помилка з'єднання або мережі.");
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

        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="consent" required /> Я згоден(на) на
          обробку персональних даних
        </label>

        <button type="submit" className={styles.submitBtn}>
          {loading ? "Відправка..." : "Надіслати замовлення"}
        </button>
      </form>

      {cartItems.length > 0 && (
        <p className={styles.quickLink}>
          Або швидко:
          <a
            href={generateMessageLink(cartItems, "telegram")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiTelegram size={16} color="#0088cc" /> Telegram
          </a>
          <a
            href={generateMessageLink(cartItems, "viber")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiViber size={16} color="#665cac" /> Viber
          </a>
        </p>
      )}
    </main>
  );
}

// Головна сторінка з Suspense
export default function OrderPage() {
  return (
    <Suspense fallback={<Loader />}>
      <OrderForm />
    </Suspense>
  );
}
