import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import { SearchBar } from "@/components/home/SearchBar";

export function ComparisonHeader({
  query,
  onSubmit,
  onOpenFilters,
  activeFilterCount,
}: {
  query: string;
  onSubmit: (query: string) => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <a href="/" className="flex flex-shrink-0 items-center gap-2">
            <div className="relative h-16 w-32">
              <Image
                src="/katiho-logoo.png"
                alt="Kati Ho? logo"
                fill
                priority
                sizes="128px"
                className="object-contain"
              />
            </div>
          </a>

          <SearchBar
            initialValue={query}
            onSubmit={onSubmit}
            variant="compact"
            className="min-w-0 flex-1"
          />

          <button
            onClick={onOpenFilters}
            className="relative flex flex-shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink shadow-soft-sm lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-[#3A2600]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
