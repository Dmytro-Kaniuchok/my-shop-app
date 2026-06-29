import Link from "next/link";
import css from "./ContactBanner.module.css";
import { LuPhone, LuSearch } from "react-icons/lu";

export default function ContactBanner() {
  return (
    <section className={css.banner}>
      <div className={css.inner}>
        <div className={css.text}>
          <h2 className={css.title}>Не знайшли потрібну деталь?</h2>
          <p className={css.description}>
            Наші консультанти допоможуть підібрати потрібну деталь.
            Зв&apos;яжіться з нами — відповімо швидко.
          </p>
        </div>

        <div className={css.actions}>
          <Link href="/catalog" className={css.btnPrimary}>
            <LuSearch size={16} />
            Пошук в каталозі
          </Link>
          <Link href="/contact" className={css.btnSecondary}>
            <LuPhone size={16} />
            Зв&apos;язатися з нами
          </Link>
        </div>
      </div>
    </section>
  );
}
