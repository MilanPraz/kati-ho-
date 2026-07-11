"use client";

import { Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import {
  Search,
  SlidersHorizontal,
  X,
  ExternalLink,
  Loader2,
  PackageSearch,
  PackageX,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Camera,
  Package,
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { notchStyle } from "@/lib/notch";
import { fetchProducts } from "@/lib/api";
import { groupByModel, type ProductGroup } from "@/lib/groupProducts";
import type { Product } from "../../types/product.type";
import Image from "next/image";

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

const CATEGORY_ICONS: Record<string, typeof Smartphone> = {
  Mobiles: Smartphone,
  Laptops: Laptop,
  Tablets: Tablet,
  Smartwatches: Watch,
  Accessories: Headphones,
  Cameras: Camera,
};

function formatPrice(price: number) {
  return `Rs ${price.toLocaleString("en-IN")}`;
}

function ProductPlaceholder({
  category,
  className = "h-14 w-14",
}: {
  category: string;
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[category] ?? Package;
  return (
    <div
      className={`flex flex-shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary ${className}`}
    >
      <Icon size={22} />
    </div>
  );
}

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter state
  const [selectedStores, setSelectedStores] = useState<Set<string>>(new Set());
  const [selectedRam, setSelectedRam] = useState<Set<string>>(new Set());
  const [selectedStorage, setSelectedStorage] = useState<Set<string>>(
    new Set(),
  );
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    setInputValue(query);
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProducts(query)
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          // Reset filters for the new search
          setSelectedStores(new Set());
          setSelectedRam(new Set());
          setSelectedStorage(new Set());
          setInStockOnly(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while fetching prices.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  const handleSearchSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    router.push(`/comparison?q=${encodeURIComponent(trimmed)}`);
  };

  // Build filter option lists from the unfiltered result set
  const storeOptions = useMemo(
    () => Array.from(new Set(products.map((p) => p.store))).sort(),
    [products],
  );
  const ramOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products.map((p) => p.ram).filter((v): v is string => Boolean(v)),
        ),
      ).sort(),
    [products],
  );
  const storageOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products.map((p) => p.storage).filter((v): v is string => Boolean(v)),
        ),
      ).sort(),
    [products],
  );

  const toggleSetValue = (
    set: Set<string>,
    value: string,
    setter: (s: Set<string>) => void,
  ) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedStores.size > 0 && !selectedStores.has(p.store)) return false;
      if (selectedRam.size > 0 && (!p.ram || !selectedRam.has(p.ram)))
        return false;
      if (
        selectedStorage.size > 0 &&
        (!p.storage || !selectedStorage.has(p.storage))
      )
        return false;
      if (inStockOnly && !p.in_stock) return false;
      return true;
    });
  }, [products, selectedStores, selectedRam, selectedStorage, inStockOnly]);

  const groups = useMemo(() => {
    const grouped = groupByModel(filteredProducts).map((group) => ({
      ...group,
      items: [...group.items].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price,
      ),
    }));

    return grouped.sort((a, b) => {
      const aMin = Math.min(...a.items.map((i) => i.price));
      const bMin = Math.min(...b.items.map((i) => i.price));
      return sortOrder === "asc" ? aMin - bMin : bMin - aMin;
    });
  }, [filteredProducts, sortOrder]);

  const activeFilterCount =
    selectedStores.size +
    selectedRam.size +
    selectedStorage.size +
    (inStockOnly ? 1 : 0);

  const clearFilters = () => {
    setSelectedStores(new Set());
    setSelectedRam(new Set());
    setSelectedStorage(new Set());
    setInStockOnly(false);
  };

  return (
    <div
      className={`${jakarta.variable} ${plexMono.variable} min-h-screen bg-canvas font-sans text-ink`}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <div className="relative h-16 w-32">
                <Image
                  src="/katiho-logoo.png"
                  alt="Kati Ho? logo"
                  fill
                  priority
                  sizes="428px"
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
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
                placeholder="Search Samsung S26, iPhone 15..."
                className="min-w-0 flex-1 border-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-light"
              />
              <button
                onClick={handleSearchSubmit}
                className="flex-shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                Search
              </button>
            </div>

            <button
              onClick={() => setFiltersOpen(true)}
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

      <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
        {/* Breadcrumb / heading */}
        <div className="mb-7 flex flex-col gap-1">
          <a
            href="/"
            className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary"
          >
            <ArrowLeft size={15} /> Back to home
          </a>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-[28px]">
            {query ? (
              <>
                Results for{" "}
                <span className="text-primary-dark">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              "Search for a product"
            )}
          </h1>
          {!loading && !error && query && (
            <p className="text-sm text-muted">
              {filteredProducts.length} listing
              {filteredProducts.length === 1 ? "" : "s"} across {groups.length}{" "}
              product{groups.length === 1 ? "" : "s"}
              {storeOptions.length > 0 && ` from ${storeOptions.length} stores`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filters sidebar — desktop */}
          <aside className="hidden lg:block">
            <FilterPanel
              storeOptions={storeOptions}
              ramOptions={ramOptions}
              storageOptions={storageOptions}
              selectedStores={selectedStores}
              selectedRam={selectedRam}
              selectedStorage={selectedStorage}
              inStockOnly={inStockOnly}
              sortOrder={sortOrder}
              activeFilterCount={activeFilterCount}
              onToggleStore={(v) =>
                toggleSetValue(selectedStores, v, setSelectedStores)
              }
              onToggleRam={(v) =>
                toggleSetValue(selectedRam, v, setSelectedRam)
              }
              onToggleStorage={(v) =>
                toggleSetValue(selectedStorage, v, setSelectedStorage)
              }
              onToggleInStock={() => setInStockOnly((v) => !v)}
              onSortChange={setSortOrder}
              onClear={clearFilters}
            />
          </aside>

          {/* Results */}
          <section className="min-w-0">
            {!query && (
              <EmptyState
                icon={PackageSearch}
                title="Nothing searched yet"
                description="Use the search bar above to compare prices for a mobile, laptop, or gadget across Nepali stores."
              />
            )}

            {query && loading && (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface py-24 text-center">
                <Loader2 className="animate-spin text-primary" size={28} />
                <p className="text-sm font-semibold text-muted">
                  Fetching the latest prices…
                </p>
              </div>
            )}

            {query && !loading && error && (
              <EmptyState
                icon={PackageX}
                title="Couldn't load prices"
                description={error}
                action={
                  <button
                    onClick={() => {
                      // Re-trigger the effect by re-pushing the same query
                      router.replace(
                        `/comparison?q=${encodeURIComponent(query)}`,
                      );
                    }}
                    className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
                  >
                    Try again
                  </button>
                }
              />
            )}

            {query && !loading && !error && groups.length === 0 && (
              <EmptyState
                icon={PackageX}
                title="No matching listings"
                description="Try a different search term, or clear your filters to see more results."
                action={
                  activeFilterCount > 0 ? (
                    <button
                      onClick={clearFilters}
                      className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
                    >
                      Clear filters
                    </button>
                  ) : undefined
                }
              />
            )}

            {query && !loading && !error && groups.length > 0 && (
              <div className="flex flex-col gap-7">
                {groups.map((group) => (
                  <ProductGroupCard key={group.key} group={group} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-[340px] flex-col overflow-y-auto bg-canvas p-5 shadow-soft-lg">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-extrabold">Filters</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
              >
                <X size={18} />
              </button>
            </div>
            <FilterPanel
              storeOptions={storeOptions}
              ramOptions={ramOptions}
              storageOptions={storageOptions}
              selectedStores={selectedStores}
              selectedRam={selectedRam}
              selectedStorage={selectedStorage}
              inStockOnly={inStockOnly}
              sortOrder={sortOrder}
              activeFilterCount={activeFilterCount}
              onToggleStore={(v) =>
                toggleSetValue(selectedStores, v, setSelectedStores)
              }
              onToggleRam={(v) =>
                toggleSetValue(selectedRam, v, setSelectedRam)
              }
              onToggleStorage={(v) =>
                toggleSetValue(selectedStorage, v, setSelectedStorage)
              }
              onToggleInStock={() => setInStockOnly((v) => !v)}
              onSortChange={setSortOrder}
              onClear={clearFilters}
            />
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-bold text-white"
            >
              Show {filteredProducts.length} result
              {filteredProducts.length === 1 ? "" : "s"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({
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
}: {
  storeOptions: string[];
  ramOptions: string[];
  storageOptions: string[];
  selectedStores: Set<string>;
  selectedRam: Set<string>;
  selectedStorage: Set<string>;
  inStockOnly: boolean;
  sortOrder: "asc" | "desc";
  activeFilterCount: number;
  onToggleStore: (v: string) => void;
  onToggleRam: (v: string) => void;
  onToggleStorage: (v: string) => void;
  onToggleInStock: () => void;
  onSortChange: (v: "asc" | "desc") => void;
  onClear: () => void;
}) {
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

      {/* Sort */}
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

      {/* Availability */}
      <FilterSection title="Availability">
        <CheckboxRow
          label="In stock only"
          checked={inStockOnly}
          onClick={onToggleInStock}
        />
      </FilterSection>

      {/* Stores */}
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

      {/* RAM */}
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

      {/* Storage */}
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

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-line pt-5 first:border-t-0 first:pt-0">
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-light">
        {title}
      </h4>
      {children}
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 text-left text-sm font-semibold text-ink"
    >
      <span
        className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
          checked
            ? "border-primary bg-primary text-white"
            : "border-line bg-surface"
        }`}
      >
        {checked && <CheckCircle2 size={13} strokeWidth={3} />}
      </span>
      {label}
    </button>
  );
}

function RadioRow({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 text-left text-sm font-semibold text-ink"
    >
      <span
        className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
          checked ? "border-primary" : "border-line"
        }`}
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>
      {label}
    </button>
  );
}

function PillToggle({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
        checked
          ? "border-primary bg-primary-light text-primary-dark"
          : "border-line bg-surface text-muted"
      }`}
    >
      {label}
    </button>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof PackageSearch;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-6 py-20 text-center">
      <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
        <Icon size={26} />
      </div>
      <h3 className="text-lg font-extrabold">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        {description}
      </p>
      {action}
    </div>
  );
}

function ProductGroupCard({ group }: { group: ProductGroup }) {
  const lowestPrice = Math.min(...group.items.map((i) => i.price));

  return (
    <div className="relative rounded-t-2xl border border-b-0 border-line bg-surface p-5 pb-6 shadow-soft-sm sm:p-6">
      {/* Group header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <ProductPlaceholder category={group.category} />
          <div>
            <span className="mb-1 inline-block rounded-full bg-primary-light px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
              {group.brand}
            </span>
            <h3 className="text-lg font-extrabold leading-snug sm:text-xl">
              {group.title}
            </h3>
          </div>
        </div>
        <div className="hidden flex-shrink-0 text-right sm:block">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-light">
            Best price
          </span>
          <span className="font-mono text-lg font-bold text-primary-dark">
            {formatPrice(lowestPrice)}
          </span>
        </div>
      </div>

      {/* Store rows */}
      <div className="flex flex-col gap-2.5">
        {group.items.map((item) => {
          const isBest = item.price === lowestPrice;
          const specText = item.variant
            ? item.variant
            : item.ram || item.storage
              ? [item.ram, item.storage].filter(Boolean).join(" / ")
              : "Standard";

          return (
            <div
              key={item.id}
              className={`flex flex-col gap-3 rounded-xl border p-3.5 sm:flex-row sm:items-center sm:gap-4 ${
                isBest
                  ? "border-primary bg-primary-light"
                  : "border-line bg-canvas"
              }`}
            >
              <div className="flex flex-1 items-center gap-3">
                <ProductPlaceholder
                  category={group.category}
                  className="h-11 w-11"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold">{item.store}</span>
                    {isBest && (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#3A2600]">
                        Best deal
                      </span>
                    )}
                    <span className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-bold uppercase text-muted-light">
                      {item.price_type === "starting"
                        ? "Starting price"
                        : "Exact price"}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                    <span>{specText}</span>
                    <span className="text-line">•</span>
                    {item.in_stock ? (
                      <span className="flex items-center gap-1 font-semibold text-primary-dark">
                        <CheckCircle2 size={12} /> In stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-semibold text-muted-light">
                        <XCircle size={12} /> Out of stock
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span
                  className={`font-mono text-lg font-bold ${
                    isBest ? "text-primary-dark" : "text-ink"
                  }`}
                >
                  {formatPrice(item.price)}
                </span>
                <a
                  href={item.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                    isBest
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-ink/5 text-ink hover:bg-ink/10"
                  }`}
                >
                  View Deal <ExternalLink size={13} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Receipt jagged edge */}
      <div
        className="absolute -bottom-[12px] left-0 right-0 h-[13px] [filter:drop-shadow(0_4px_4px_rgba(18,33,29,0.05))]"
        style={notchStyle("%23FFFFFF", 14, 13)}
      />
    </div>
  );
}
