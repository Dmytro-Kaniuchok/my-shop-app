import FeaturedProductCard from "../FeaturedCard/FeaturedCard";
import css from "./FeaturedSection.module.css";

export default function FeaturedSection() {
  const product = {
    id: "1",
    name: "Паливний фільтр",
    price: 350,
    image:
      "https://res.cloudinary.com/dqzzwskbk/image/upload/v1765194272/fuel-filter_wk4tvb.webp",
    inStock: true,
    brand: "Mann",
    rating: 4,
    ratingCount: 19,
    description:
      "Високоефективний паливний фільтр Mann Filter для дизельних двигунів. Забезпечує надійне очищення палива від забруднень та води. Подовжує термін служби паливної системи та форсунок.",
  };

  return (
    <section className={css.featuredSection}>
      <div className={css.featuredContainer}>
        <FeaturedProductCard product={product} />
      </div>
    </section>
  );
}
