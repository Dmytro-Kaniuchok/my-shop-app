"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./FeaturedCard.module.css";
import toast from "react-hot-toast";
import { Product } from "@/src/types/products";
import { MdOutlineStar } from "react-icons/md";

interface CartProduct extends Product {
  quantity: number;
}

interface Props {
  product: Product;
}

export default function FeaturedProductCard({ product }: Props) {
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
      console.error(error);
      toast.error("Помилка");
    }
  };

  return (
    <div className={css.card}>
      <div className={css.badge}>Хіт продажів</div>

      <div className={css.content}>
        <div className={css.imageWrapper}>
          <Image
            src={imgSrc}
            alt={product.name}
            width={300}
            height={300}
            onError={() =>
              setImgSrc("https://dummyimage.com/300x300/fff/000&text=No+Image")
            }
          />
        </div>

        <div className={css.info}>
          <h2 className={css.title}>{product.name}</h2>

          <p className={css.brand}>{product.brand}</p>

          <p className={css.description}>
            {product.description ||
              "Якісний товар з високими характеристиками. Надійність та довговічність гарантовані."}
          </p>

          <div className={css.rating}>
            {[1, 2, 3, 4, 5].map((i) => (
              <MdOutlineStar
                key={i}
                size={22}
                className={
                  i <= (product.rating ?? 0) ? css.starActive : css.star
                }
              />
            ))}

            <span className={css.reviews}>({product.ratingCount ?? 0})</span>
          </div>

          <div className={css.footer}>
            <span className={css.price}>{product.price} грн</span>

            <button
              onClick={handleAddToCart}
              className={css.button}
              disabled={!product.inStock}
            >
              Купити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
