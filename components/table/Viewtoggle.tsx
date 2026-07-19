import { LayoutGrid, Store } from "lucide-react";
import type { ViewMode } from "@/hooks/useProductComparision";

export function ViewToggle({
  viewMode,
  onChange,
}: {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-soft-sm">
      <button
        onClick={() => onChange("product")}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
          viewMode === "product"
            ? "bg-primary text-white"
            : "text-muted hover:text-ink"
        }`}
      >
        <LayoutGrid size={14} /> Compare by product
      </button>
      <button
        onClick={() => onChange("store")}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
          viewMode === "store"
            ? "bg-primary text-white"
            : "text-muted hover:text-ink"
        }`}
      >
        <Store size={14} /> Browse by store
      </button>
    </div>
  );
}
