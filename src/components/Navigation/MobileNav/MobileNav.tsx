import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import css from "./MobileNav.module.css";
import ThemeToggle from "../../../theme/ThemeToggle/ThemeToggle";

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
  const router = useRouter();

  return (
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
        {links
          .filter((link) => link.href !== "/catalog")
          .map((link) => (
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
  );
}
