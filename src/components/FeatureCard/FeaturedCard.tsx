import Image from "next/image";
import css from "./FeaturedCard.module.css";

interface FeaturedCardProps {
  title: string;
  price: number;
  image: string;
  badge?: string;
}
const FeaturedCard = ({ title, price, image, badge }: FeaturedCardProps) => {
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

      <h3>{title}</h3>
      <p className={css.price}>{price} грн</p>

      <button className={css.button}>Купити</button>
    </div>
  );
};

export default FeaturedCard;
