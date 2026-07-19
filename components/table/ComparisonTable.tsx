import { CheckCircle2, ExternalLink, Package, XCircle } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/CategoryIcon";
import { formatPrice } from "@/lib/formatPrice";
import { ProductImage } from "../comparison/ProductImage";

export interface TableRow {
  id: string;
  primaryLabel: string;
  specText: string;
  price: number;
  priceType: string;
  inStock: boolean;
  productUrl: string;
  imageUrl?: string | null;
  category: string;
  isBest?: boolean;
}

export interface TableGroup {
  key: string;
  title: string;
  subtitle: string;
  category: string;
  rows: TableRow[];
}

export function ComparisonTable({
  groups,
  primaryColumnLabel,
}: {
  groups: TableGroup[];
  primaryColumnLabel: string;
}) {
  return (
    <div className="flex flex-col gap-7">
      {groups.map((group) => {
        const Icon = CATEGORY_ICONS[group.category] ?? Package;

        return (
          <div
            key={group.key}
            className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft-sm"
          >
            {/* Group header */}
            <div className="flex items-center gap-3 border-b border-line bg-primary-light/60 px-5 py-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                <Icon size={17} />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-extrabold">
                  {group.title}
                </h3>
                <p className="text-[11.5px] font-semibold text-muted-light">
                  {group.subtitle}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[11px] font-bold uppercase tracking-wide text-muted-light">
                    <th className="px-5 py-3 font-bold">
                      {primaryColumnLabel}
                    </th>
                    <th className="px-5 py-3 font-bold">Spec</th>
                    <th className="px-5 py-3 font-bold">Availability</th>
                    <th className="px-5 py-3 font-bold">Price</th>
                    <th className="px-5 py-3 text-right font-bold">Deal</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`border-b border-line last:border-b-0 ${
                        row.isBest ? "bg-primary-light" : ""
                      }`}
                    >
                      <td className="px-5 py-3.5 align-top">
                        <div className="flex items-center gap-3">
                          <ProductImage
                            imageUrl={row.imageUrl}
                            alt={row.primaryLabel}
                            category={row.category}
                            className="h-10 w-10"
                            iconSize={16}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-extrabold ${
                                  row.isBest ? "text-primary-dark" : "text-ink"
                                }`}
                              >
                                {row.primaryLabel}
                              </span>
                              {row.isBest && (
                                <span className="flex-shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#3A2600]">
                                  Best deal
                                </span>
                              )}
                            </div>
                            <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-light">
                              {row.priceType === "starting"
                                ? "Starting price"
                                : "Exact price"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 align-top text-muted">
                        {row.specText}
                      </td>
                      <td className="px-5 py-3.5 align-top">
                        {row.inStock ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-primary-dark">
                            <CheckCircle2 size={13} /> In stock
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold text-muted-light">
                            <XCircle size={13} /> Out of stock
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 align-top">
                        <span
                          className={`font-mono text-[15px] font-bold ${
                            row.isBest ? "text-primary-dark" : "text-ink"
                          }`}
                        >
                          {formatPrice(row.price)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right align-top">
                        <a
                          href={row.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                            row.isBest
                              ? "bg-primary text-white hover:bg-primary-dark"
                              : "bg-ink/5 text-ink hover:bg-ink/10"
                          }`}
                        >
                          View <ExternalLink size={12} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// import { CheckCircle2, ExternalLink, Package, XCircle } from "lucide-react";
// // import { CATEGORY_ICONS } from "@/lib/categoryIcons";
// import { formatPrice } from "@/lib/formatPrice";

// export interface TableRow {
//   id: string;
//   primaryLabel: string;
//   specText: string;
//   price: number;
//   priceType: string;
//   inStock: boolean;
//   productUrl: string;
//   isBest?: boolean;
// }

// export interface TableGroup {
//   key: string;
//   title: string;
//   subtitle: string;
//   category: string;
//   rows: TableRow[];
// }

// export function ComparisonTable({
//   groups,
//   primaryColumnLabel,
// }: {
//   groups: TableGroup[];
//   primaryColumnLabel: string;
// }) {
//   const CATEGORY_ICONS: Record<
//     string,
//     React.ComponentType<{ size?: number }>
//   > = {
//     "Mobile Phones": Package,
//     Laptops: Package,
//     Tablets: Package,
//     Accessories: Package,
//   };
//   return (
//     <div className="flex flex-col gap-7">
//       {groups.map((group) => {
//         const Icon = CATEGORY_ICONS[group.category] ?? Package;

//         return (
//           <div
//             key={group.key}
//             className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft-sm"
//           >
//             {/* Group header */}
//             <div className="flex items-center gap-3 border-b border-line bg-primary-light/60 px-5 py-4">
//               <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
//                 <Icon size={17} />
//               </div>
//               <div className="min-w-0">
//                 <h3 className="truncate text-[15px] font-extrabold">
//                   {group.title}
//                 </h3>
//                 <p className="text-[11.5px] font-semibold text-muted-light">
//                   {group.subtitle}
//                 </p>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[560px] border-collapse text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-line text-[11px] font-bold uppercase tracking-wide text-muted-light">
//                     <th className="px-5 py-3 font-bold">
//                       {primaryColumnLabel}
//                     </th>
//                     <th className="px-5 py-3 font-bold">Spec</th>
//                     <th className="px-5 py-3 font-bold">Availability</th>
//                     <th className="px-5 py-3 font-bold">Price</th>
//                     <th className="px-5 py-3 text-right font-bold">Deal</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {group.rows.map((row) => (
//                     <tr
//                       key={row.id}
//                       className={`border-b border-line last:border-b-0 ${
//                         row.isBest ? "bg-primary-light" : ""
//                       }`}
//                     >
//                       <td className="px-5 py-3.5 align-top">
//                         <div className="flex items-center gap-2">
//                           <span
//                             className={`font-extrabold ${
//                               row.isBest ? "text-primary-dark" : "text-ink"
//                             }`}
//                           >
//                             {row.primaryLabel}
//                           </span>
//                           {row.isBest && (
//                             <span className="flex-shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#3A2600]">
//                               Best deal
//                             </span>
//                           )}
//                         </div>
//                         <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-light">
//                           {row.priceType === "starting"
//                             ? "Starting price"
//                             : "Exact price"}
//                         </span>
//                       </td>
//                       <td className="px-5 py-3.5 align-top text-muted">
//                         {row.specText}
//                       </td>
//                       <td className="px-5 py-3.5 align-top">
//                         {row.inStock ? (
//                           <span className="flex items-center gap-1 text-xs font-semibold text-primary-dark">
//                             <CheckCircle2 size={13} /> In stock
//                           </span>
//                         ) : (
//                           <span className="flex items-center gap-1 text-xs font-semibold text-muted-light">
//                             <XCircle size={13} /> Out of stock
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-5 py-3.5 align-top">
//                         <span
//                           className={`font-mono text-[15px] font-bold ${
//                             row.isBest ? "text-primary-dark" : "text-ink"
//                           }`}
//                         >
//                           {formatPrice(row.price)}
//                         </span>
//                       </td>
//                       <td className="px-5 py-3.5 text-right align-top">
//                         <a
//                           href={row.productUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
//                             row.isBest
//                               ? "bg-primary text-white hover:bg-primary-dark"
//                               : "bg-ink/5 text-ink hover:bg-ink/10"
//                           }`}
//                         >
//                           View <ExternalLink size={12} />
//                         </a>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
