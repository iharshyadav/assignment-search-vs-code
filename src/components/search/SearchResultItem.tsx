import React from 'react';
import { FileCode, FileJson, FileText } from 'lucide-react';
import { type SearchResult } from '@/types';
import { cn } from '@/lib/utils';

interface SearchResultItemProps {
  result: SearchResult;
  onClick: () => void;
  index: number;
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'tsx':
    case 'ts':
      return <FileCode className="h-4 w-4 text-blue-400 flex-shrink-0" />;
    case 'jsx':
    case 'js':
      return <FileCode className="h-4 w-4 text-yellow-400 flex-shrink-0" />;
    case 'json':
      return <FileJson className="h-4 w-4 text-yellow-500 flex-shrink-0" />;
    case 'md':
      return <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />;
    case 'css':
      return <FileCode className="h-4 w-4 text-pink-400 flex-shrink-0" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />;
  }
};

const getCodeSnippet = (content: string | undefined, matches?: SearchResult['matches']) => {
  if (!content) return null;

  // Finding the best match in content
  const contentMatch = matches?.find((m) => m.key === 'content');
  
  if (contentMatch && contentMatch.indices.length > 0) {
    const lines = content.split('\n');
    const firstMatchIndex = contentMatch.indices[0][0];
    
    // Finding which line contains the match
    let charCount = 0;
    let matchLineIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      charCount += lines[i].length + 1;
      if (charCount > firstMatchIndex) {
        matchLineIndex = i;
        break;
      }
    }
    
    // Getting surrounding lines
    const startLine = Math.max(0, matchLineIndex - 1);
    const endLine = Math.min(lines.length, matchLineIndex + 3);
    
    return lines.slice(startLine, endLine).map((line, i) => ({
      lineNumber: startLine + i + 1,
      content: line,
      isMatch: i === matchLineIndex - startLine,
    }));
  }

  // Fallback: show first few lines
  const lines = content.split('\n').slice(0, 4);
  return lines.map((line, i) => ({
    lineNumber: i + 1,
    content: line,
    isMatch: false,
  }));
};

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  result,
  onClick,
  index,
}) => {
  const { item, score } = result;
  const relevancePercent = Math.round((1 - score) * 100);
  const snippet = getCodeSnippet(item.content, result.matches);

  return (
    <div
      onClick={onClick}
      className="search-result-item animate-fade-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {getFileIcon(item.name)}
          <span className="font-medium text-foreground truncate">{item.name}</span>
          <span className="text-xs text-muted-foreground truncate hidden sm:block">
            {item.path}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={cn(
              'text-xs px-1.5 py-0.5 rounded font-mono',
              relevancePercent >= 80
                ? 'bg-success/20 text-success'
                : relevancePercent >= 50
                ? 'bg-warning/20 text-warning'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {relevancePercent}%
          </span>
        </div>
      </div>

      {snippet && (
        <div className="code-block text-xs overflow-hidden">
          {snippet.map((line) => (
            <div
              key={line.lineNumber}
              className={cn(
                'flex',
                line.isMatch && 'bg-primary/10 -mx-3 px-3'
              )}
            >
              <span className="w-8 text-muted-foreground/50 flex-shrink-0 select-none">
                {line.lineNumber}
              </span>
              <span className={cn(
                'truncate',
                line.isMatch && 'text-primary'
              )}>
                {line.content || ' '}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultItem;
