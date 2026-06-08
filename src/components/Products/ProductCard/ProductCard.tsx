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
      const existingCart = localStorage.getItem("cart");

      const cart: CartProduct[] = existingCart ? JSON.parse(existingCart) : [];

      const productIndex = cart.findIndex((item) => item.id === product.id);

      if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Товар додано до кошика");
    } catch (error) {
      console.error("Cart error:", error);

      toast.error("Помилка додавання до кошика");
    }
  };

  const ratingCount = product.ratingCount ?? 0;

  return (
    <div className={css.productCard}>
      {product.inStock ? (
        <div className={css.inStock}>В наявності</div>
      ) : (
        <div className={css.badgeOut}>Немає в наявності</div>
      )}

      <div className={css.imageWrapper}>
        <Image
          src={product.image || "/fallback-image.webp"}
          alt={product.name}
          width={250}
          height={250}
          loading="lazy"
        />
      </div>

      <div className={css.info}>
        <h3 className={css.productName}>{product.name}</h3>

        <span className={css.brandAndArticle}>
          {product.brand || "не вказано"} • {product.sku || "не вказано"}
        </span>

        <div className={css.rating}>
          {[1, 2, 3, 4, 5].map((star) =>
            star <= Math.round(product.rating ?? 0) ? (
              <FaStar key={star} className={css.starActive} />
            ) : (
              <FaRegStar key={star} className={css.star} />
            ),
          )}

          <span className={css.ratingValue}>
            {product.rating?.toFixed(1) ?? "0.0"}
          </span>

          <span className={css.reviews}>
            ({ratingCount} {pluralizeReviews(ratingCount)})
          </span>
        </div>

        <div className={css.cardFooter}>
          <div className={css.priceRow}>
            <span className={css.price}>{product.price} грн</span>

            <button
              onClick={handleAddToCart}
              className={css.buyBtn}
              disabled={!product.inStock}
            >
              Купити
            </button>
          </div>

          <Link
            href={`/product/${product.id}`}
            className={css.detailsLink}
            aria-label={`Дивитися детальніше ${product.name}`}
          >
            Дивитися детальніше
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
