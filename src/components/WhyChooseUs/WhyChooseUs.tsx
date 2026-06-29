import { LuTruck, LuShield, LuPhone } from "react-icons/lu";
import css from "./WhyChooseUs.module.css";

const items = [
  {
    title: "Швидка доставка",
    description:
      "Доставка по Україні 1-3 дні. Безкоштовна доставка при замовленні від 1000 грн",
    icon: LuTruck,
  },
  {
    title: "Гарантія якості",
    description:
      "Всі товари сертифіковані. Гарантія від виробника на всі запчастини",
    icon: LuShield,
  },
  {
    title: "Підтримка 24/7",
    description:
      "Наші консультанти завжди готові допомогти з вибором запчастин",
    icon: LuPhone,
  },
];

export default function WhyChooseUs() {
  return (
    <section className={css.whySection}>
      <div className={css.container}>
        <h2 className={css.title}>Чому обирають нас?</h2>
        <div className={css.grid}>
          {items.map(({ title, description, icon: Icon }) => (
            <div className={css.card} key={title}>
              <div className={css.iconWrapper}>
                <Icon size={22} />
              </div>
              <h3 className={css.cardTitle}>{title}</h3>
              <p className={css.cardDescription}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
