import css from "./page.module.css";
import Link from "next/link";
import Head from "next/head";

const Hero = () => {
  return (
    <main className={css.container}>
      <Head>
        <title>Магазин запчастин</title>
        <meta
          name="description"
          content="Купити автозапчастини: гальмівні колодки, фільтри, свічки запалювання та інше."
        />
      </Head>

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
    </main>
  );
};

export default Hero;
