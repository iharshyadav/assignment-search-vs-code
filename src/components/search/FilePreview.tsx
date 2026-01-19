import React, { useEffect, useCallback } from 'react';
import { X, FileCode, Copy, Check } from 'lucide-react';
import { type FileItem } from '@/types';
// import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FilePreviewProps {
  file: FileItem;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopy = useCallback(async () => {
    if (file.content) {
      await navigator.clipboard.writeText(file.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [file.content]);

  const lines = file.content?.split('\n') || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl max-h-[85vh] bg-card border border-border rounded-lg shadow-2xl overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
          <div className="flex items-center gap-3">
            <FileCode className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium text-foreground">{file.name}</h3>
              <p className="text-xs text-muted-foreground">{file.path}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-3"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1.5 text-success" />
                  <span className="text-success">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" />
                  <span>Copy</span>
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-auto max-h-[calc(85vh-60px)] scrollbar-thin">
          <div className="p-4">
            <div className="code-block">
              <table className="w-full border-collapse">
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="w-12 text-right pr-4 text-muted-foreground/50 select-none align-top text-sm">
                        {index + 1}
                      </td>
                      <td className="text-sm whitespace-pre font-mono">
                        {line || ' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end px-4 py-2 border-t border-border bg-card/50">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Press</span>
            <kbd className="kbd">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
