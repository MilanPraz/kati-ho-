import { CheckCircle2, ExternalLink, XCircle } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types/product.type";

function getSpecText(item: Product) {
  if (item.variant) return item.variant;
  if (item.ram || item.storage)
    return [item.ram, item.storage].filter(Boolean).join(" / ");
  return "Standard";
}

export function ListingRow({
  item,
  isBest,
  primaryLabel,
  category,
}: {
  item: Product;
  isBest: boolean;
  primaryLabel: string;
  category: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border p-3.5 sm:flex-row sm:items-center sm:gap-4 ${
        isBest ? "border-primary bg-primary-light" : "border-line bg-canvas"
      }`}
    >
      <div className="flex flex-1 items-center gap-3">
        <ProductImage
          imageUrl={item.image_url}
          alt={`${item.brand} ${item.model_name}`}
          category={category}
          className="h-11 w-11"
          iconSize={18}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold">{primaryLabel}</span>
            {isBest && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#3A2600]">
                Best deal
              </span>
            )}
            <span className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-bold uppercase text-muted-light">
              {item.price_type === "starting"
                ? "Starting price"
                : "Exact price"}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
            <span>{getSpecText(item)}</span>
            <span className="text-line">•</span>
            {item.in_stock ? (
              <span className="flex items-center gap-1 font-semibold text-primary-dark">
                <CheckCircle2 size={12} /> In stock
              </span>
            ) : (
              <span className="flex items-center gap-1 font-semibold text-muted-light">
                <XCircle size={12} /> Out of stock
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span
          className={`font-mono text-lg font-bold ${isBest ? "text-primary-dark" : "text-ink"}`}
        >
          {formatPrice(item.price)}
        </span>
        <a
          href={item.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
            isBest
              ? "bg-primary text-white hover:bg-primary-dark"
              : "bg-ink/5 text-ink hover:bg-ink/10"
          }`}
        >
          View Deal <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

// import { CheckCircle2, ExternalLink, XCircle } from "lucide-react";
// import { ProductPlaceholder } from "./ProductPlaceholder";
// import { formatPrice } from "@/lib/formatPrice";
// import type { Product } from "@/types/product.type";

// function getSpecText(item: Product) {
//   if (item.variant) return item.variant;
//   if (item.ram || item.storage)
//     return [item.ram, item.storage].filter(Boolean).join(" / ");
//   return "Standard";
// }

// export function ListingRow({
//   item,
//   isBest,
//   primaryLabel,
//   category,
// }: {
//   item: Product;
//   isBest: boolean;
//   primaryLabel: string;
//   category: string;
// }) {
//   return (
//     <div
//       className={`flex flex-col gap-3 rounded-xl border p-3.5 sm:flex-row sm:items-center sm:gap-4 ${
//         isBest ? "border-primary bg-primary-light" : "border-line bg-canvas"
//       }`}
//     >
//       <div className="flex flex-1 items-center gap-3">
//         <ProductPlaceholder category={category} className="h-11 w-11" />
//         <div className="min-w-0">
//           <div className="flex flex-wrap items-center gap-2">
//             <span className="text-sm font-extrabold">{primaryLabel}</span>
//             {isBest && (
//               <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#3A2600]">
//                 Best deal
//               </span>
//             )}
//             <span className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-bold uppercase text-muted-light">
//               {item.price_type === "starting"
//                 ? "Starting price"
//                 : "Exact price"}
//             </span>
//           </div>
//           <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
//             <span>{getSpecText(item)}</span>
//             <span className="text-line">•</span>
//             {item.in_stock ? (
//               <span className="flex items-center gap-1 font-semibold text-primary-dark">
//                 <CheckCircle2 size={12} /> In stock
//               </span>
//             ) : (
//               <span className="flex items-center gap-1 font-semibold text-muted-light">
//                 <XCircle size={12} /> Out of stock
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between gap-4 sm:justify-end">
//         <span
//           className={`font-mono text-lg font-bold ${isBest ? "text-primary-dark" : "text-ink"}`}
//         >
//           {formatPrice(item.price)}
//         </span>
//         <a
//           href={item.product_url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
//             isBest
//               ? "bg-primary text-white hover:bg-primary-dark"
//               : "bg-ink/5 text-ink hover:bg-ink/10"
//           }`}
//         >
//           View Deal <ExternalLink size={13} />
//         </a>
//       </div>
//     </div>
//   );
// }
