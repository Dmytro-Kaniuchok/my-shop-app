"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  p: Product;
  handleClick: (id: string) => void;
}

export default function ProductCard({ p, handleClick }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(p.image);

  return (
    <li className={styles.item}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={imgSrc}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={styles.image}
            onError={() =>
              setImgSrc(
                "https://dummyimage.com/200x200/fff/000000&text=Немає+Зображення&"
              )
            }
          />
        </div>
        <div className={styles.productInfo}>
          <span className={styles.productName}>{p.name}</span>
          <span className={styles.productPrice}>{p.price} грн</span>
          <button
            className={styles.detailsBtn}
            onClick={() => handleClick(p.id)}
          >
            Детальніше
          </button>
        </div>
      </div>
    </li>
  );
}
