import { FilterSection } from "./FilterSection";
import { CheckboxRow } from "./CheckboxRow";
import { RadioRow } from "./RadioRow";
import { PillToggle } from "./PillToggle";
import type { SortOrder } from "@/hooks/useProductComparision";

export interface FilterPanelProps {
  storeOptions: string[];
  ramOptions: string[];
  storageOptions: string[];
  selectedStores: Set<string>;
  selectedRam: Set<string>;
  selectedStorage: Set<string>;
  inStockOnly: boolean;
  sortOrder: SortOrder;
  activeFilterCount: number;
  onToggleStore: (v: string) => void;
  onToggleRam: (v: string) => void;
  onToggleStorage: (v: string) => void;
  onToggleInStock: () => void;
  onSortChange: (v: SortOrder) => void;
  onClear: () => void;
}

export function FilterPanel({
  storeOptions,
  ramOptions,
  storageOptions,
  selectedStores,
  selectedRam,
  selectedStorage,
  inStockOnly,
  sortOrder,
  activeFilterCount,
  onToggleStore,
  onToggleRam,
  onToggleStorage,
  onToggleInStock,
  onSortChange,
  onClear,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-7 rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-24 lg:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-muted-light">
          Filters
        </h3>
        {activeFilterCount > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-bold text-accent-dark hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Sort by price">
        <div className="flex flex-col gap-2">
          <RadioRow
            label="Low to high"
            checked={sortOrder === "asc"}
            onClick={() => onSortChange("asc")}
          />
          <RadioRow
            label="High to low"
            checked={sortOrder === "desc"}
            onClick={() => onSortChange("desc")}
          />
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <CheckboxRow
          label="In stock only"
          checked={inStockOnly}
          onClick={onToggleInStock}
        />
      </FilterSection>

      {storeOptions.length > 0 && (
        <FilterSection title="Store">
          <div className="flex flex-col gap-2">
            {storeOptions.map((store) => (
              <CheckboxRow
                key={store}
                label={store}
                checked={selectedStores.has(store)}
                onClick={() => onToggleStore(store)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {ramOptions.length > 0 && (
        <FilterSection title="RAM">
          <div className="flex flex-wrap gap-2">
            {ramOptions.map((ram) => (
              <PillToggle
                key={ram}
                label={ram}
                checked={selectedRam.has(ram)}
                onClick={() => onToggleRam(ram)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {storageOptions.length > 0 && (
        <FilterSection title="Storage">
          <div className="flex flex-wrap gap-2">
            {storageOptions.map((storage) => (
              <PillToggle
                key={storage}
                label={storage}
                checked={selectedStorage.has(storage)}
                onClick={() => onToggleStorage(storage)}
              />
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );
}
