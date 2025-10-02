"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Header = () => {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState<number | null>(null);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    // Підписка на кастомну подію
    window.addEventListener("cartUpdated", updateCartCount);

    // Виклик один раз для ініціалізації
    updateCartCount();

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const links = [
    { href: "/", label: "Головна" },
    { href: "/catalog", label: "Каталог" },
    { href: "/contact", label: "Контакти" },
    { href: "/cart", label: "Кошик", showCount: true },
    { href: "/about", label: "Про нас" },
  ];

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Головна" className={css.logoText}>
        Магазин
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? css.active : ""}
              >
                <span className={css.cartWrapper}>
                  {link.label}
                  {link.showCount && cartCount !== null && cartCount > 0 && (
                    <span className={css.cartCount}>{cartCount}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
