"use client";

import { Suspense, useState } from "react";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { Loader2 } from "lucide-react";

import { useProductComparision } from "@/hooks/useProductComparision";
import { ComparisonHeader } from "@/components/comparison/ComparisonHeader";
import { ResultsHeading } from "@/components/comparison/ResultsHeading";
import { ResultsSection } from "@/components/comparison/ResultsSection";
import { MobileFilterDrawer } from "@/components/comparison/MobileFilterDrawer";
import { FilterPanel } from "@/components/filters/FilterPanel";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-plex-mono",
});

export default function ComparisonPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center bg-canvas">
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      }
    >
      <ComparisonContent />
    </Suspense>
  );
}

function ComparisonContent() {
  const c = useProductComparision();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const groupCount =
    c.viewMode === "product" ? c.productGroups.length : c.storeGroups.length;

  const filterPanelProps = {
    storeOptions: c.storeOptions,
    ramOptions: c.ramOptions,
    storageOptions: c.storageOptions,
    selectedStores: c.selectedStores,
    selectedRam: c.selectedRam,
    selectedStorage: c.selectedStorage,
    inStockOnly: c.inStockOnly,
    sortOrder: c.sortOrder,
    activeFilterCount: c.activeFilterCount,
    onToggleStore: c.toggleStore,
    onToggleRam: c.toggleRam,
    onToggleStorage: c.toggleStorage,
    onToggleInStock: c.toggleInStockOnly,
    onSortChange: c.setSortOrder,
    onClear: c.clearFilters,
  };

  return (
    <div
      className={`${jakarta.variable} ${plexMono.variable} min-h-screen bg-canvas font-sans text-ink`}
    >
      <ComparisonHeader
        query={c.query}
        onSubmit={c.submitSearch}
        onOpenFilters={() => setFiltersOpen(true)}
        activeFilterCount={c.activeFilterCount}
      />

      <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
        <ResultsHeading
          query={c.query}
          loading={c.loading}
          error={c.error}
          listingCount={c.filteredProducts.length}
          groupCount={groupCount}
          storeCount={c.storeOptions.length}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <FilterPanel {...filterPanelProps} />
          </aside>

          <section className="min-w-0">
            <ResultsSection
              query={c.query}
              loading={c.loading}
              error={c.error}
              onRetry={c.retry}
              filteredProducts={c.filteredProducts}
              sortedProducts={c.sortedProducts}
              storeGroups={c.storeGroups}
              viewMode={c.viewMode}
              onViewModeChange={c.setViewMode}
              displayMode={c.displayMode}
              onDisplayModeChange={c.setDisplayMode}
              activeFilterCount={c.activeFilterCount}
              onClearFilters={c.clearFilters}
            />
          </section>
        </div>
      </main>

      <MobileFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={c.filteredProducts.length}
        {...filterPanelProps}
      />
    </div>
  );
}

// "use client";

// import { Suspense, useState } from "react";
// import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
// import { Loader2 } from "lucide-react";

// import { useProductComparision } from "@/hooks/useProductComparision";
// import { ComparisonHeader } from "@/components/comparison/ComparisonHeader";
// import { ResultsHeading } from "@/components/comparison/ResultsHeading";
// import { ResultsSection } from "@/components/comparison/ResultsSection";
// import { MobileFilterDrawer } from "@/components/comparison/MobileFilterDrawer";
// import { FilterPanel } from "@/components/filters/FilterPanel";

// const jakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-jakarta",
// });

// const plexMono = IBM_Plex_Mono({
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
//   variable: "--font-plex-mono",
// });

// export default function ComparisonPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex min-h-[60vh] items-center justify-center bg-canvas">
//           <Loader2 className="animate-spin text-primary" size={28} />
//         </div>
//       }
//     >
//       <ComparisonContent />
//     </Suspense>
//   );
// }

// function ComparisonContent() {
//   const c = useProductComparision();
//   const [filtersOpen, setFiltersOpen] = useState(false);

//   const groupCount =
//     c.viewMode === "product" ? c.productGroups.length : c.storeGroups.length;

//   const filterPanelProps = {
//     storeOptions: c.storeOptions,
//     ramOptions: c.ramOptions,
//     storageOptions: c.storageOptions,
//     selectedStores: c.selectedStores,
//     selectedRam: c.selectedRam,
//     selectedStorage: c.selectedStorage,
//     inStockOnly: c.inStockOnly,
//     sortOrder: c.sortOrder,
//     activeFilterCount: c.activeFilterCount,
//     onToggleStore: c.toggleStore,
//     onToggleRam: c.toggleRam,
//     onToggleStorage: c.toggleStorage,
//     onToggleInStock: c.toggleInStockOnly,
//     onSortChange: c.setSortOrder,
//     onClear: c.clearFilters,
//   };

//   return (
//     <div
//       className={`${jakarta.variable} ${plexMono.variable} min-h-screen bg-canvas font-sans text-ink`}
//     >
//       <ComparisonHeader
//         inputValue={c.inputValue}
//         onInputChange={c.setInputValue}
//         onSubmit={c.submitSearch}
//         onOpenFilters={() => setFiltersOpen(true)}
//         activeFilterCount={c.activeFilterCount}
//       />

//       <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
//         <ResultsHeading
//           query={c.query}
//           loading={c.loading}
//           error={c.error}
//           listingCount={c.filteredProducts.length}
//           groupCount={groupCount}
//           storeCount={c.storeOptions.length}
//         />

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
//           <aside className="hidden lg:block">
//             <FilterPanel {...filterPanelProps} />
//           </aside>

//           <section className="min-w-0">
//             <ResultsSection
//               query={c.query}
//               loading={c.loading}
//               error={c.error}
//               onRetry={c.retry}
//               filteredProducts={c.filteredProducts}
//               sortedProducts={c.sortedProducts}
//               storeGroups={c.storeGroups}
//               viewMode={c.viewMode}
//               onViewModeChange={c.setViewMode}
//               displayMode={c.displayMode}
//               onDisplayModeChange={c.setDisplayMode}
//               activeFilterCount={c.activeFilterCount}
//               onClearFilters={c.clearFilters}
//             />
//           </section>
//         </div>
//       </main>

//       <MobileFilterDrawer
//         open={filtersOpen}
//         onClose={() => setFiltersOpen(false)}
//         resultCount={c.filteredProducts.length}
//         {...filterPanelProps}
//       />
//     </div>
//   );
// }
