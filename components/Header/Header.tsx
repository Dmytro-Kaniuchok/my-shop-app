import css from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Hero">
        Магазин
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Головна</Link>
          </li>
          <li>
            <Link href="/catalog">Каталог</Link>
          </li>
          <li>
            <Link href="/about">Про нас</Link>
          </li>
          <li>
            <Link href="/cart">Кошик</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
