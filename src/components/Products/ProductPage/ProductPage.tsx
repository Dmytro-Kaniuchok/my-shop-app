"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import styles from "./ProductPage.module.css";
import toast from "react-hot-toast";
import Loader from "@/src/components/Loader/Loader";
import Link from "next/link";
import Image from "next/image";
import {
  LuShoppingCart,
  LuHouse,
  LuTruck,
  LuShield,
  LuCheck,
  LuPlus,
} from "react-icons/lu";
import { FaStar, FaRegStar } from "react-icons/fa";
import ProductTabs from "../ProductTabs/ProductTabs";

interface Product {
  _id: string;
  id: string;
  name: string;
  brand: string;
  sku: string;
  description: string;
  price: number;
  image: string;
  inStock?: boolean;
  reviews?: number;
  rating?: number;
  ratingCount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Crect width='500' height='500' fill='%23f3f4f6'/%3E%3Cpath d='M150 180h200v140H150z' fill='%23e5e7eb' stroke='%23cbd5e1' stroke-width='4'/%3E%3Cline x1='150' y1='180' x2='350' y2='320' stroke='%23cbd5e1' stroke-width='4'/%3E%3Cline x1='350' y1='180' x2='150' y2='320' stroke='%23cbd5e1' stroke-width='4'/%3E%3Ctext x='50%25' y='460' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='24' font-family='Arial,sans-serif'%3E%D0%9D%D0%B5%D0%BC%D0%B0%D1%94%20%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F%3C/text%3E%3C/svg%3E";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState("");
  const [isInCart, setIsInCart] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProduct(data);
      setImgSrc((prev) => prev || data.image);
    } catch {
      toast.error("Товар не знайдено!");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (!product) return;
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsInCart(cart.some((item) => item.id === product.id));
  }, [product]);

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
    setIsInCart(true);
    toast.success("Товар додано до кошика!");
  };

  if (loading) return <Loader />;
  if (!product) return <p>Товар не знайдено.</p>;

  const totalPrice = (product.price * quantity).toLocaleString("uk-UA");

  return (
    <div className={styles.productPage}>
      <nav className={styles.breadcrumb}>
        <Link href="/">Головна</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/catalog">Каталог</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      <div className={styles.productLayout}>
        <div className={styles.imagePanel}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={imgSrc}
              alt={product.name}
              width={420}
              height={420}
              priority
              onError={() => setImgSrc(FALLBACK_IMG)}
            />
          </div>
        </div>

        {/* INFO */}
        <div className={styles.info}>
          <div className={styles.brandRow}>
            <span className={styles.brandChip}>
              {product.brand?.toUpperCase() || "БРЕНД"}
            </span>
            <span className={styles.skuLabel}>
              Артикул: {product.sku || "—"}
            </span>
          </div>

          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.ratingBlock}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) =>
                star <= Math.round(product.rating || 0) ? (
                  <FaStar key={star} className={styles.starFilled} />
                ) : (
                  <FaRegStar key={star} className={styles.starEmpty} />
                ),
              )}
            </div>
            <span className={styles.ratingNumber}>
              {product.rating?.toFixed(1) || "0.0"}
            </span>
            <span className={styles.ratingCount}>
              {product.ratingCount || product.reviews || 0} відгуків
            </span>
          </div>

          <div className={styles.priceBlock}>
            <div className={styles.priceLabel}>ЦІНА</div>
            <div className={styles.price}>
              {product.price.toLocaleString("uk-UA")} грн
            </div>
            <div className={styles.priceSub}>
              <span
                className={`${styles.stockBadge} ${product.inStock ? styles.inStock : styles.outOfStock}`}
              >
                {product.inStock ? "В наявності" : "Немає в наявності"}
              </span>
              <span className={styles.vatNote}>з ПДВ</span>
            </div>
          </div>

          <div className={styles.quantityBlock}>
            <span className={styles.quantityLabel}>Кількість</span>
            <div className={styles.quantitySelector}>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                aria-label="Зменшити кількість"
              >
                −
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity((prev) => prev + 1)}
                aria-label="Збільшити кількість"
              >
                +
              </button>
            </div>
            <span className={styles.quantityTotal}>= {totalPrice} грн</span>
          </div>

          <div className={styles.actions}>
            <Link
              href={{ pathname: "/order", query: { id: product.id, quantity } }}
              style={{ flex: 1, display: "flex" }}
            >
              <button
                className={styles.buyButton}
                disabled={!product.inStock}
                onClick={() =>
                  toast.success("Перехід до оформлення замовлення")
                }
              >
                <LuShoppingCart size={16} className={styles.buyIcon} />
                Купити зараз
              </button>
            </Link>

            <button
              className={styles.cartButton}
              onClick={() => addToCart(product, quantity)}
              disabled={isInCart || !product.inStock}
            >
              {isInCart ? (
                <>
                  <LuCheck size={15} className={styles.checkIcon} /> В кошику
                </>
              ) : (
                <>
                  <LuPlus size={15} /> В кошик
                </>
              )}
            </button>
          </div>

          {/* SERVICES */}
          <div className={styles.servicesRow}>
            <div className={styles.serviceItem}>
              <LuTruck size={20} className={styles.serviceIcon} />
              <div className={styles.serviceText}>
                <h4>Доставка</h4>
                <p>1–3 робочих дні</p>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <LuShield size={20} className={styles.serviceIcon} />
              <div className={styles.serviceText}>
                <h4>Гарантія</h4>
                <p>12 місяців</p>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <LuHouse size={20} className={styles.serviceIcon} />
              <div className={styles.serviceText}>
                <h4>Самовивіз</h4>
                <p>Безкоштовно</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        <ProductTabs
          productId={product._id}
          description={product.description}
          brand={product.brand}
          sku={product.sku}
          reviews={product.reviews}
          onReviewAdded={fetchProduct}
        />
      </div>
    </div>
  );
}
