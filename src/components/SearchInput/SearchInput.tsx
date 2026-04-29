"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import css from "./SearchInput.module.css";
import { Loader } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // мемоізована функція
  const fetchProducts = useCallback(
    async (search: string) => {
      try {
        setIsLoading(true);

        const res = await fetch(`${API_URL}/products`);

        if (!res.ok) {
          throw new Error("Server error");
        }

        const data: Product[] = await res.json();

        // фільтрація (поки бек не підтримує search)
        const filtered = data.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        );

        setResults(filtered);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [API_URL],
  );

  // debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      fetchProducts(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, fetchProducts]);

  const handleSelect = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className={css.wrapper}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук запчастин..."
        className={css.input}
      />

      {isLoading && (
        <p className={css.loader}>
          <Loader />
        </p>
      )}

      {/* результати */}
      {results.length > 0 && (
        <ul className={css.dropdown}>
          {results.map((item) => (
            <li key={item.id} onClick={() => handleSelect(item.id)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {/* якщо нічого не знайдено */}
      {!isLoading && query.length >= 2 && results.length === 0 && (
        <p className={css.empty}>Нічого не знайдено</p>
      )}
    </div>
  );
};

export default SearchInput;
