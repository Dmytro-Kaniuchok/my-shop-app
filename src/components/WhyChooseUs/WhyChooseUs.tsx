import { Truck, Shield, Phone } from "lucide-react";
import css from "./WhyChooseUs.module.css";

const items = [
  {
    title: "Швидка доставка",
    description:
      "Доставка по Україні 1-3 дні. Безкоштовна доставка при замовленні від 1000 грн",
    icon: Truck,
    bg: "#dbeafe",
    gradient: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    title: "Гарантія якості",
    description:
      "Всі товари сертифіковані. Гарантія від виробника на всі запчастини",
    icon: Shield,
    bg: "#fef3c7",
    gradient: "linear-gradient(135deg, #ef4444, #f59e0b)",
  },
  {
    title: "Підтримка 24/7",
    description:
      "Наші консультанти завжди готові допомогти з вибором запчастин",
    icon: Phone,
    bg: "#d1fae5",
    gradient: "linear-gradient(135deg, #22c55e, #10b981)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className={css.whySection}>
      <div className={css.container}>
        <h2 className={css.title}>Чому обирають нас?</h2>

        <div className={css.grid}>
          {items.map(({ title, description, icon: Icon, gradient, bg }) => (
            <div className={css.card} key={title} style={{ background: bg }}>
              <div className={css.iconWrapper} style={{ background: gradient }}>
                <Icon size={28} color="#fff" />
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
