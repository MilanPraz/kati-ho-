"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Search, Loader2 } from "lucide-react";
import { useSearchSuggestions } from "../../hooks/useSearchSuggestion";
import { ProductImage } from "@/components/comparison/ProductImage";
import { formatPrice } from "@/lib/formatPrice";
import type { Suggestion } from "../../hooks/suggestionType";

const VARIANT_STYLES = {
  hero: {
    wrapper: "rounded-[28px] p-1.5 pl-5 shadow-soft-md",
    input: "py-3 text-[15px]",
    button: "px-6 py-3 text-sm",
  },
  compact: {
    wrapper: "rounded-full py-1.5 pl-4 pr-1.5 shadow-soft-sm",
    input: "py-2 text-sm",
    button: "px-5 py-2 text-sm",
  },
} as const;

export function SearchBar({
  initialValue = "",
  onSubmit,
  placeholder = "Search Samsung S26, iPhone 15, Redmi 13...",
  variant = "compact",
  className = "",
  autoFocus = false,
}: {
  initialValue?: string;
  onSubmit: (query: string) => void;
  placeholder?: string;
  variant?: "hero" | "compact";
  className?: string;
  autoFocus?: boolean;
}) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep in sync if the confirmed search changes from outside
  // (e.g. browser back/forward, or a fresh ?q= on the comparison page)
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const { suggestions, loading } = useSearchSuggestions(inputValue, open);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submit = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setOpen(false);
    onSubmit(trimmed);
  };

  const selectSuggestion = (suggestion: Suggestion) => {
    setInputValue(suggestion.label);
    setOpen(false);
    onSubmit(suggestion.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      if (e.key === "Enter") submit(inputValue);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        selectSuggestion(suggestions[highlightedIndex]);
      } else {
        submit(inputValue);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const styles = VARIANT_STYLES[variant];
  const showDropdown = open && inputValue.trim().length >= 2;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className={`flex items-center gap-2 border border-line bg-surface ${styles.wrapper}`}
      >
        <Search
          size={18}
          className="hidden flex-shrink-0 text-muted-light sm:block"
        />
        <input
          type="text"
          value={inputValue}
          autoFocus={autoFocus}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`min-w-0 flex-1 border-none bg-transparent px-1 outline-none placeholder:text-muted-light ${styles.input}`}
        />
        <button
          onClick={() => submit(inputValue)}
          className={`flex-shrink-0 rounded-full bg-primary font-bold text-white transition-colors hover:bg-primary-dark ${styles.button}`}
        >
          Search
        </button>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-96 overflow-y-auto rounded-2xl border border-line bg-surface p-2 shadow-soft-lg">
          {loading && suggestions.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-6 text-sm font-semibold text-muted">
              <Loader2 size={16} className="animate-spin" /> Searching…
            </div>
          )}

          {!loading && suggestions.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-muted">
              No matches for &ldquo;{inputValue}&rdquo;
            </div>
          )}

          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.value}-${index}`}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                highlightedIndex === index
                  ? "bg-primary-light"
                  : "hover:bg-canvas"
              }`}
            >
              <ProductImage
                imageUrl={suggestion.image_url}
                alt={suggestion.label}
                category=""
                className="h-10 w-10"
                iconSize={16}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">
                  {suggestion.label}
                </p>
                <p className="truncate text-xs text-muted">
                  {suggestion.store}
                  {suggestion.price != null && (
                    <>
                      {" "}
                      ·{" "}
                      <span className="font-mono font-semibold text-primary-dark">
                        {formatPrice(suggestion.price)}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
