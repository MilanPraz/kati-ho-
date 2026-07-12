import { PackageSearch, PackageX } from "lucide-react";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { ProductGroupCard } from "./ProductGroupCard";
import { StoreGroupCard } from "./StoreGroupCard";
import { ViewToggle } from "./ViewToggle";
import type { ProductGroup } from "@/lib/GroupByProducts";
import type { StoreGroup } from "@/lib/GroupByStore";
import type { ViewMode } from "@/hooks/useProductComparision";

export function ResultsSection({
  query,
  loading,
  error,
  onRetry,
  productGroups,
  storeGroups,
  viewMode,
  onViewModeChange,
  activeFilterCount,
  onClearFilters,
}: {
  query: string;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  productGroups: ProductGroup[];
  storeGroups: StoreGroup[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  activeFilterCount: number;
  onClearFilters: () => void;
}) {
  if (!query) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="Nothing searched yet"
        description="Use the search bar above to compare prices for a mobile, laptop, or gadget across Nepali stores."
      />
    );
  }

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <EmptyState
        icon={PackageX}
        title="Couldn't load prices"
        description={error}
        action={
          <button
            onClick={onRetry}
            className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Try again
          </button>
        }
      />
    );
  }

  const groupsAreEmpty =
    viewMode === "product"
      ? productGroups.length === 0
      : storeGroups.length === 0;

  if (groupsAreEmpty) {
    return (
      <EmptyState
        icon={PackageX}
        title="No matching listings"
        description="Try a different search term, or clear your filters to see more results."
        action={
          activeFilterCount > 0 ? (
            <button
              onClick={onClearFilters}
              className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
            >
              Clear filters
            </button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div>
      <ViewToggle viewMode={viewMode} onChange={onViewModeChange} />
      <div className="flex flex-col gap-7">
        {viewMode === "product"
          ? productGroups.map((group) => (
              <ProductGroupCard key={group.key} group={group} />
            ))
          : storeGroups.map((group) => (
              <StoreGroupCard key={group.store} group={group} />
            ))}
      </div>
    </div>
  );
}
