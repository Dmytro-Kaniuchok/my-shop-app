"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import css from "./Popular.module.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  brand?: string;
  sku?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();

        const filtered = data
          .filter((item: Product) => item.popular)
          .slice(0, 6);

        setPopularProducts(filtered);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  if (loading)
    return (
      <section className={css.popular}>
        <p className={css.p}>Завантаження популярних товарів...</p>
        <div className={css.loaderWrapper}>
          <span className={css.loader}></span>
        </div>
      </section>
    );

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
};

const ProductCard = ({ product }: { product: Product }) => {
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <div className={css.productCard}>
      <Image
        src={imgSrc}
        alt={product.name}
        width={250}
        height={250}
        onError={() =>
          setImgSrc(
            "https://dummyimage.com/250x250/fff/000000&text=Немає+зображення"
          )
        }
      />

      <h3>{product.name}</h3>

      <span className={css.brandAndArticle}>
        Бренд: {product.brand || "не вказано"} <br />
        Артикул: {product.sku || "не вказано"}
      </span>

      <span className={css.price}>{product.price} грн</span>

      <Link href={`/product/${product.id}`} className={css.buyBtn}>
        Детальніше
      </Link>
    </div>
  );
};

export default Popular;
