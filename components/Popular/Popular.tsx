"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import css from "./Popular.module.css";
import { products } from "@/data/products";

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

const Popular = () => {
  const popularProducts = products.filter((item) => item.popular).slice(0, 5);

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
            "https://dummyimage.com/250x250/fff/000000&text=Немає+Зображення"
          )
        }
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className={css.price}>{product.price} грн</p>
      <Link href={`/product/${product.id}`} className={css.buyBtn}>
        Детальніше
      </Link>
    </div>
  );
};

export default Popular;
