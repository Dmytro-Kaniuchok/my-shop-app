import Link from "next/link";
import css from "./Hero.module.css";
import { FiSearch } from "react-icons/fi";
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
              <select className={css.select}>
                <option>Марка</option>
              </select>

              <select className={css.select}>
                <option>Модель</option>
              </select>

              <select className={css.select}>
                <option>Рік</option>
              </select>

              <button className={css.button}>
                <FiSearch size={16} />
                <span>Пошук</span>
              </button>
            </div>
          </div>

          <div className={css.actions}>
            <Link href="/catalog" className={css.primaryBtn}>
              Перейти до каталогу
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
