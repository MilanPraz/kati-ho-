import { CheckCircle2, ExternalLink, XCircle } from "lucide-react";
// import { ProductImage } from ".. /ProductImage";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types/product.type";
import { ProductImage } from "@/components/comparison/ProductImage";

function getSpecText(item: Product) {
  if (item.variant) return item.variant;
  if (item.ram || item.storage)
    return [item.ram, item.storage].filter(Boolean).join(" / ");
  return "Standard";
}

export function ProductFlatTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] font-bold uppercase tracking-wide text-muted-light">
              <th className="px-5 py-3 font-bold">Product</th>
              <th className="px-5 py-3 font-bold">Store</th>
              <th className="px-5 py-3 font-bold">Spec</th>
              <th className="px-5 py-3 font-bold">Availability</th>
              <th className="px-5 py-3 font-bold">Price</th>
              <th className="px-5 py-3 text-right font-bold">Deal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className="border-b border-line last:border-b-0"
              >
                <td className="px-5 py-3.5 align-top">
                  <div className="flex items-center gap-3">
                    <ProductImage
                      imageUrl={item.image_url}
                      alt={`${item.brand} ${item.model_name}`}
                      category={item.category}
                      className="h-10 w-10"
                      iconSize={16}
                    />
                    <div>
                      <span className="block text-[11px] font-extrabold uppercase tracking-wide text-muted-light">
                        {item.brand}
                      </span>
                      <span className="font-bold text-ink">
                        {item.model_name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 align-top font-semibold text-ink">
                  {item.store}
                </td>
                <td className="px-5 py-3.5 align-top text-muted">
                  {getSpecText(item)}
                </td>
                <td className="px-5 py-3.5 align-top">
                  {item.in_stock ? (
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
                  <span className="font-mono text-[15px] font-bold text-ink">
                    {formatPrice(item.price)}
                  </span>
                  {item.price_type === "starting" && (
                    <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-light">
                      Starting price
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-right align-top">
                  <a
                    href={item.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3.5 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-ink/10"
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
}
