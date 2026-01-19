import React from 'react';
import { FileSearch, Zap } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-query' | 'no-results';
  query?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, query }) => {
  if (type === 'no-query') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="relative p-6 bg-card border border-border rounded-full">
            <Zap className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Lightning Fast Code Search
        </h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Search through file names and code content instantly. 
          Results update as you type with sub-100ms performance.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
            <kbd className="kbd">⌘</kbd>
            <kbd className="kbd">K</kbd>
            <span className="text-muted-foreground">Focus search</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
            <kbd className="kbd">ESC</kbd>
            <span className="text-muted-foreground">Close preview</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-5 bg-card border border-border rounded-full mb-6">
        <FileSearch className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        No results found
      </h3>
      <p className="text-muted-foreground max-w-md">
        No files match "<span className="text-foreground font-medium">{query}</span>".
        Try a different search term or check for typos.
      </p>
    </div>
  );
};

export default EmptyState;
