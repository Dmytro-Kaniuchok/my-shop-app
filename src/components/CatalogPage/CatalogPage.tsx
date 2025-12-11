"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/Loader/Loader";
import styles from "./CatalogPage.module.css";
import ProductCard from "@/src/components/Products/ProductCard/ProductCard";
import FavoritesModal from "@/src/components/FavoritesModal/FavoritesModal";
import { Product } from "@/src/types/products";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);
  const [loadingItem, setLoadingItem] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // 🆕 Обране
  const [favoritesIds, setFavoritesIds] = useState<string[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  // 🆕 Підвантаження обраних з localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoritesIds(saved);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Помилка при завантаженні продуктів:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [API_URL]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) setShowScrollTop(true);
      else setShowScrollTop(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 15);

  const handleClick = (id: string) => {
    setLoadingItem(true);
    router.push(`/product/${id}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading || loadingItem) return <Loader />;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🆕 toggleFavorite — тепер є 🔥
  const toggleFavorite = (id: string) => {
    setFavoritesIds((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((favId) => favId !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles.div}>
        <h1 className={styles.title}>Каталог товарів</h1>
      </div>

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Введіть назву товару..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles.favoritesWrapper}>
          <button
            className={styles.openFavoritesBtn}
            onClick={() => setIsFavoritesOpen(true)}
          >
            Обране
          </button>
        </div>
      </div>

      <ul className={styles.list}>
        {filteredProducts.slice(0, visibleCount).map((p) => (
          <ProductCard key={p.id} p={p} handleClick={handleClick} />
        ))}
      </ul>

      {visibleCount < filteredProducts.length && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Завантажити ще
        </button>
      )}

      {showScrollTop && (
        <button className={styles.scrollTop} onClick={scrollToTop}>
          ↑
        </button>
      )}

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        handleClick={handleClick}
        products={products}
        toggleFavorite={toggleFavorite}
        favoritesIds={favoritesIds}
      />
    </main>
  );
}
