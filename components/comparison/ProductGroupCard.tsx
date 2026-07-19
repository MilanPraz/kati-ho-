import { RefreshCcw } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { ListingRow } from "./ListingRow";
import { formatPrice } from "@/lib/formatPrice";
import { notchStyle } from "@/lib/notch";
import type { ProductGroup } from "@/lib/GroupByProducts";

export function ProductGroupCard({ group }: { group: ProductGroup }) {
  const sorted = [...group.items].sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  const priciest = sorted[sorted.length - 1];
  const otherStoreCount = group.items.length - 1;
  const savings = priciest.price - cheapest.price;

  // Use the first listing that actually has an image
  const representativeImage =
    group.items.find((i) => i.image_url)?.image_url ?? null;

  return (
    <div className="relative rounded-t-2xl border border-b-0 border-line bg-surface p-5 pb-6 shadow-soft-sm sm:p-6">
      {/* Summary header — product photo, title, and best price at a glance */}
      <div className="mb-5 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-start">
        <ProductImage
          imageUrl={representativeImage}
          alt={group.title}
          category={group.category}
          className="h-24 w-24 self-start sm:h-28 sm:w-28"
          iconSize={30}
        />

        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wide text-ink">
            {group.brand}
          </span>
          <p className="text-xs text-muted-light">{group.category}</p>
          <h3 className="mt-1 text-base font-bold leading-snug sm:text-lg">
            {group.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
            <span className="text-xs font-semibold text-muted-light">from</span>
            <span className="font-mono text-xl font-extrabold text-ink sm:text-2xl">
              {formatPrice(cheapest.price)}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted">
            at <span className="font-bold text-ink">{cheapest.store}</span>
            {otherStoreCount > 0 &&
              ` +${otherStoreCount} more ${otherStoreCount === 1 ? "store" : "stores"}`}
          </p>

          {savings > 0 && (
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-[11px] font-bold text-primary-dark">
              <RefreshCcw size={11} /> Save up to {formatPrice(savings)} by
              comparing
            </span>
          )}
        </div>
      </div>

      {/* Per-store breakdown */}
      <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-light">
        All {group.items.length} price{group.items.length === 1 ? "" : "s"}
      </p>
      <div className="flex flex-col gap-2.5">
        {sorted.map((item) => (
          <ListingRow
            key={item.id}
            item={item}
            isBest={item.price === cheapest.price}
            primaryLabel={item.store}
            category={group.category}
          />
        ))}
      </div>

      <div
        className="absolute -bottom-[12px] left-0 right-0 h-[13px] [filter:drop-shadow(0_4px_4px_rgba(18,33,29,0.05))]"
        style={notchStyle("%23FFFFFF", 14, 13)}
      />
    </div>
  );
}

// import { ProductImage } from "./ProductImage";
// import { ListingRow } from "./ListingRow";
// import { formatPrice } from "@/lib/formatPrice";
// import { notchStyle } from "@/lib/notch";
// import type { ProductGroup } from "@/lib/groupProducts";

// export function ProductGroupCard({ group }: { group: ProductGroup }) {
//   const lowestPrice =
//     group.items.length > 0
//       ? Math.min(...group.items.map((item) => item.price))
//       : 0;

//   const bestItem = group.items.find((item) => item.price === lowestPrice);

//   return (
//     <div className="relative rounded-t-2xl border border-b-0 border-line bg-surface p-5 pb-6 shadow-soft-sm transition-shadow duration-300 hover:shadow-lg sm:p-6">
//       <div className="mb-5 flex items-start justify-between gap-4">
//         <div className="flex min-w-0 items-center gap-4">
//           <ProductImage
//             imageUrl={bestItem?.image_url}
//             alt={group.title}
//             category={group.category}
//           />

//           <div className="min-w-0">
//             <span className="mb-1.5 inline-flex rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
//               {group.brand}
//             </span>

//             <h3 className="line-clamp-2 text-lg font-extrabold leading-snug sm:text-xl">
//               {group.title}
//             </h3>

//             <p className="mt-1 text-xs font-semibold text-muted-light">
//               Compared across {group.items.length} store
//               {group.items.length === 1 ? "" : "s"}
//             </p>

//             <div className="mt-2 sm:hidden">
//               <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-light">
//                 Best price{" "}
//               </span>

//               <span className="font-mono text-sm font-bold text-primary-dark">
//                 {formatPrice(lowestPrice)}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="hidden flex-shrink-0 rounded-xl bg-primary-light/60 px-3 py-2 text-right sm:block">
//           <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-light">
//             Best price
//           </span>

//           <span className="font-mono text-lg font-bold text-primary-dark">
//             {formatPrice(lowestPrice)}
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-col gap-2.5">
//         {group.items.map((item) => (
//           <ListingRow
//             key={item.id}
//             item={item}
//             isBest={item.price === lowestPrice}
//             primaryLabel={item.store}
//             category={group.category}
//           />
//         ))}
//       </div>

//       <div
//         className="absolute -bottom-[12px] left-0 right-0 h-[13px] [filter:drop-shadow(0_4px_4px_rgba(18,33,29,0.05))]"
//         style={notchStyle("%23FFFFFF", 14, 13)}
//       />
//     </div>
//   );
// }

// // import { ProductPlaceholder } from "./ProductPlaceholder";
// // import { ListingRow } from "./ListingRow";
// // import { formatPrice } from "@/lib/formatPrice";
// // import { notchStyle } from "@/lib/notch";
// // import type { ProductGroup } from "@/lib/groupProducts";

// // export function ProductGroupCard({ group }: { group: ProductGroup }) {
// //   const lowestPrice = Math.min(...group.items.map((i) => i.price));

// //   return (
// //     <div className="relative rounded-t-2xl border border-b-0 border-line bg-surface p-5 pb-6 shadow-soft-sm sm:p-6">
// //       <div className="mb-5 flex items-start justify-between gap-4">
// //         <div className="flex items-center gap-3.5">
// //           <ProductPlaceholder category={group.category} />
// //           <div>
// //             <span className="mb-1 inline-block rounded-full bg-primary-light px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
// //               {group.brand}
// //             </span>
// //             <h3 className="text-lg font-extrabold leading-snug sm:text-xl">
// //               {group.title}
// //             </h3>
// //           </div>
// //         </div>
// //         <div className="hidden flex-shrink-0 text-right sm:block">
// //           <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-light">
// //             Best price
// //           </span>
// //           <span className="font-mono text-lg font-bold text-primary-dark">
// //             {formatPrice(lowestPrice)}
// //           </span>
// //         </div>
// //       </div>

// //       <div className="flex flex-col gap-2.5">
// //         {group.items.map((item) => (
// //           <ListingRow
// //             key={item.id}
// //             item={item}
// //             isBest={item.price === lowestPrice}
// //             primaryLabel={item.store}
// //             category={group.category}
// //           />
// //         ))}
// //       </div>

// //       <div
// //         className="absolute -bottom-[12px] left-0 right-0 h-[13px] [filter:drop-shadow(0_4px_4px_rgba(18,33,29,0.05))]"
// //         style={notchStyle("%23FFFFFF", 14, 13)}
// //       />
// //     </div>
// //   );
// // }
