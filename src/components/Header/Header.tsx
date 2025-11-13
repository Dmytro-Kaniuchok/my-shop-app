"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu } from "lucide-react";
import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import DesktopNav from "../DesktopNav/DesktopNav";
import MobileNav from "../MobileNav/MobileNav";
import ThemeToggle from "@/src/context/ThemeToggle/ThemeToggle";
import { useTheme } from "@/src/context/ThemeProvider";

const links = [
  { href: "/", label: "Головна" },
  { href: "/catalog", label: "Каталог" },
  { href: "/contact", label: "Контакти" },
  { href: "/cart", label: "Кошик", showCount: true },
  { href: "/about", label: "Про нас" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Оновлення кількості товарів у кошику
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };
    window.addEventListener("cartUpdated", updateCartCount);
    updateCartCount();
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <header className={css.header}>
      <Logo theme={theme} />

      <DesktopNav links={links} pathname={pathname} cartCount={cartCount} />

      <div className={css.iconsWrapper}>
        {/* Кнопка кошика для мобільних */}
        <button
          className={`${css.mobileCart} ${pathname === "/cart" ? css.active : ""}`}
          onClick={() => router.push("/cart")}
          aria-label="Кошик"
        >
          <ShoppingCart
            color={
              pathname === "/cart"
                ? theme === "dark"
                  ? "#f97316"
                  : "#0b44cd"
                : theme === "dark"
                  ? "#fff"
                  : "#101828"
            }
          />
          {cartCount > 0 && (
            <span className={css.mobileCartCount}>{cartCount}</span>
          )}
        </button>

        {/* Перемикач теми (працює через контекст) */}
        <div className={css.themeDesktop}>
          <ThemeToggle />
        </div>

        {/* Бургер-меню */}
        {!menuOpen && (
          <button
            className={css.burger}
            onClick={() => setMenuOpen(true)}
            aria-label="Меню"
          >
            <Menu size={26} color={theme === "dark" ? "#fff" : "#101828"} />
          </button>
        )}
      </div>

      {/* Мобільна навігація */}
      <MobileNav
        links={links}
        pathname={pathname}
        cartCount={cartCount}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
      />
    </header>
  );
}
