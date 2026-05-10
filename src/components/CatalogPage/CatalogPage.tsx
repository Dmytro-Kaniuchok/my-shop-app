"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

  // Кнопка "вгору"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Скидання фільтрів
  const resetFilters = () => {
    setSearchTerm("");
    setBrandFilter("Всі бренди");
    setSortOrder("default");
  };

  if (loading) return <Loader />;

  // Унікальні бренди
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
      <nav className={styles.breadcrumbs}>
        <Link href="/" className={styles.breadcrumbLink}>
          Головна
        </Link>

        <span className={styles.separator}>›</span>

        <span className={styles.currentPage}>Каталог</span>
      </nav>

      <div className={styles.catalogLayout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Фільтри</h2>

          <div className={styles.filterBlock}>
            <p className={styles.filterLabel}>Пошук товару</p>

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
                placeholder="Введіть назву..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.filterBlock}>
            <p className={styles.filterLabel}>Бренд</p>

            <select
              className={styles.select}
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
          </div>
        </aside>

        <section className={styles.content}>
          <div className={styles.topBar}>
            <h1 className={styles.title}>
              Знайдено {filteredProducts.length} товарів
            </h1>

            <select
              className={styles.sortSelect}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Популярні</option>
              <option value="asc">Від дешевих до дорогих</option>
              <option value="desc">Від дорогих до дешевих</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className={styles.noResultsWrapper}>
              <p className={styles.noResults}>
                За вашим запитом нічого не знайдено. Спробуйте змінити пошуковий
                запит або скинути фільтри.
              </p>

              <button className={styles.resetButton} onClick={resetFilters}>
                Скинути фільтри
              </button>
            </div>
          ) : (
            <ul className={styles.list}>
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          )}

          {visibleCount < filteredProducts.length && (
            <button className={styles.loadMore} onClick={handleLoadMore}>
              Завантажити ще
            </button>
          )}
        </section>
      </div>

      {showScrollTop && (
        <button className={styles.scrollTop} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </main>
  );
}
