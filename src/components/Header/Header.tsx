"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Phone } from "lucide-react";
import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import DesktopNav from "../Navigation/DesktopNav/DesktopNav";
import MobileNav from "../Navigation/MobileNav/MobileNav";

import { useTheme } from "@/src/Theme/ThemeProvider";

const links = [
  { href: "/", label: "Головна" },
  { href: "/catalog", label: "Каталог" },
  { href: "/contact", label: "Контакти" },
  { href: "/cart", label: "Кошик", showCount: true },
  { href: "/about", label: "Про нас" },
];

export default function Header() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      setCartCount(cart.length);
    };

    window.addEventListener("cartUpdated", updateCartCount);

    updateCartCount();

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo theme={theme} />

        <div className={css.desktopNav}>
          <DesktopNav links={links} pathname={pathname} cartCount={cartCount} />
        </div>

        <div className={css.iconsWrapper}>
          <div className={css.phoneBlock}>
            <div className={css.phoneRow}>
              <Phone size={16} />

              <a href="tel:+380501234567" className={css.phone}>
                +38 (050) 123-45-67
              </a>
            </div>

            <span className={css.phoneTime}>Пн-Нд: 10:00-18:00</span>
          </div>

          <Link
            href="/cart"
            className={`${css.mobileCart} ${
              pathname === "/cart" ? css.active : ""
            }`}
            aria-label="Кошик"
          >
            <ShoppingCart size={24} />

            {cartCount > 0 && (
              <span className={css.mobileCartCount}>{cartCount}</span>
            )}
          </Link>

          {!menuOpen && (
            <button
              className={css.burger}
              onClick={() => setMenuOpen(true)}
              aria-label="Меню"
            >
              <Menu size={24} color={theme === "dark" ? "#fff" : "#101828"} />
            </button>
          )}
        </div>

        <MobileNav
          links={links}
          pathname={pathname}
          cartCount={cartCount}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          theme={theme}
        />
      </div>
    </header>
  );
}
