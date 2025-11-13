import Link from "next/link";
import css from "./DesktopNav.module.css";

interface NavLink {
  href: string;
  label: string;
  showCount?: boolean;
}

interface DesktopNavProps {
  links: NavLink[];
  pathname: string;
  cartCount: number;
}

export default function DesktopNav({ links, pathname }: DesktopNavProps) {
  return (
    <nav aria-label="Main Navigation" className={css.desktopNav}>
      <ul className={css.navigation}>
        {links
          .filter((link) => link.href !== "/cart")
          .map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? css.active : ""}
              >
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
