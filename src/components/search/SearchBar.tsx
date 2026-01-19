import React, { useRef, useEffect } from 'react';
import { Search, X, Zap, Clock } from 'lucide-react';
import { type SearchMetrics } from '@/types';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  metrics: SearchMetrics;
  isSearching: boolean;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onClear,
  metrics,
  // isSearching,
  placeholder = 'Search files and code...',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full h-12 pl-12 pr-24 bg-card border border-border rounded-lg',
            'text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'transition-all duration-200'
          )}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query && (
            <button
              onClick={onClear}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="kbd">⌘</kbd>
            <kbd className="kbd">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
        {query && (
          <>
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-success" />
              <span>
                <span className={cn(
                  'font-mono font-medium',
                  metrics.time < 50 ? 'text-success' : metrics.time < 100 ? 'text-warning' : 'text-destructive'
                )}>
                  {metrics.time}ms
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5" />
              <span>
                {metrics.displayedResults === metrics.totalResults
                  ? `${metrics.totalResults} results`
                  : `Showing ${metrics.displayedResults} of ${metrics.totalResults}`}
              </span>
            </div>
          </>
        )}
        {!query && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>Type to search through {50}+ files</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
