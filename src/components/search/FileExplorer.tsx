import React, { useState, useCallback } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileJson,
  FileText,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { type FileItem } from '@/types';
import { cn } from '@/lib/utils';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  selectedFileId?: string;
}

interface FileTreeItemProps {
  item: FileItem;
  depth: number;
  onFileSelect: (file: FileItem) => void;
  selectedFileId?: string;
  expandedFolders: Set<string>;
  toggleFolder: (id: string) => void;
}

const getFileIcon = (fileName: string, isOpen = false) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (fileName.endsWith('/') || !extension) {
    return isOpen ? (
      <FolderOpen className="h-4 w-4 text-primary" />
    ) : (
      <Folder className="h-4 w-4 text-primary" />
    );
  }

  switch (extension) {
    case 'tsx':
    case 'ts':
      return <FileCode className="h-4 w-4 text-blue-400" />;
    case 'jsx':
    case 'js':
      return <FileCode className="h-4 w-4 text-yellow-400" />;
    case 'json':
      return <FileJson className="h-4 w-4 text-yellow-500" />;
    case 'md':
      return <FileText className="h-4 w-4 text-muted-foreground" />;
    case 'css':
      return <FileCode className="h-4 w-4 text-pink-400" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

const FileTreeItem: React.FC<FileTreeItemProps> = ({
  item,
  depth,
  onFileSelect,
  selectedFileId,
  expandedFolders,
  toggleFolder,
}) => {
  const isFolder = item.type === 'folder';
  const isExpanded = expandedFolders.has(item.id);
  const isSelected = selectedFileId === item.id;

  const handleClick = () => {
    if (isFolder) {
      toggleFolder(item.id);
    } else {
      onFileSelect(item);
    }
  };

  return (
    <div className="animate-fade-in">
      <div
        className={cn(
          'flex items-center gap-1 px-2 py-1.5 rounded cursor-pointer transition-colors duration-150',
          'hover:bg-explorer-hover',
          isSelected && 'bg-primary/20 text-primary'
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleClick}
      >
        {isFolder && (
          <span className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </span>
        )}
        {!isFolder && <span className="w-3.5" />}
        {getFileIcon(item.name, isExpanded)}
        <span className="text-sm truncate ">{item.name}</span>
      </div>

      {isFolder && isExpanded && item.children && (
        <div className="overflow-hidden">
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              selectedFileId={selectedFileId}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
  selectedFileId,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['src', 'components', 'hooks'])
  );

  const toggleFolder = useCallback((id: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <div className="h-full overflow-y-auto scrollbar-thin bg-explorer-bg">
      <div className="p-3 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Explorer
        </h2>
      </div>
      <div className="py-2">
        {files.map((item) => (
          <FileTreeItem
            key={item.id}
            item={item}
            depth={0}
            onFileSelect={onFileSelect}
            selectedFileId={selectedFileId}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
