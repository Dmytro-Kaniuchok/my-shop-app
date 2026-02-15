"use client";

import { useState, useEffect } from "react";
import Loader from "@/src/components/Loader/Loader";
import styles from "./CatalogPage.module.css";
import ProductCard from "@/src/components/Products/ProductCard/ProductCard";
import { Product } from "@/src/types/products";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("Всі бренди");
  const [sortOrder, setSortOrder] = useState("default");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Завантаження продуктів
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

  // Показ кнопки вгору при скролі
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) setShowScrollTop(true);
      else setShowScrollTop(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 12);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (loading) return <Loader />;

  // Отримати унікальні бренди для селекту
  const brands = Array.from(new Set(products.map((p) => p.brand))).filter(
    Boolean,
  );

  // Фільтрація
  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (brandFilter !== "Всі бренди") {
    filteredProducts = filteredProducts.filter((p) => p.brand === brandFilter);
  }

  // Сортування
  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <main className={styles.container}>
      <div className={styles.div}>
        <h1 className={styles.title}>Каталог товарів</h1>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Пошук по назві товару"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Блок для фільтрації та сортування  */}
        <div className={styles.selects}>
          <select
            className={styles.brandSelect}
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="Всі бренди">Всі бренди</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Сортування за замовчуванням</option>
            <option value="asc">Від дешевих до дорогих</option>
            <option value="desc">Від дорогих до дешевих</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className={styles.noResults}>
          Нічого не знайдено. Введіть коректну назву товару або змініть фільтри.
        </p>
      ) : (
        <ul className={styles.list}>
          {filteredProducts.slice(0, visibleCount).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ul>
      )}

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
    </main>
  );
}
