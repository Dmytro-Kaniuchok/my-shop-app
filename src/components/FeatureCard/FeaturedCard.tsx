import Image from "next/image";
import css from "./FeaturedCard.module.css";
interface FeaturedCardProps {
  title: string;
  price: number;
  image: string;
  badge?: string;
  brand?: string;
  sku?: string;
}

export default function FeaturedCard({
  title,
  price,
  image,
  badge,
  brand,
  sku,
}: FeaturedCardProps) {
  return (
    <div className={css.card}>
      {badge && <span className={css.badge}>{badge}</span>}

      <Image
        src={image}
        alt={title}
        width={300}
        height={200}
        className={css.image}
      />

      <h3 className={css.title}>{title}</h3>

      <div className={css.brandAndArticle}>
        <span>
          Бренд:{brand || "Не вказано"} <br />
          Артикул:{sku || "Не вказано"}
        </span>
      </div>

      <p className={css.price}>{price} грн</p>

      <button className={css.button}>Купити</button>
    </div>
  );
}
