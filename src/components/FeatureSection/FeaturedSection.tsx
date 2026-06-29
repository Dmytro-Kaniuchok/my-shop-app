import FeaturedProductCard from "../FeaturedCard/FeaturedCard";
import css from "./FeaturedSection.module.css";

export default function FeaturedSection() {
  return (
    <section className={css.featuredSection}>
      <div className={css.featuredContainer}>
        <FeaturedProductCard />
      </div>
    </section>
  );
}
