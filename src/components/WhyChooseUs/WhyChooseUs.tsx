import { Truck, Shield, Phone } from "lucide-react";
import css from "./WhyChooseUs.module.css";

const items = [
  {
    title: "Швидка доставка",
    description:
      "Самовивіз або доставка по Україні протягом 1-3 днів після підтвердження замовлення.",
    icon: Truck,
    gradient: "linear-gradient(to right, #2563eb, #06b6d4)",
  },
  {
    title: "Гарантія якості",
    description:
      "Офіційна гарантія від виробника на всі товари. Обмін протягом 14 днів.",
    icon: Shield,
    gradient: "linear-gradient(to right, #ef4444, #f59e0b)",
  },
  {
    title: "Підтримка 24/7",
    description: "Завжди готові допомогти з вибором. Консультації безкоштовно.",
    icon: Phone,
    gradient: "linear-gradient(to bottom right, #22c55e, #10b981)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className={css.whySection}>
      <div className={css.container}>
        <h2 className={css.title}>Чому обирають нас?</h2>
        <div className={css.grid}>
          {items.map(({ title, description, icon: Icon, gradient }) => (
            <div className={css.card} key={title}>
              <div className={css.iconWrapper} style={{ background: gradient }}>
                <Icon size={32} color="#fff" />
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
