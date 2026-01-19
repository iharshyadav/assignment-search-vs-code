export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileItem[];
}

export interface SearchResult {
  item: FileItem;
  score: number;
  matches?: {
    key: string;
    indices: readonly [number, number][];
    value?: string;
  }[];
}

export interface SearchMetrics {
  time: number;
  totalResults: number;
  displayedResults: number;
}
