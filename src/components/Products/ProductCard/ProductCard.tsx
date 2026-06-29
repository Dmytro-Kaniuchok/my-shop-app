"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import css from "./ProductCard.module.css";
import { Product } from "@/src/types/products";
import { FaStar, FaRegStar } from "react-icons/fa";

interface CartProduct extends Product {
  quantity: number;
}
interface Props {
  product: Product;
}

function pluralizeReviews(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 19) return "відгуків";
  if (mod10 === 1) return "відгук";
  if (mod10 >= 2 && mod10 <= 4) return "відгуки";
  return "відгуків";
}

function ProductCard({ product }: Props) {
  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error("Товару немає в наявності");
      return;
    }
    try {
      const cart: CartProduct[] = JSON.parse(
        localStorage.getItem("cart") ?? "[]",
      );
      const idx = cart.findIndex((i) => i.id === product.id);
      if (idx !== -1) cart[idx].quantity += 1;
      else cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Товар додано до кошика");
    } catch (e) {
      console.error(e);
      toast.error("Помилка додавання до кошика");
    }
  };

  const ratingCount = product.ratingCount ?? 0;

  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <Image
          src={product.image || "/fallback-image.webp"}
          alt={product.name}
          width={280}
          height={200}
          loading="lazy"
          className={css.image}
        />
        <span className={product.inStock ? css.badgeIn : css.badgeOut}>
          {product.inStock ? "В наявності" : "Немає в наявності"}
        </span>
      </div>

      <div className={css.body}>
        <div className={css.meta}>
          <span className={css.brand}>
            {product.brand ?? "N/A"} · {product.sku ?? "N/A"}
          </span>
          <h3 className={css.name}>{product.name}</h3>
        </div>

        <div className={css.rating}>
          {[1, 2, 3, 4, 5].map((s) =>
            s <= Math.round(product.rating ?? 0) ? (
              <FaStar key={s} className={css.starOn} />
            ) : (
              <FaRegStar key={s} className={css.starOff} />
            ),
          )}
          <span className={css.ratingVal}>
            {(product.rating ?? 0).toFixed(1)}
          </span>
          <span className={css.ratingCount}>
            ({ratingCount} {pluralizeReviews(ratingCount)})
          </span>
        </div>

        <div className={css.footer}>
          <span className={css.price}>{product.price} грн</span>
          <button
            className={css.buyBtn}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            До кошика
          </button>
          <Link href={`/product/${product.id}`} className={css.details}>
            Детальніше
          </Link>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
