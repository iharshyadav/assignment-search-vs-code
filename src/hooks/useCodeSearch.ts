import { useMemo, useState, useCallback } from 'react';
import Fuse from 'fuse.js';
import type { FileItem, SearchResult, SearchMetrics } from '@/types';
import type { FuseResult, FuseResultMatch } from 'fuse.js';

interface UseCodeSearchOptions {
  files: FileItem[];
  maxResults?: number;
}

interface UseCodeSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  metrics: SearchMetrics;
  isSearching: boolean;
  clearSearch: () => void;
}

export function useCodeSearch({
  files,
  maxResults = 50,
}: UseCodeSearchOptions): UseCodeSearchReturn {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [metrics, setMetrics] = useState<SearchMetrics>({
    time: 0,
    totalResults: 0,
    displayedResults: 0,
  });
  const [isSearching, setIsSearching] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(files, {
      keys: [
        { name: 'path', weight: 3 },
        { name: 'name', weight: 2 },
        { name: 'content', weight: 1 },
      ],
      threshold: 0.4,
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      findAllMatches: true,
      useExtendedSearch: false,
    });
  }, [files]);

  // useEffect(() => {
  //   console.log(results);
  // },[results])

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        setResults([]);
        setMetrics({ time: 0, totalResults: 0, displayedResults: 0 });
        return;
      }

      setIsSearching(true);
      const startTime = performance.now();

      // Perform the search
      const fuseResults = fuse.search(searchQuery);
      const endTime = performance.now();

      console.log(fuseResults)

      // Transform results
      const searchResults: SearchResult[] = fuseResults
        .slice(0, maxResults)
        .map((result: FuseResult<FileItem>) => ({
          item: result.item,
          score: result.score ?? 0,
          matches: result.matches?.map((match: FuseResultMatch) => ({
            key: match.key ?? '',
            indices: match.indices,
            value: match.value,
          })),
        }));

      setResults(searchResults);
      setMetrics({
        time: Math.round((endTime - startTime) * 100) / 100,
        totalResults: fuseResults.length,
        displayedResults: searchResults.length,
      });
      setIsSearching(false);
    },
    [fuse, maxResults]
  );

  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryState(newQuery);
      performSearch(newQuery);
    },
    [performSearch]
  );

  const clearSearch = useCallback(() => {
    setQueryState('');
    setResults([]);
    setMetrics({ time: 0, totalResults: 0, displayedResults: 0 });
  }, []);

  return {
    query,
    setQuery,
    results,
    metrics,
    isSearching,
    clearSearch,
  };
}

export default useCodeSearch;
