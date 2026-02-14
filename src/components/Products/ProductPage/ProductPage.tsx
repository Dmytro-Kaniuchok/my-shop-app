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
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
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
        <span className={styles.topBrand}>
          {product.brand || "Бренд не вказано"}
        </span>
        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Артикул:</span>
            <span className={styles.metaValue}>{product.sku || "N/A"}</span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Бренд:</span>
            <span className={styles.metaValue}>{product.brand}</span>
          </div>
        </div>

        <p className={styles.description}>{product.description}</p>

        {/* Кількість */}
        <div className={styles.quantityBlock}>
          <span className={styles.quantityLabel}>Кількість:</span>

          <div className={styles.quantitySelector}>
            <button
              className={styles.quantityButton}
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity === 1}
            >
              −
            </button>

            <span className={styles.quantityValue}>{quantity}</span>

            <button
              className={styles.quantityButton}
              onClick={() => setQuantity((prev) => prev + 1)}
              disabled={quantity === 99}
            >
              +
            </button>
          </div>
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
