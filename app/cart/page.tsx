"use client";

import { useEffect, useState } from "react";
import styles from "./cart.module.css";
import Link from "next/link";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Завантаження кошика з localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Змінити кількість товару
  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return; // мінімум 1
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Видалення товару
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Товар видалено з кошика");
  };

  // Очистити весь кошик
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.success("Кошик очищено!");
  };

  // Загальна сума
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className={styles.container}>
      {cartItems.length > 0 && <h1 className={styles.title}>Ваш кошик</h1>}

      {cartItems.length === 0 ? (
        <p className={styles.searchWrapper}>
          <span className={styles.emptyText}>Кошик порожній</span>{" "}
          <Link href="/catalog" className={styles.searchBtn}>
            Перейти до каталогу
          </Link>
        </p>
      ) : (
        <>
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.item}>
                <span className={styles.itemName}>
                  {item.name} — {item.price} грн
                </span>

                <div className={styles.qtyWrapper}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>

          <p className={styles.total}>Загалом: {totalPrice} грн</p>

          <div className={styles.btns}>
            <Link
              href="/order"
              onClick={() => toast.success("Перехід до оформлення замовлення")}
              className={styles.orderBtn}
            >
              Замовити
            </Link>

            <button className={styles.clearBtn} onClick={clearCart}>
              Очистити кошик
            </button>
          </div>
        </>
      )}
    </main>
  );
}
