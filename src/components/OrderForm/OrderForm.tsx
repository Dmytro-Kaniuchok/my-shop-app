"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./OrderForm.module.css";
import toast from "react-hot-toast";
import { products } from "../../../data/products";
import UserForm from "./UserForm/UserForm";
import QuickLinks from "./QuickLinks/QuickLinks";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

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

  useEffect(() => {
    const productId = searchParams.get("id");
    const quantityParam = Number(searchParams.get("quantity") || 1);
    const singleProduct = productId
      ? products.find((p) => p.id === productId)
      : null;

    const initialCart = singleProduct
      ? [
          {
            id: singleProduct.id,
            name: singleProduct.name,
            price: singleProduct.price,
            quantity: quantityParam,
          },
        ]
      : [];

    const stored =
      typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    if (stored) setCartItems(JSON.parse(stored));
    else setCartItems(initialCart);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartItems.length) return toast.error("Кошик порожній!");

    const dataToSend = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      subject: "Нове замовлення з сайту",
      from_name: formData.name,
      from_email: formData.email || "no-email",
      message: "...", // Тут можна винести генерацію повідомлення у утиліту
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
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
        router.push("/order/success");
      } else toast.error("Не вдалося відправити замовлення.");
    } catch {
      setLoading(false);
      toast.error("Помилка з'єднання або мережі.");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Оформлення замовлення</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <UserForm formData={formData} onChange={handleChange} />
        <button type="submit" className={styles.submitBtn}>
          {loading ? "Відправка..." : "Надіслати замовлення"}
        </button>
      </form>
      {isClient && cartItems.length > 0 && (
        <QuickLinks cartItems={cartItems} formData={formData} />
      )}
    </main>
  );
}
