"use client";

import { useEffect, useState } from "react";

import { prepareSearchIndex } from "@/lib/search";
import type { SearchIndexPayload } from "@/lib/search-types";
import { withBasePath } from "@/lib/utils";

interface SearchIndexState {
  index: ReturnType<typeof prepareSearchIndex> | null;
  error: string;
  isLoading: boolean;
}

const SEARCH_INDEX_ERROR = "Не удалось загрузить поисковый индекс. Проверь сборку `npm run search:build`.";
let cachedSearchIndex: ReturnType<typeof prepareSearchIndex> | null = null;
let searchIndexRequest: Promise<ReturnType<typeof prepareSearchIndex>> | null = null;

async function loadSearchIndex() {
  if (cachedSearchIndex) return cachedSearchIndex;
  if (!searchIndexRequest) {
    searchIndexRequest = fetch(withBasePath("/search-index.json"))
      .then((response) => {
        if (!response.ok) throw new Error(`Search index request failed with status ${response.status}`);
        return response.json() as Promise<SearchIndexPayload>;
      })
      .then((payload) => {
        cachedSearchIndex = prepareSearchIndex(payload);
        return cachedSearchIndex;
      })
      .finally(() => {
        searchIndexRequest = null;
      });
  }
  return searchIndexRequest;
}

export function useSearchIndex(enabled = true): SearchIndexState {
  const [state, setState] = useState<SearchIndexState>({
    index: cachedSearchIndex,
    error: "",
    isLoading: !cachedSearchIndex
  });

  useEffect(() => {
    if (!enabled || state.index) {
      return;
    }

    let isMounted = true;

    async function resolveIndex() {
      try {
        const preparedIndex = await loadSearchIndex();

        if (!isMounted) {
          return;
        }

        setState({
          index: preparedIndex,
          error: "",
          isLoading: false
        });
      } catch {
        if (!isMounted) {
          return;
        }

        setState({
          index: null,
          error: SEARCH_INDEX_ERROR,
          isLoading: false
        });
      }
    }

    void resolveIndex();

    return () => {
      isMounted = false;
    };
  }, [enabled, state.index]);

  return state;
}
