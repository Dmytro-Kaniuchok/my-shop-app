"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import css from "./ProductCard.module.css";
import toast from "react-hot-toast";
import { Product } from "@/src/types/products";
import { MdOutlineStar } from "react-icons/md";

interface CartProduct extends Product {
  quantity: number;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [imgSrc, setImgSrc] = useState(product.image);

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
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Товар додано до кошика");
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Помилка додавання до кошика");
    }
  };

  return (
    <div className={css.productCard}>
      {product.inStock ? (
        <div className={css.inStock}>В наявності</div>
      ) : (
        <div className={css.badgeOut}>Немає в наявності</div>
      )}

      <div className={css.imageWrapper}>
        <Image
          src={imgSrc}
          alt={product.name}
          width={250}
          height={250}
          loading="lazy"
          onError={() =>
            setImgSrc(
              "https://dummyimage.com/250x250/fff/000000&text=Немає+зображення",
            )
          }
        />
      </div>

      <h3 className={css.productName}>{product.name}</h3>

      <div className={css.rating}>
        <div className={css.starWrapper}>
          {/* фонова зірка */}
          <MdOutlineStar size={20} className={css.starBackground} />
          {/* заповнена частина */}
          <MdOutlineStar
            size={20}
            className={css.starForeground}
            style={{ width: `${((product.rating ?? 0) / 5) * 100}%` }}
          />
        </div>
        <span className={css.ratingValue}>
          {(product.rating ?? 0).toFixed(1)}
        </span>
        <span className={css.reviews}>
          • {product.ratingCount ?? 0} відгуків
        </span>
      </div>

      <span className={css.brandAndArticle}>
        Бренд: {product.brand || "не вказано"} <br />
        Артикул: {product.sku || "не вказано"}
      </span>

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
  );
}
