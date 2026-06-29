import FeaturedCardClient from "./FeaturedCardClient";
import { Product } from "@/src/types/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getFeaturedProduct(): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data: Product[] = await res.json();
    const popular = data.filter((p) => p.popular && p.inStock !== false);
    if (!popular.length) return null;
    return popular[Math.floor(Math.random() * popular.length)];
  } catch {
    return null;
  }
}

export default async function FeaturedCard() {
  const product = await getFeaturedProduct();
  if (!product) return null;

  return <FeaturedCardClient product={product} />;
}
