"use client";

import { useState, useEffect } from "react";
import css from "./FavoritesModal.module.css";
import { AiOutlineClose } from "react-icons/ai";
import SimpleBar from "simplebar-react";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
}

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleClick: (id: string) => void;
  products: FavoriteItem[];
  toggleFavorite: (id: string) => void;
  favoritesIds: string[];
}

export default function FavoritesModal({
  isOpen,
  onClose,
  handleClick,
}: FavoritesModalProps) {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteItem[]>([]);

  // Підвантаження коротких даних з localStorage
  useEffect(() => {
    if (isOpen) {
      const favoritesList = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      setFavoriteProducts(favoritesList);
    }
  }, [isOpen]);

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
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
                <li key={p.id} className={css.favoriteItem}>
                  <span
                    className={css.favoriteName}
                    onClick={() => handleClick(p.id)}
                  >
                    {p.name}
                  </span>
                  <span className={css.favoritePrice}>{p.price} грн</span>
                </li>
              ))}
            </ul>
          )}
        </SimpleBar>
      </div>
    </div>
  );
}
