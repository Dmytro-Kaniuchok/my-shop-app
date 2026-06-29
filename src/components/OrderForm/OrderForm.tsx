"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./OrderForm.module.css";
import toast from "react-hot-toast";
import UserForm from "./UserForm/UserForm";
import QuickLinks from "./QuickLinks/QuickLinks";
import { Product } from "@/src/types/products";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchCart = async () => {
      const productId = searchParams.get("id");
      const quantityParam = Number(searchParams.get("quantity") || 1);

      try {
        if (productId) {
          const res = await fetch(`${API_URL}/products/${productId}`);
          const product: Product = await res.json();
          setCartItems([
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: quantityParam,
            },
          ]);
        } else {
          const stored = localStorage.getItem("cart");
          if (stored) setCartItems(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchCart();
  }, [searchParams]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartItems.length) return toast.error("Кошик порожній!");

    const now = new Date().toLocaleString();
    const message = `🕒 Замовлення створено: ${now}

👤 Ім'я: ${formData.name}
📞 Телефон: ${formData.phone}
🏠 Адреса: ${formData.address}
📧 Email: ${formData.email || "не вказано"}

📦 Товари:
${cartItems
  .map(
    (item, i) =>
      `${i + 1}. ${item.name} (${item.id})\n   Кількість: ${item.quantity} шт\n   Ціна: ${item.price} грн\n   Підсумок: ${item.quantity * item.price} грн`,
  )
  .join("\n---\n")}

💰 Загальна сума: ${total} грн`;

    const dataToSend = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      subject: "Нове замовлення з сайту",
      from_name: formData.name,
      ...(formData.email && { from_email: formData.email }),
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

      if (result.success) {
        toast.success("Замовлення успішно відправлено!");
        if (!searchParams.get("id")) {
          localStorage.removeItem("cart");
          window.dispatchEvent(new Event("cartUpdated"));
        }
        router.push("/order/success");
      } else toast.error("Не вдалося відправити замовлення.");
    } catch {
      toast.error("Помилка з'єднання або мережі.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.formCol}>
          <h1 className={styles.title}>Оформлення замовлення</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <UserForm formData={formData} handleChange={handleChange} />
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Відправка..." : "Надіслати замовлення"}
            </button>
          </form>

          {isClient && cartItems.length > 0 && (
            <QuickLinks cartItems={cartItems} formData={formData} />
          )}
        </div>

        {isClient && cartItems.length > 0 && (
          <div className={styles.summaryCol}>
            <h2 className={styles.summaryTitle}>Ваше замовлення</h2>

            <ul className={styles.itemsList}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>{item.quantity} шт</span>
                  </div>
                  <span className={styles.itemPrice}>
                    {item.price * item.quantity} грн
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.divider} />

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Доставка</span>
              <span className={styles.totalDelivery}>узгоджується</span>
            </div>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Разом</span>
              <span className={styles.totalPrice}>{total} грн</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
