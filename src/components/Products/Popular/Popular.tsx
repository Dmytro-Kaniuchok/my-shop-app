import css from "./Popular.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/src/types/products";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

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
        <div className={css.popularTitle}>
          <h2 className={css.title}>Популярні товари</h2>

          <Link
            href="/catalog"
            className={css.button}
            aria-label="Перейти до повного каталогу товарів"
          >
            Дивитись весь каталог <LayoutGrid size={26} />
          </Link>
        </div>

        <div className={css.products}>
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
