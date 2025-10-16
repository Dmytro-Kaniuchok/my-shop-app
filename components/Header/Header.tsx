"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState<number | null>(null);
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

      <nav aria-label="Main Navigation" className={css.desktopNav}>
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

      <button
        className={css.burger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Меню"
      >
        {menuOpen ? (
          <IoMdClose size={20} color="#101828" />
        ) : (
          <GiHamburgerMenu size={20} color="#101828" />
        )}
      </button>

      <nav className={`${css.mobileNav} ${menuOpen ? css.open : ""}`}>
        <ul>
          {links.map((link) => (
            <li key={link.href} onClick={() => setMenuOpen(false)}>
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
