"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import css from "./ProductCard.module.css";
import toast from "react-hot-toast";
import { Product } from "@/src/types/products";
interface CartProduct extends Product {
  quantity: number;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleAddToCart = () => {
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
      toast.success("Товар додано до кошика!");
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Помилка додавання до кошика");
    }
  };

  return (
    <div className={css.productCard}>
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

      <h3>{product.name}</h3>

      <span className={css.brandAndArticle}>
        Бренд: {product.brand || "не вказано"} <br />
        Артикул: {product.sku || "не вказано"}
      </span>

      <div className={css.cardFooter}>
        <div className={css.priceRow}>
          <span className={css.price}>{product.price} грн</span>

          <button onClick={handleAddToCart} className={css.buyBtn}>
            Купити
          </button>
        </div>

        <Link href={`/product/${product.id}`} className={css.detailsLink}>
          Дивитися детальніше
        </Link>
      </div>
    </div>
  );
}
