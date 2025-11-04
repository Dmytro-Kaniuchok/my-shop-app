"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "../../context/ThemeToggle/ThemeToggle";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [theme, setTheme] = useState("light");

  // Кількість товарів у кошику
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  // Зчитуємо тему при завантаженні
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Відстеження зміни теми через атрибут <html>
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current || "light");
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const links = [
    { href: "/", label: "Головна" },
    { href: "/catalog", label: "Каталог" },
    { href: "/contact", label: "Контакти" },
    { href: "/about", label: "Про нас" },
    { href: "/cart", label: "Кошик", showCount: true },
  ];

  return (
    <header className={css.header}>
      {/* Логотип */}
      <Link href="/" aria-label="Головна">
        <div className={css.logoWrapper}>
          <Image
            src={theme === "dark" ? "/logo-dark.png" : "/logo.png"}
            alt="Logo"
            width={120}
            height={0}
            className={css.logoImg}
            style={{ height: "auto" }}
            priority
          />
        </div>
      </Link>

      {/* Десктопна навігація */}
      <nav aria-label="Main Navigation" className={css.desktopNav}>
        <ul className={css.navigation}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? css.active : ""}
              >
                {link.label}
                {link.showCount && cartCount > 0 && (
                  <span className={css.cartCount}>{cartCount}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Мобільна панель (тема + бургер) */}
      <div className={css.mobileIcons}>
        <ThemeToggle />
        <button
          className={css.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? (
            <X size={26} color={theme === "dark" ? "#fff" : "#101828"} />
          ) : (
            <Menu size={26} color={theme === "dark" ? "#fff" : "#101828"} />
          )}
        </button>
      </div>

      {/* 📱 Мобільне меню */}
      <nav className={`${css.mobileNav} ${menuOpen ? css.open : ""}`}>
        <ul>
          {links.map((link) => (
            <li key={link.href} onClick={() => setMenuOpen(false)}>
              <Link
                href={link.href}
                className={pathname === link.href ? css.active : ""}
              >
                {link.label}
                {link.showCount && cartCount > 0 && (
                  <span className={css.cartCount}>{cartCount}</span>
                )}
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
