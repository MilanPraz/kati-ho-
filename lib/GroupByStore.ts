import type { Product } from "@/types/product.type";

export interface StoreGroup {
  store: string;
  items: Product[];
  lowestPrice: number;
}

export function groupByStore(products: Product[]): StoreGroup[] {
  const map = new Map<string, Product[]>();

  for (const product of products) {
    if (!map.has(product.store)) map.set(product.store, []);
    map.get(product.store)!.push(product);
  }

  return Array.from(map.entries())
    .map(([store, items]) => ({
      store,
      items,
      lowestPrice: Math.min(...items.map((i) => i.price)),
    }))
    .sort((a, b) => a.store.localeCompare(b.store));
}
