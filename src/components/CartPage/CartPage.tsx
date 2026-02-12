"use client";

import { useEffect, useState } from "react";
import styles from "./CartPage.module.css";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";

interface CartItem {
  id: string;
  image: string;
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
    if (newQty < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item,
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Видалення товару
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Товар видалено з кошика");
  };

  // Очистити весь кошик
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Кошик очищено!");
  };

  // Загальна сума
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className={styles.container}>
      {cartItems.length > 0 && <h1 className={styles.title}>Ваш кошик</h1>}

      {cartItems.length === 0 ? (
        <div className={styles.searchWrapper}>
          <FaCartPlus size={100} color="#dadde1" />
          <p className={styles.searchText}>Кошик порожній</p>
          <Link href="/catalog" className={styles.searchBtn}>
            Перейти до каталогу
          </Link>
        </div>
      ) : (
        <>
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  {/* Маленьке зображення */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className={styles.itemImage}
                  />

                  <span className={styles.itemName}>
                    {item.name} - {item.price} грн
                  </span>
                </div>

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
