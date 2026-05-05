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

export function useSearchIndex(): SearchIndexState {
  const [state, setState] = useState<SearchIndexState>({
    index: null,
    error: "",
    isLoading: true
  });

  useEffect(() => {
    let isMounted = true;

    async function loadIndex() {
      try {
        const response = await fetch(withBasePath("/search-index.json"));

        if (!response.ok) {
          throw new Error(`Search index request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as SearchIndexPayload;

        if (!isMounted) {
          return;
        }

        setState({
          index: prepareSearchIndex(payload),
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

    void loadIndex();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
