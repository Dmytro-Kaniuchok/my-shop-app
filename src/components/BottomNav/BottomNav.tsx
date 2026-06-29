"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuHouse, LuLayoutGrid, LuShoppingCart, LuPhone } from "react-icons/lu";
import css from "./BottomNav.module.css";

interface BottomNavProps {
  cartCount: number;
}

const navItems = [
  { href: "/", label: "Головна", icon: LuHouse },
  { href: "/catalog", label: "Каталог", icon: LuLayoutGrid },
  { href: "/cart", label: "Кошик", icon: LuShoppingCart, showCount: true },
  { href: "/contact", label: "Контакти", icon: LuPhone },
];

export default function BottomNav({ cartCount }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className={css.bottomNav}>
      {navItems.map(({ href, label, icon: Icon, showCount }) => (
        <Link
          key={href}
          href={href}
          className={`${css.item} ${pathname === href ? css.active : ""}`}
        >
          <span className={css.iconWrap}>
            <Icon size={22} />
            {showCount && cartCount > 0 && (
              <span className={css.badge}>{cartCount}</span>
            )}
          </span>
          <span className={css.label}>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
