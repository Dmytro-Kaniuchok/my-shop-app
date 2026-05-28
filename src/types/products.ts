export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  sku?: string;
  price: number;
  image: string;
  description?: string;
  popular?: boolean;
  badge?: string;
  rating?: number;
  ratingCount?: number;
  inStock?: boolean;
  reviews?: number;
}
