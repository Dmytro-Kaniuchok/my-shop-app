"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./ProductPage.module.css";
import toast from "react-hot-toast";
import Loader from "@/src/components/Loader/Loader";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (!res.ok) throw new Error("Помилка отримання товару");

        const data = await res.json();
        setProduct(data);
      } catch {
        toast.error("Товар не знайдено!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = (product: Product, quantity: number) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Товар додано до кошика!");
  };

  if (loading) return <Loader />;
  if (!product) return <p>Товар не знайдено.</p>;

  return (
    <main className={styles.container}>
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        priority
      />

      <div className={styles.info}>
        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.infoRow}>
          <span>Бренд: {product.brand}</span>
          <span>Артикул: {product.sku}</span>
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.quantityWrapper}>
          <label htmlFor="quantity">Кількість:</label>
          <input
            id="quantity"
            type="number"
            min={0}
            max={100}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.min(100, Math.max(0, Number(e.target.value))))
            }
            className={styles.quantityInput}
          />
        </div>

        <p className={styles.price}>{product.price} грн</p>

        <div className={styles.buttons}>
          <Link
            href={{
              pathname: "/order",
              query: { id: product.id, quantity },
            }}
          >
            <button
              className={styles.buyButton}
              onClick={() => toast.success("Перехід до оформлення замовлення")}
            >
              Купити
            </button>
          </Link>

          <button
            className={styles.button}
            onClick={() => addToCart(product, quantity)}
          >
            Додати до кошика
          </button>
        </div>
      </div>
    </main>
  );
}
