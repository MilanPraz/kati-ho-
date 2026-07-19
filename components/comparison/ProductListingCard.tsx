import { CheckCircle2, ExternalLink, XCircle } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types/product.type";

function getTitle(item: Product) {
  const spec = item.variant
    ? item.variant
    : item.ram || item.storage
      ? [item.ram, item.storage].filter(Boolean).join(" | ")
      : null;
  return spec ? `${item.model_name} (${spec})` : item.model_name;
}

export function ProductListingCard({ item }: { item: Product }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 shadow-soft-sm transition-shadow hover:shadow-soft-md">
      <div className="mb-3 flex items-center justify-center rounded-xl bg-canvas p-3">
        <ProductImage
          imageUrl={item.image_url}
          alt={`${item.brand} ${item.model_name}`}
          category={item.category}
          className="h-28 w-28"
          iconSize={30}
        />
      </div>

      <span className="text-[11px] font-extrabold uppercase tracking-wide text-ink">
        {item.brand}
      </span>
      <h3 className="mt-0.5 line-clamp-2 text-[13.5px] font-bold leading-snug text-ink">
        {getTitle(item)}
      </h3>

      <div className="mt-2 flex items-baseline gap-1">
        {item.price_type === "starting" && (
          <span className="text-[11px] font-semibold text-muted-light">
            from
          </span>
        )}
        <span className="font-mono text-lg font-extrabold text-ink">
          {formatPrice(item.price)}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-muted">
        at <span className="font-bold text-ink">{item.store}</span>
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {item.in_stock ? (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-primary-dark">
            <CheckCircle2 size={12} /> In stock
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-light">
            <XCircle size={12} /> Out of stock
          </span>
        )}
      </div>

      <div className="flex-1 items-end flex">
        <a
          href={item.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex  items-center w-full justify-center gap-1.5 rounded-full bg-primary py-2 text-xs font-bold text-white transition-colors hover:bg-primary-dark"
        >
          View Deal <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
