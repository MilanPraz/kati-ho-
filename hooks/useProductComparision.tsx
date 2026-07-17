"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import { groupByModel } from "@/lib/GroupByProducts";
import { groupByStore } from "@/lib/GroupByStore";
import type { Product } from "@/types/product.type";

export type SortOrder = "asc" | "desc";
export type ViewMode = "product" | "store";

function toggleInSet(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function useProductComparison() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("store");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedStores, setSelectedStores] = useState<Set<string>>(new Set());
  const [selectedRam, setSelectedRam] = useState<Set<string>>(new Set());
  const [selectedStorage, setSelectedStorage] = useState<Set<string>>(
    new Set(),
  );
  const [inStockOnly, setInStockOnly] = useState(false);

  // Fetch whenever the ?q= query changes
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
        if (cancelled) return;
        setProducts(data);
        setSelectedStores(new Set());
        setSelectedRam(new Set());
        setSelectedStorage(new Set());
        setInStockOnly(false);
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

  const submitSearch = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    router.push(`/comparison?q=${encodeURIComponent(trimmed)}`);
  };

  const retry = () => {
    router.replace(`/comparison?q=${encodeURIComponent(query)}`);
  };

  // Filter option lists, derived from the unfiltered result set
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

  const productGroups = useMemo(() => {
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

  const storeGroups = useMemo(() => {
    const grouped = groupByStore(filteredProducts).map((group) => ({
      ...group,
      items: [...group.items].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price,
      ),
    }));

    return [...grouped].sort((a, b) =>
      sortOrder === "asc"
        ? a.lowestPrice - b.lowestPrice
        : b.lowestPrice - a.lowestPrice,
    );
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

  return {
    query,
    inputValue,
    setInputValue,
    submitSearch,
    retry,

    loading,
    error,
    products,

    viewMode,
    setViewMode,
    sortOrder,
    setSortOrder,

    storeOptions,
    ramOptions,
    storageOptions,
    selectedStores,
    selectedRam,
    selectedStorage,
    inStockOnly,
    toggleStore: (v: string) => setSelectedStores((s) => toggleInSet(s, v)),
    toggleRam: (v: string) => setSelectedRam((s) => toggleInSet(s, v)),
    toggleStorage: (v: string) => setSelectedStorage((s) => toggleInSet(s, v)),
    toggleInStockOnly: () => setInStockOnly((v) => !v),
    activeFilterCount,
    clearFilters,

    filteredProducts,
    productGroups,
    storeGroups,
  };
}
