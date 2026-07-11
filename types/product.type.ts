export interface Product {
  store: string;
  category: string;
  brand: string;
  model_name: string;
  variant: string | null;
  ram: string | null;
  storage: string | null;
  price: number;
  price_text: string;
  price_type: "starting" | "exact" | string;
  currency: string;
  product_url: string;
  source_url: string;
  in_stock: boolean;
  scraped_at: string;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ProductsApiResponse {
  message: string;
  count: number;
  data: Product[];
  cached: boolean;
}
