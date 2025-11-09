"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "@/src/context/ThemeToggle/ThemeToggle";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [cartCount, setCartCount] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // --- Кошик ---
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    window.addEventListener("cartUpdated", updateCartCount);
    updateCartCount();

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  // --- Тема ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const savedTheme =
      localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  // --- Відстеження зміни теми ---
  useEffect(() => {
    if (!mounted) return;
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current || "light");
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [mounted]);

  const links = [
    { href: "/", label: "Головна" },
    { href: "/catalog", label: "Каталог" },
    { href: "/contact", label: "Контакти" },
    { href: "/cart", label: "Кошик", showCount: true },
    { href: "/about", label: "Про нас" },
  ];

  // Показуємо лише базову версію, поки не відрендерилось клієнтське середовище
  if (!mounted) {
    return (
      <header className={css.header}>
        <div className={css.logoWrapper}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={0}
            className={css.logoImg}
            style={{ height: "auto" }}
            priority
          />
        </div>
      </header>
    );
  }

  // Основний контент після монтування
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Головна">
        <div className={css.logoWrapper}>
          <Image
            src={theme === "dark" ? "/logo-dark.png" : "/logo.png"}
            alt="Logo"
            width={120}
            height={120}
            className={css.logoImg}
            style={{ height: "auto" }}
            priority
          />
        </div>
      </Link>

      {/* --- Десктопна навігація --- */}
      <nav aria-label="Main Navigation" className={css.desktopNav}>
        <ul className={css.navigation}>
          {links.map((link) => (
            <li
              key={link.href}
              className={link.href === "/cart" ? css.hideCartDesktop : ""}
            >
              <Link
                href={link.href}
                className={pathname === link.href ? css.active : ""}
              >
                <span className={css.cartWrapper}>
                  {link.label}
                  {link.showCount && cartCount > 0 && (
                    <span className={css.cartCount}>{cartCount}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* --- Іконки справа --- */}
      <div className={css.iconsWrapper}>
        <button
          className={`${css.mobileCart} ${pathname === "/cart" ? css.active : ""}`}
          onClick={() => router.push("/cart")}
          aria-label="Кошик"
        >
          <ShoppingCart />
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
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Menu size={26} color={theme === "dark" ? "#fff" : "#101828"} />
          </button>
        )}
      </div>

      {/* --- Мобільне меню --- */}
      <nav className={`${css.mobileNav} ${menuOpen ? css.open : ""}`}>
        <div className={css.mobileNavHeader}>
          <ThemeToggle />
          <button
            className={css.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Закрити меню"
          >
            <X size={26} color={theme === "dark" ? "#fff" : "#101828"} />
          </button>
        </div>

        <ul>
          {links.map((link) => (
            <li key={link.href} onClick={() => setMenuOpen(false)}>
              <Link
                href={link.href}
                className={pathname === link.href ? css.active : ""}
              >
                <span className={css.cartWrapper}>
                  {link.label}
                  {link.showCount && cartCount > 0 && (
                    <span className={css.cartCount}>{cartCount}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={css.mobileNavFooter}>
          <button
            className={css.ctaBtn}
            onClick={() => {
              setMenuOpen(false);
              router.push("/catalog");
            }}
          >
            До каталогу
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
