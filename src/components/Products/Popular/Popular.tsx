import css from "./Popular.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/src/types/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getPopularProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return data.filter((item: Product) => item.popular).slice(0, 8);
}

export default async function Popular() {
  const popularProducts = await getPopularProducts();

  return (
    <section className={css.popular}>
      <div className={css.popularWrapper}>
        <h2 className={css.popularTitle}>Популярні товари</h2>

        <div className={css.products}>
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
