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
import { Product } from "@/src/types/products";
import { LuStar } from "react-icons/lu";
import { Phone } from "lucide-react";

const links = [
  { href: "/", label: "Головна" },
  { href: "/catalog", label: "Каталог" },
  { href: "/contact", label: "Контакти" },
  { href: "/cart", label: "Кошик", showCount: true },
  { href: "/about", label: "Про нас" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [favoritesIds, setFavoritesIds] = useState<string[]>([]);

  // Підрахунок кількості товарів у кошику
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };
    window.addEventListener("cartUpdated", updateCartCount);
    updateCartCount();
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  // Фетч всіх продуктів
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data: Product[] = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Fetch products error:", err);
      }
    };
    fetchProducts();
  }, []);

  // Завантаження обраних з localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    setFavoritesIds(storedFavorites);
  }, []);

  // Додатково: реактивно оновлювати localStorage при зміні favoritesIds
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesIds));
  }, [favoritesIds]);

  // Відкрити модалку і передати товари
  const favoritesProducts = allProducts.filter((p) =>
    favoritesIds.includes(p.id),
  );

  const toggleFavorite = (id: string) => {
    setFavoritesIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo theme={theme} />
        <DesktopNav links={links} pathname={pathname} cartCount={cartCount} />

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

          <button
            className={`${css.mobileFavorites} ${pathname === "/products" ? css.active : ""}`}
            onClick={() => setIsFavoritesOpen(true)}
            aria-label="Обране"
          >
            <LuStar
              color={
                favoritesIds.length > 0
                  ? "#FFD700"
                  : pathname === "/products"
                    ? theme === "dark"
                      ? "#1e90ff"
                      : "#0b44cd"
                    : theme === "dark"
                      ? "#fff"
                      : "#101828"
              }
            />
          </button>

          <button
            className={`${css.mobileCart} ${pathname === "/cart" ? css.active : ""}`}
            onClick={() => router.push("/cart")}
            aria-label="Кошик"
          >
            <ShoppingCart size={26} />

            {cartCount > 0 && (
              <span className={css.mobileCartCount}>{cartCount}</span>
            )}
          </button>

          <div className={css.themeDesktop}>
            <ThemeToggle size={26} />
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
          products={favoritesProducts}
          handleClick={(id) => router.push(`/product/${id}`)}
          toggleFavorite={toggleFavorite}
          favoritesIds={favoritesIds}
        />
      </div>
    </header>
  );
}
