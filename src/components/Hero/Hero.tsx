import css from "./Hero.module.css";
import Link from "next/link";

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <div className={css.wrapper}>
          <h1 className={css.title}>Запчастини ⚙</h1>
          <p className={css.description}>
            Ласкаво просимо!
            <br /> Перейдіть до каталогу, щоб обрати товар.
          </p>
          <Link href="/catalog" className={css.linkBtn}>
            Перейти до каталогу
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
