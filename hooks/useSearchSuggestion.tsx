"use client";

import { useEffect, useRef, useState } from "react";
import { fetchSuggestions } from "@/lib/api";
import { useDebouncedValue } from "./useDebouncedValue";
import type { Suggestion } from "./suggestionType";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 250;

export function useSearchSuggestions(query: string, enabled: boolean) {
  const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    // Cancel whatever the previous keystroke kicked off — its result
    // would be stale by the time it resolves.
    abortRef.current?.abort();

    if (!enabled || trimmed.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

    fetchSuggestions(trimmed, 8)
      .then((data) => {
        if (!controller.signal.aborted) setSuggestions(data);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (!controller.signal.aborted) setSuggestions([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery, enabled]);

  return { suggestions, loading };
}
