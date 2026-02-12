"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import css from "./Popular.module.css";
import toast from "react-hot-toast";
import Link from "next/link";

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

interface CartProduct extends Product {
  quantity: number;
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
          .slice(0, 8);

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

  const handleAddToCart = () => {
    const existingCart = localStorage.getItem("cart");
    const cart: CartProduct[] = existingCart ? JSON.parse(existingCart) : [];

    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Товар додано до кошика!");
  };

  return (
    <div className={css.productCard}>
      <Image
        src={imgSrc}
        alt={product.name}
        width={250}
        height={250}
        onError={() =>
          setImgSrc(
            "https://dummyimage.com/250x250/fff/000000&text=Немає+зображення",
          )
        }
      />

      <h3>{product.name}</h3>

      <span className={css.brandAndArticle}>
        Бренд: {product.brand || "не вказано"} <br />
        Артикул: {product.sku || "не вказано"}
      </span>
      <div className={css.cardFooter}>
        <div className={css.priceRow}>
          <span className={css.price}>{product.price} грн</span>

          <button onClick={handleAddToCart} className={css.buyBtn}>
            Купити
          </button>
        </div>

        <Link href={`/product/${product.id}`} className={css.detailsLink}>
          Дивитися детальніше
        </Link>
      </div>
    </div>
  );
};

export default Popular;
