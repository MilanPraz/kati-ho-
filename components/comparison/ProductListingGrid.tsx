import { ProductListingCard } from "./ProductListingCard";
import type { Product } from "@/types/product.type";

export function ProductListingGrid({ products }: { products: Product[] }) {
  console.log("ProductListingGrid products:", products); // Debugging line
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((item) => (
        <ProductListingCard key={item.id} item={item} />
      ))}
    </div>
  );
}
