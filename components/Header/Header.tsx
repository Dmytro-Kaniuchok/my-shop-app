"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Головна" },
    { href: "/catalog", label: "Каталог" },
    { href: "/contact", label: "Контакти" },
    { href: "/cart", label: "Кошик" },
    { href: "/about", label: "Про нас" },
  ];

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Hero">
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
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
