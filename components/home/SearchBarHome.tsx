"use client";

import { fetchSuggestions } from "@/lib/api";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Suggestion = {
  label: string;
  value: string;
  image_url: string | null;
  product_url: string;
  price: number | null;
  price_text: string | null;
  store: string;
};

type SearchBarHomeProps = {
  className?: string;

  // Controlled input value from parent
  value?: string;

  // Called whenever input value changes
  onValueChange?: (value: string) => void;

  // Called when user submits a search
  onSearch?: (value: string) => void;

  placeholder?: string;
  size?: "large" | "small";
};

export default function SearchBarHome({
  className = "",
  value,
  onValueChange,
  onSearch,
  placeholder = "Search Samsung S25, iPhone 15, Redmi 13...",
  size = "large",
}: SearchBarHomeProps) {
  const router = useRouter();

  const isControlled = value !== undefined;
  const isSmall = size === "small";

  const [internalQuery, setInternalQuery] = useState(value ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const hasUserInteractedRef = useRef(false);
  const ignoreSuggestionsRef = useRef(false);

  /*
   * When value is provided, use the parent's value.
   * Otherwise, use the component's internal value.
   */
  const query = isControlled ? value : internalQuery;

  /*
   * Keep the internal value synchronized when the parent value changes.
   * This is useful if the component later changes between usages.
   */
  useEffect(() => {
    if (value !== undefined) {
      setInternalQuery(value);
    }
  }, [value]);

  const updateQuery = (nextValue: string) => {
    /*
     * Update internal state for standalone usage.
     */
    if (!isControlled) {
      setInternalQuery(nextValue);
    }

    /*
     * Inform the parent when onValueChange is provided.
     */
    onValueChange?.(nextValue);
  };

  const closeSuggestions = () => {
    setShowSuggestions(false);
    setSuggestions([]);
    setIsLoading(false);

    /*
     * Invalidate the current API request.
     */
    requestIdRef.current += 1;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  };

  const performSearch = (searchValue: string) => {
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      return;
    }

    /*
     * Prevent an older suggestions response from reopening the dropdown.
     */
    ignoreSuggestionsRef.current = true;
    hasUserInteractedRef.current = false;

    closeSuggestions();

    /*
     * Parent-controlled search.
     */
    if (onSearch) {
      onSearch(trimmedValue);
      return;
    }

    /*
     * Standalone search.
     */
    router.push(`/comparison?q=${encodeURIComponent(trimmedValue)}`);
  };

  const handleSubmit = () => {
    performSearch(query);
  };

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    /*
     * Use the exact suggestion value returned by the API.
     *
     * If your API's `label` contains the complete product name instead,
     * change this to:
     *
     * const exactSearchValue = suggestion.label.trim();
     */
    const exactSearchValue = suggestion.value.trim();

    if (!exactSearchValue) {
      return;
    }

    ignoreSuggestionsRef.current = true;
    hasUserInteractedRef.current = false;

    closeSuggestions();

    /*
     * Update both the input and parent state.
     */
    updateQuery(exactSearchValue);

    /*
     * Pass the exact value directly.
     * Do not call performSearch(query), because controlled parent state
     * may not have updated yet.
     */
    performSearch(exactSearchValue);
  };

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    /*
     * Do not request suggestions immediately after a search or selection.
     */
    if (ignoreSuggestionsRef.current) {
      setIsLoading(false);
      return;
    }

    const currentRequestId = ++requestIdRef.current;

    debounceRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);

        const response = await fetchSuggestions(trimmedQuery, 5);

        const isOldRequest = currentRequestId !== requestIdRef.current;

        if (isOldRequest || ignoreSuggestionsRef.current) {
          return;
        }

        const nextSuggestions = response ?? [];

        setSuggestions(nextSuggestions);

        if (hasUserInteractedRef.current) {
          setShowSuggestions(true);
        }
      } catch (error) {
        const isOldRequest = currentRequestId !== requestIdRef.current;

        if (!isOldRequest && !ignoreSuggestionsRef.current) {
          console.error("Suggestion error:", error);
          setSuggestions([]);
          setShowSuggestions(true);
        }
      } finally {
        const isLatestRequest = currentRequestId === requestIdRef.current;

        if (isLatestRequest) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [query]);

  return (
    <div className={`relative z-[9999] ${className}`}>
      <div
        id="search"
        className={`flex w-full items-center gap-2 rounded-full border border-line bg-surface shadow-soft-sm ${
          isSmall ? "py-1.5 pl-4 pr-1.5" : "p-1.5 pl-5 shadow-soft-md"
        }`}
      >
        <Search
          size={isSmall ? 18 : 20}
          className="hidden flex-shrink-0 text-muted-light sm:block"
        />

        <input
          type="text"
          value={query}
          onChange={(event) => {
            const nextValue = event.target.value;

            /*
             * The user typed again, so suggestions may open again.
             */
            ignoreSuggestionsRef.current = false;
            hasUserInteractedRef.current = true;

            updateQuery(nextValue);
          }}
          onFocus={() => {
            if (hasUserInteractedRef.current && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSubmit();
            }

            if (event.key === "Escape") {
              ignoreSuggestionsRef.current = true;
              closeSuggestions();
            }
          }}
          placeholder={placeholder}
          className={`min-w-0 flex-1 border-none bg-transparent px-1 outline-none placeholder:text-muted-light ${
            isSmall ? "py-2 text-sm" : "py-3 text-[15px]"
          }`}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className={`flex-shrink-0 rounded-full bg-primary text-sm font-bold text-white transition-colors hover:bg-primary-dark ${
            isSmall
              ? "px-5 py-2"
              : "px-6 py-3 shadow-[0_6px_18px_rgba(15,110,93,0.28)] hover:-translate-y-0.5"
          }`}
        >
          Search
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full z-[9999] mt-2 max-h-[360px] overflow-y-auto rounded-2xl border border-line bg-white shadow-xl">
          {isLoading && (
            <div className="px-4 py-3 text-sm text-muted-light">
              Searching...
            </div>
          )}

          {!isLoading && suggestions.length === 0 && (
            <div className="px-4 py-3 text-sm text-muted-light">
              No suggestions found
            </div>
          )}

          {!isLoading &&
            suggestions.map((suggestion) => (
              <button
                key={`${suggestion.store}-${suggestion.product_url}-${suggestion.value}`}
                type="button"
                onMouseDown={(event) => {
                  /*
                   * Prevent the input from losing focus before selection.
                   */
                  event.preventDefault();
                }}
                onClick={() => handleSuggestionSelect(suggestion)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50"
              >
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {suggestion.image_url ? (
                    <img
                      src={suggestion.image_url}
                      alt={suggestion.label}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Search size={18} className="text-muted-light" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold text-webblack">
                    {suggestion.label}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-light">
                    <span>{suggestion.store}</span>

                    {suggestion.price_text && (
                      <>
                        <span>•</span>

                        <span className="font-medium text-primary">
                          {suggestion.price_text}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
