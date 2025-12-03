"use client";

import { useState, useEffect } from "react";
import css from "./FavoritesModal.module.css";
import ProductCard from "../Products/ProductCard/ProductCard";
import { AiOutlineClose } from "react-icons/ai";
import { Product } from "@/src/types/products";
import SimpleBar from "simplebar-react";

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

  if (!isOpen) return;

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <AiOutlineClose size={20} />
        </button>
        <h2 className={css.modalTitle}>Ваші обрані товари</h2>

        <SimpleBar
          style={{ maxHeight: "60vh", paddingRight: "20px" }}
          autoHide={false}
        >
          {favoriteProducts.length === 0 ? (
            <p className={css.modalWrapper}>Поки що немає обраних товарів.</p>
          ) : (
            <ul className={css.list}>
              {favoriteProducts.map((p) => (
                <ProductCard key={p.id} p={p} handleClick={handleClick} />
              ))}
            </ul>
          )}
        </SimpleBar>
      </div>
    </div>
  );
}
