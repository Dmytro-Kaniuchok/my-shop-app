"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import css from "./SearchInput.module.css";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  sku?: string;
}

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // FETCH ONLY ONCE

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);

        const res = await fetch(`${API_URL}/products`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Server Error");
        }

        const data = await res.json();

        setProducts(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [API_URL]);

  // CLICK OUTSIDE

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // FILTERED RESULTS

  const filteredResults = useMemo(() => {
    if (query.trim().length < 2) {
      return [];
    }

    return products
      .filter((item) => {
        const search = query.toLowerCase();

        return (
          item.name?.toLowerCase().includes(search) ||
          item.brand?.toLowerCase().includes(search) ||
          item.sku?.toLowerCase().includes(search)
        );
      })
      .slice(0, 5);
  }, [query, products]);

  // SELECT PRODUCT

  const handleSelect = (id: string) => {
    setQuery("");

    setIsOpen(false);

    router.push(`/product/${id}`);
  };

  // KEYBOARD NAVIGATION

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredResults.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredResults.length - 1,
      );
    }

    if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        handleSelect(filteredResults[selectedIndex].id);
      }
    }
  };

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <div className={css.inputWrapper}>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);

            setIsOpen(true);

            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Пошук запчастин..."
          className={css.input}
        />

        {isLoading && <Loader />}
      </div>

      {isOpen && filteredResults.length > 0 && (
        <ul className={css.dropdown}>
          {filteredResults.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={selectedIndex === index ? css.activeItem : ""}
            >
              <span>{item.name}</span>

              <small>{item.brand}</small>
            </li>
          ))}
        </ul>
      )}

      {isOpen &&
        !isLoading &&
        query.length >= 2 &&
        filteredResults.length === 0 && (
          <div className={css.empty}>Нічого не знайдено</div>
        )}
    </div>
  );
}
