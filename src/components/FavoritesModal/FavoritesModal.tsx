"use client";

import { useState, useEffect } from "react";
import styles from "./FavoritesModal.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { AiOutlineClose } from "react-icons/ai";
import { Product } from "@/src/types/products";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  handleClick: (id: string) => void;
}

export default function FavoritesModal({
  isOpen,
  onClose,
  products,
  handleClick,
}: FavoritesModalProps) {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // Підвантаження обраного при відкритті
  useEffect(() => {
    if (isOpen) {
      const favoritesIds = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      const favoritesList = products.filter((p) => favoritesIds.includes(p.id));
      setFavoriteProducts(favoritesList);
    }
  }, [isOpen, products]);

  // Заморозка скролу при відкритті модалки
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollY); // повертаємо скрол на місце
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <AiOutlineClose size={20} />
        </button>
        <h2>Ваші обрані товари</h2>
        {favoriteProducts.length === 0 ? (
          <p>Поки що немає обраних товарів.</p>
        ) : (
          <ul className={styles.list}>
            {favoriteProducts.map((p) => (
              <ProductCard key={p.id} p={p} handleClick={handleClick} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
