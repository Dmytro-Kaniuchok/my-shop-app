"use client";

import { useEffect, useState } from "react";
import styles from "./CartPage.module.css";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
  brand: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item,
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Товар видалено з кошика");
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className={styles.container}>
      {cartItems.length > 0 && <h1 className={styles.title}>Кошик</h1>}

      {cartItems.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.iconWrapper}>
            <ShoppingCart className={styles.emptyIcon} />
          </div>
          <p className={styles.searchText}>Кошик порожній</p>
          <p className={styles.searchDesc}>
            Додайте товари до кошика, щоб продовжити покупки
          </p>
          <Link href="/catalog" className={styles.searchBtn}>
            Перейти до каталогу
          </Link>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          {/* LEFT */}
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.item}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={70}
                  height={70}
                  className={styles.image}
                />

                <div className={styles.info}>
                  <p className={styles.name}>{item.name}</p>
                  <span className={styles.meta}>
                    {item.brand} • {item.sku}
                  </span>

                  <div className={styles.qty}>
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
                </div>

                <div className={styles.right}>
                  <button
                    className={styles.remove}
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>

                  <span className={styles.price}>
                    {item.price * item.quantity} грн
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* RIGHT */}
          <div className={styles.summary}>
            <h2>Підсумок замовлення</h2>

            <div className={styles.row}>
              <span>Товарів:</span>
              <span className={styles.spans}>{cartItems.length}</span>
            </div>

            <div className={styles.row}>
              <span>Сума:</span>
              <span className={styles.spans}>{totalPrice} грн</span>
            </div>

            <div className={styles.row}>
              <span>Доставка:</span>
              <span className={styles.spans}>узгоджується</span>
            </div>

            <div className={styles.total}>
              <span className={styles.spans}>Разом:</span>
              <span>{totalPrice} грн</span>
            </div>

            <Link href="/order" className={styles.checkout}>
              Оформити замовлення
            </Link>

            <Link href="/catalog" className={styles.continue}>
              Продовжити покупки
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
