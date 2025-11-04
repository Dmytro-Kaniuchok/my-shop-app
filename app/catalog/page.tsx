"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products } from "../../data/products.js";
import Loader from "@/src/components/Loader/Loader";
import styles from "./catalog.module.css";
import ProductCard from "@/src/components/ProductCard/ProductCard";

export default function Catalog() {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);
  const [loadingItem, setLoadingItem] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  const handleClick = (id: string) => {
    setLoadingItem(true);
    router.push(`/product/${id}`);
  };

  // Плавне повернення нагору
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading || loadingItem) {
    return <Loader />;
  }

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
      </div>

      <ul className={styles.list}>
        {products
          .filter((p) =>
            p.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
          )
          .slice(0, visibleCount)
          .map((p) => (
            <ProductCard key={p.id} p={p} handleClick={handleClick} />
          ))}
      </ul>

      {visibleCount < products.length &&
        products.filter((p) =>
          p.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        ).length > 0 && (
          <button className={styles.loadMore} onClick={handleLoadMore}>
            Завантажити ще
          </button>
        )}

      {showScrollTop && (
        <button className={styles.scrollTop} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </main>
  );
}
