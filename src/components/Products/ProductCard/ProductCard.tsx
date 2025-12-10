"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { AiOutlineStar, AiOutlineCheck } from "react-icons/ai";
import { Product } from "@/src/types/products";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
}

interface ProductCardProps {
  p: Product;
  handleClick: (id: string) => void;
}

export default function ProductCard({ p, handleClick }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(p.image);
  const [isFavorite, setIsFavorite] = useState(false);

  // Перевіряємо, чи товар в обраному
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((item: FavoriteItem) => item.id === p.id));
  }, [p.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    let updatedFavorites;

    if (isFavorite) {
      // Видалення з обраного
      updatedFavorites = favorites.filter(
        (item: FavoriteItem) => item.id !== p.id
      );
    } else {
      // Додавання мінімальних даних
      const newItem = {
        id: p.id,
        name: p.name,
        price: p.price,
      };

      updatedFavorites = [...favorites, newItem];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <li className={styles.item}>
      <div className={styles.card}>
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
          onClick={toggleFavorite}
          title={isFavorite ? "В улюблених" : "Додати в обране"}
        >
          {isFavorite ? (
            <AiOutlineCheck style={{ color: "#28a745", fontSize: "18px" }} />
          ) : (
            <AiOutlineStar style={{ color: "#FFD700", fontSize: "18px" }} />
          )}
        </button>

        <div className={styles.imageWrapper}>
          <Image
            src={imgSrc}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={styles.image}
            onError={() =>
              setImgSrc(
                "https://dummyimage.com/200x200/fff/000000&text=Немає+Зображення&"
              )
            }
          />
        </div>

        <div className={styles.productInfo}>
          <span className={styles.productName}>{p.name}</span>

          <span className={styles.brandAndArticle}>
            Бренд: {p.brand || "не вказано"} <br />
            Артикул: {p.sku || "не вказано"}
          </span>

          <span className={styles.productPrice}>{p.price} грн</span>

          <div className={styles.actions}>
            <button
              className={styles.detailsBtn}
              onClick={() => handleClick(p.id)}
            >
              Детальніше
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
