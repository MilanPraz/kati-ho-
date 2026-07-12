import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";

export function ComparisonHeader({
  inputValue,
  onInputChange,
  onSubmit,
  onOpenFilters,
  activeFilterCount,
}: {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
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

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-4 pr-1.5 shadow-soft-sm">
            <Search
              size={18}
              className="hidden flex-shrink-0 text-muted-light sm:block"
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSubmit();
              }}
              placeholder="Search Samsung S26, iPhone 15..."
              className="min-w-0 flex-1 border-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-light"
            />
            <button
              onClick={onSubmit}
              className="flex-shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Search
            </button>
          </div>

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
