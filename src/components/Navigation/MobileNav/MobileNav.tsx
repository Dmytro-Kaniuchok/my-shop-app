"use client";

import Link from "next/link";
import { X } from "lucide-react";
import css from "./MobileNav.module.css";
import { Phone, Clock } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  showCount?: boolean;
}

interface MobileNavProps {
  links: NavLink[];
  pathname: string;
  cartCount: number;
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
  theme: string;
}

export default function MobileNav({
  links,
  pathname,
  cartCount,
  menuOpen,
  setMenuOpen,
  theme,
}: MobileNavProps) {
  return (
    <>
      <div
        className={`${css.overlay} ${menuOpen ? css.show : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <nav className={`${css.mobileNav} ${menuOpen ? css.open : ""}`}>
        <div className={css.mobileNavHeader}>
          <button
            className={css.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Закрити меню"
          >
            <X size={20} color={theme === "dark" ? "#fff" : "#101828"} />
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
        <div className={css.bottomInfo}>
          <div className={css.divider} />
          <div className={css.phoneBlock}>
            <Phone size={16} color="#667085" />
            <a href="tel:+380501234567" className={css.phone}>
              +38 (050) 123-45-67
            </a>
          </div>

          <div className={css.hours}>
            <Clock size={16} color="#667085" />
            <p>Пн-Нд: 10:00-18:00</p>
          </div>
        </div>
      </nav>
    </>
  );
}
