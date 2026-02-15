import Link from "next/link";
import css from "./Hero.module.css";
import { FiSearch } from "react-icons/fi";
import FeaturedCard from "../FeatureCard/FeaturedCard";

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.heroContainer}>
        <div className={css.left}>
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
              {/* <option>BMW</option>
              <option>Audi</option> */}
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

        <div className={css.right}>
          <FeaturedCard
            title="Паливний фільтр"
            price={300}
            image="https://res.cloudinary.com/dqzzwskbk/image/upload/v1765194272/fuel-filter_wk4tvb.webp"
            badge="Хіт продажів"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
