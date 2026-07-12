import { ListingRow } from "./ListingRow";
import { formatPrice } from "@/lib/formatPrice";
import { notchStyle } from "@/lib/notch";
import type { StoreGroup } from "@/lib/GroupByStore";

export function StoreGroupCard({ group }: { group: StoreGroup }) {
  const initial = group.store.trim().charAt(0).toUpperCase();

  return (
    <div className="relative rounded-t-2xl border border-b-0 border-line bg-surface p-5 pb-6 shadow-soft-sm sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-base font-extrabold text-white">
            {initial}
          </div>
          <div>
            <h3 className="text-lg font-extrabold leading-snug sm:text-xl">
              {group.store}
            </h3>
            <p className="text-xs font-semibold text-muted-light">
              {group.items.length} matching listing
              {group.items.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <div className="hidden flex-shrink-0 text-right sm:block">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-light">
            From
          </span>
          <span className="font-mono text-lg font-bold text-primary-dark">
            {formatPrice(group.lowestPrice)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {group.items.map((item) => (
          <ListingRow
            key={item.id}
            item={item}
            isBest={false}
            primaryLabel={
              item.model_name.toLowerCase().startsWith(item.brand.toLowerCase())
                ? item.model_name
                : `${item.brand} ${item.model_name}`
            }
            category={item.category}
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
