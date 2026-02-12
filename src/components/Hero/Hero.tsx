import Link from "next/link";
import css from "./Hero.module.css";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.heroInner}>
        <div className={css.content}>
          <h1 className={css.title}>
            Запчастини для вас
            <br /> швидко і зручно
          </h1>

          <p className={css.description}>
            Широкий асортимент запчастин від провідних виробників
          </p>

          <div className={css.actions}>
            <Link href="/catalog" className={css.primaryBtn}>
              Перейти до каталогу
            </Link>
          </div>

          <div className={css.searchBar}>
            <input
              type="text"
              placeholder="Пошук запчастин"
              className={css.input}
            />

            <span className={css.divider} />

            <select className={css.select}>
              <option>Марка</option>
              <option>BMW</option>
              <option>Audi</option>
            </select>

            <span className={css.divider} />

            <select className={css.select}>
              <option>Модель</option>
            </select>

            <span className={css.divider} />

            <select className={css.select}>
              <option>Рік</option>
            </select>

            <button className={css.button}>
              <FiSearch />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
