import { useState } from 'react';
import { Zap } from 'lucide-react';
import { FileExplorer } from '@/components/search/FileExplorer';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { EmptyState } from '@/components/search/EmptyState';
import { FilePreview } from '@/components/search/FilePreview';
import { useCodeSearch } from '@/hooks/useCodeSearch';
import { sampleFiles, flatFiles } from '@/data/sampleFiles';
import type { FileItem, SearchResult } from '@/types';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

  const { query, setQuery, results, metrics, isSearching, clearSearch } =
    useCodeSearch({
      files: flatFiles,
      maxResults: 50,
    });

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    if (file.type === 'file') {
      setPreviewFile(file);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setPreviewFile(result.item);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary rounded-md">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-semibold text-foreground glow-text">
              Lightning Code Search
            </h1>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-border flex-shrink-0 hidden md:block">
          <FileExplorer
            files={sampleFiles}
            onFileSelect={handleFileSelect}
            selectedFileId={selectedFile?.id}
          />
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-card/30">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onClear={clearSearch}
              metrics={metrics}
              isSearching={isSearching}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            {!query ? (
              <EmptyState type="no-query" />
            ) : results.length === 0 ? (
              <EmptyState type="no-results" query={query} />
            ) : (
              <SearchResults results={results} onResultClick={handleResultClick} />
            )}
          </div>
        </main>
      </div>

      {previewFile && (
        <FilePreview file={previewFile} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export default Index;
