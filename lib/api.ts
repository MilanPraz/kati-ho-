import type { Product, ProductsApiResponse } from "../types/product.type";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function fetchProducts(query: string): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE}/api/products/?q=${encodeURIComponent(query)}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const json: ProductsApiResponse = await res.json();
  return json.data ?? [];
}
