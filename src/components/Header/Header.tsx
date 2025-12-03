"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu } from "lucide-react";
import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import DesktopNav from "../Navigation/DesktopNav/DesktopNav";
import MobileNav from "../Navigation/MobileNav/MobileNav";
import ThemeToggle from "@/src/Theme/ThemeToggle/ThemeToggle";
import { useTheme } from "@/src/Theme/ThemeProvider";
import FavoritesModal from "@/src/components/FavoritesModal/FavoritesModal";
import { products } from "@/data/products";
import { Product } from "@/src/types/products";
import { LuStar } from "react-icons/lu";

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
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

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
        <button
          className={`${css.mobileFavorites} ${pathname === "/products" ? css.active : ""}`}
          onClick={() => setIsFavoritesOpen(true)}
          aria-label="Обране"
        >
          <LuStar
            color={
              pathname === "/products"
                ? theme === "dark"
                  ? "#1e90ff"
                  : "#0b44cd"
                : theme === "dark"
                  ? "#fff"
                  : "#101828"
            }
          />
        </button>

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
                  ? "#1e90ff"
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

        <div className={css.themeDesktop}>
          <ThemeToggle />
        </div>

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

      <MobileNav
        links={links}
        pathname={pathname}
        cartCount={cartCount}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        products={products as Product[]}
        handleClick={(id) => router.push(`/product/${id}`)}
      />
    </header>
  );
}
