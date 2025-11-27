export interface Product {
  id: string;
  name: string;
  brand: string;
  sku?: string;
  price: number;
  image: string;
  description?: string;
  popular?: boolean;
}
