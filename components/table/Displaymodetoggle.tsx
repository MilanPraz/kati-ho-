import { LayoutGrid, Table } from "lucide-react";
import type { DisplayMode } from "@/hooks/useProductComparision";

export function DisplayModeToggle({
  displayMode,
  onChange,
}: {
  displayMode: DisplayMode;
  onChange: (mode: DisplayMode) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-surface  shadow-soft-sm p-1">
      <button
        onClick={() => onChange("cards")}
        aria-label="View as cards"
        title="View as cards"
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
          displayMode === "cards"
            ? "bg-primary text-white"
            : "text-muted hover:text-ink"
        }`}
      >
        <LayoutGrid size={14} />
        <span className="hidden sm:inline">Cards</span>
      </button>
      <button
        onClick={() => onChange("table")}
        aria-label="View as table"
        title="View as table"
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
          displayMode === "table"
            ? "bg-primary text-white"
            : "text-muted hover:text-ink"
        }`}
      >
        <Table size={14} />
        <span className="hidden sm:inline">Table</span>
      </button>
    </div>
  );
}
