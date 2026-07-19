import { ComparisonTable, type TableGroup } from "./ComparisonTable";
import type { StoreGroup } from "@/lib/GroupByStore";

function toTableGroups(storeGroups: StoreGroup[]): TableGroup[] {
  return storeGroups.map((group) => ({
    key: group.store,
    title: group.store,
    subtitle: `${group.items.length} matching listing${group.items.length === 1 ? "" : "s"}`,
    category: group.items[0]?.category ?? "",
    rows: group.items.map((item) => ({
      id: item.id,
      primaryLabel: item.model_name
        .toLowerCase()
        .startsWith(item.brand.toLowerCase())
        ? item.model_name
        : `${item.brand} ${item.model_name}`,
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
      category: item.category,
      // "Best deal" doesn't apply when comparing a store's own different
      // products against each other, so no row is marked best here.
    })),
  }));
}

export function StoreTableView({ storeGroups }: { storeGroups: StoreGroup[] }) {
  return (
    <ComparisonTable
      groups={toTableGroups(storeGroups)}
      primaryColumnLabel="Product"
    />
  );
}

// import { ComparisonTable, type TableGroup } from "./ComparisonTable";
// import type { StoreGroup } from "@/lib/GroupByStore";

// function toTableGroups(storeGroups: StoreGroup[]): TableGroup[] {
//   return storeGroups.map((group) => ({
//     key: group.store,
//     title: group.store,
//     subtitle: `${group.items.length} matching listing${group.items.length === 1 ? "" : "s"}`,
//     category: group.items[0]?.category ?? "",
//     rows: group.items.map((item) => ({
//       id: item.id,
//       primaryLabel: item.model_name
//         .toLowerCase()
//         .startsWith(item.brand.toLowerCase())
//         ? item.model_name
//         : `${item.brand} ${item.model_name}`,
//       specText: item.variant
//         ? item.variant
//         : item.ram || item.storage
//           ? [item.ram, item.storage].filter(Boolean).join(" / ")
//           : "Standard",
//       price: item.price,
//       priceType: item.price_type,
//       inStock: item.in_stock,
//       productUrl: item.product_url,
//       // "Best deal" doesn't apply when comparing a store's own different
//       // products against each other, so no row is marked best here.
//     })),
//   }));
// }

// export function StoreTableView({ storeGroups }: { storeGroups: StoreGroup[] }) {
//   return (
//     <ComparisonTable
//       groups={toTableGroups(storeGroups)}
//       primaryColumnLabel="Product"
//     />
//   );
// }
