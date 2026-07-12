import { X } from "lucide-react";
import { FilterPanel, type FilterPanelProps } from "../filters/FilterPanel";

interface MobileFilterDrawerProps extends FilterPanelProps {
  open: boolean;
  onClose: () => void;
  resultCount: number;
}

export function MobileFilterDrawer({
  open,
  onClose,
  resultCount,
  ...filterProps
}: MobileFilterDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-[340px] flex-col overflow-y-auto bg-canvas p-5 shadow-soft-lg">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Filters</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
          >
            <X size={18} />
          </button>
        </div>

        <FilterPanel {...filterProps} />

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-bold text-white"
        >
          Show {resultCount} result{resultCount === 1 ? "" : "s"}
        </button>
      </div>
    </div>
  );
}
