import { ComparisonTable, type TableGroup } from "./ComparisonTable";
import type { ProductGroup } from "@/lib/GroupByProducts";

function toTableGroups(productGroups: ProductGroup[]): TableGroup[] {
  return productGroups.map((group) => {
    const lowestPrice = Math.min(...group.items.map((i) => i.price));

    return {
      key: group.key,
      title: group.title,
      subtitle: group.brand,
      category: group.category,
      rows: group.items.map((item) => ({
        id: item.id,
        primaryLabel: item.store,
        specText: item.variant
          ? item.variant
          : item.ram || item.storage
            ? [item.ram, item.storage].filter(Boolean).join(" / ")
            : "Standard",
        price: item.price,
        priceType: item.price_type,
        inStock: item.in_stock,
        productUrl: item.product_url,
        imageUrl: item.image_url,
        category: group.category,
        isBest: item.price === lowestPrice,
      })),
    };
  });
}

export function ProductTableView({
  productGroups,
}: {
  productGroups: ProductGroup[];
}) {
  return (
    <ComparisonTable
      groups={toTableGroups(productGroups)}
      primaryColumnLabel="Store"
    />
  );
}

// import { ComparisonTable, type TableGroup } from "./ComparisonTable";
// import type { ProductGroup } from "@/lib/GroupByProducts";

// function toTableGroups(productGroups: ProductGroup[]): TableGroup[] {
//   return productGroups.map((group) => {
//     const lowestPrice = Math.min(...group.items.map((i) => i.price));

//     return {
//       key: group.key,
//       title: group.title,
//       subtitle: group.brand,
//       category: group.category,
//       rows: group.items.map((item) => ({
//         id: item.id,
//         primaryLabel: item.store,
//         specText: item.variant
//           ? item.variant
//           : item.ram || item.storage
//             ? [item.ram, item.storage].filter(Boolean).join(" / ")
//             : "Standard",
//         price: item.price,
//         priceType: item.price_type,
//         inStock: item.in_stock,
//         productUrl: item.product_url,
//         isBest: item.price === lowestPrice,
//       })),
//     };
//   });
// }

// export function ProductTableView({
//   productGroups,
// }: {
//   productGroups: ProductGroup[];
// }) {
//   return (
//     <ComparisonTable
//       groups={toTableGroups(productGroups)}
//       primaryColumnLabel="Store"
//     />
//   );
// }
