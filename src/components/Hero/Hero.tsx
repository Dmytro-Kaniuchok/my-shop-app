import Link from "next/link";
import css from "./Hero.module.css";
import { LuSearch } from "react-icons/lu";
import SearchInput from "../SearchInput/SearchInput";

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.heroContainer}>
        <div className={css.left}>
          <h1 className={css.title}>Запчастини для вас швидко і зручно</h1>

          <p className={css.description}>
            Широкий асортимент запчастин від провідних виробників
          </p>

          <div className={css.searchWrapper}>
            <div className={css.topRow}>
              <SearchInput />
            </div>

            <div className={css.bottomRow}>
              <select className={css.select} aria-label="Марка">
                <option>Марка</option>
              </select>

              <select className={css.select} aria-label="Модель">
                <option>Модель</option>
              </select>

              <select className={css.select} aria-label="Рік">
                <option>Рік</option>
              </select>

              <button className={css.button}>
                <LuSearch size={16} />
                <span>Пошук</span>
              </button>
            </div>
          </div>

          <div className={css.actions}>
            <Link
              href="/catalog"
              className={css.primaryBtn}
              aria-label="Перейти до каталогу"
            >
              Перейти до каталогу
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
