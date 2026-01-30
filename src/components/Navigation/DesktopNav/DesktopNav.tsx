import Link from "next/link";
import css from "./DesktopNav.module.css";

interface NavLink {
  href: string;
  label: string;
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
          .map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${css.navLink} ${isActive ? css.active : ""}`}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
