import type { Product } from "../types/product.type";

export interface ProductGroup {
  key: string;
  title: string;
  brand: string;
  category: string;
  items: Product[];
}

/**
 * Different stores name and format the same model differently
 * (e.g. "Samsung Galaxy S26 Ultra" vs "Galaxy S26 Ultra"). This groups
 * products that represent the same underlying model together so they can
 * be compared store-by-store, while keeping distinct models
 * (S26 vs S26+ vs S26 Ultra) as separate groups.
 */
export function groupByModel(products: Product[]): ProductGroup[] {
  const map = new Map<string, Product[]>();

  for (const product of products) {
    const brandLower = product.brand.trim().toLowerCase();
    const modelLower = product.model_name.trim().toLowerCase();
    const normalized = modelLower.startsWith(brandLower)
      ? modelLower
      : `${brandLower} ${modelLower}`;
    const key = normalized.replace(/\s+/g, " ").trim();

    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(product);
  }

  return Array.from(map.entries()).map(([key, items]) => {
    // Prefer the most descriptive model name as the display title
    const longest = items.reduce((a, b) =>
      a.model_name.length >= b.model_name.length ? a : b,
    );
    const title = longest.model_name
      .toLowerCase()
      .startsWith(longest.brand.toLowerCase())
      ? longest.model_name
      : `${longest.brand} ${longest.model_name}`;

    return {
      key,
      title,
      brand: longest.brand,
      category: longest.category,
      items,
    };
  });
}
