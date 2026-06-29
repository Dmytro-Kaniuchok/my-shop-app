"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./FeaturedCard.module.css";
import toast from "react-hot-toast";
import { Product } from "@/src/types/products";
import { FaStar, FaRegStar } from "react-icons/fa";

interface CartProduct extends Product {
  quantity: number;
}

export default function FeaturedCardClient({ product }: { product: Product }) {
  const [imgSrc, setImgSrc] = useState(product.image);

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
      toast.error("Помилка");
    }
  };

  const ratingCount = product.ratingCount ?? 0;

  return (
    <div className={css.card}>
      <span className={css.badge}>Хіт продажів</span>

      <div className={css.content}>
        <div className={css.imageWrapper}>
          <Image
            src={imgSrc}
            alt={product.name}
            width={280}
            height={280}
            className={css.image}
            onError={() => setImgSrc("/fallback-image.webp")}
          />
        </div>

        <div className={css.info}>
          <span className={css.brandLabel}>{product.brand}</span>
          <h2 className={css.title}>{product.name}</h2>

          <p className={css.description}>
            {product.description ??
              "Якісний товар з високими характеристиками. Надійність та довговічність гарантовані."}
          </p>

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
            <span className={css.ratingCount}>({ratingCount} відгуків)</span>
          </div>

          <div className={css.divider} />

          <div className={css.footer}>
            <div className={css.priceWrap}>
              <span className={css.priceLabel}>Ціна</span>
              <span className={css.price}>{product.price} грн</span>
            </div>
            <button
              className={css.button}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              До кошика
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
