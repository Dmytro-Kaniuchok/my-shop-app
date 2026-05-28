"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Loader from "@/src/components/Loader/Loader";
import CatalogFilters from "./CatalogFilters";
import CatalogTopBar from "./CatalogTopBar";
import CatalogProducts from "./CatalogProducts";
import styles from "./CatalogPage.module.css";
import { Product } from "@/src/types/products";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Всі");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortOrder, setSortOrder] = useState("default");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // FETCH PRODUCTS
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${API_URL}/products`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

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

  // SCROLL
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 800);

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // UNIQUE BRANDS
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);
  }, [products]);

  // TOGGLE BRAND
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  // FILTER + SORT
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // SEARCH
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // CATEGORY
    if (selectedCategory !== "Всі") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // BRANDS
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // PRICE
    filtered = filtered.filter((p) => p.price <= maxPrice);

    // SORT
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedBrands,
    maxPrice,
    sortOrder,
  ]);

  // LOAD MORE
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  // SCROLL TOP
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // RESET FILTERS
  const resetFilters = () => {
    setSearchTerm("");

    setSelectedCategory("Всі");

    setSelectedBrands([]);

    setMaxPrice(10000);

    setSortOrder("default");
  };

  if (loading) {
    return <Loader />;
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
        <CatalogFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrands={selectedBrands}
          toggleBrand={toggleBrand}
          brands={brands}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          resetFilters={resetFilters}
        />

        <section className={styles.content}>
          <CatalogTopBar
            count={filteredProducts.length}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <CatalogProducts
            products={filteredProducts}
            visibleCount={visibleCount}
            handleLoadMore={handleLoadMore}
            resetFilters={resetFilters}
          />
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
