import React from 'react';
import { type SearchResult } from '@/types';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onResultClick,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {results.map((result, index) => (
        <SearchResultItem
          key={result.item.id}
          result={result}
          onClick={() => onResultClick(result)}
          index={index}
        />
      ))}
    </div>
  );
};

export default SearchResults;
