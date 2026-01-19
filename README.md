# Search VS Code

A code search tool for your projects. Built with React, TypeScript, and Fuse.js for fast fuzzy searching across files.

## What it does

- Search through your files by name, path, or content
- See code snippets with surrounding lines for context
- Get relevance scores (0-100%) to see how well results match
- Shows search time and how many results were found
- Visual file icons to quickly identify file types

## Getting started

```bash
pnpm install
pnpm run dev
```

Build for production:
```bash
pnpm run build
```

## How it works

Type in the search bar and it searches your entire codebase in real-time. Each result shows:
- The file name and path
- A preview of the matching code
- A relevance score showing how well it matched
- Icons to show if it's TypeScript, JavaScript, JSON, etc.

The search prioritizes results by:
1. Matching file paths (highest priority)
2. Matching file names
3. Matching content inside files

## Key features

**Real-time Search** - Results appear as you type

**Smart Matching** - Fuzzy search means it finds results even with typos or partial matches

**Code Preview** - See the actual code that matched, not just the file name

**Performance** - Typically completes searches in under 50ms

## Tech used

- React for the UI
- TypeScript for type safety
- Fuse.js for the fuzzy search algorithm
- Tailwind CSS for styling
- Lucide React for icons
- Vite as the build tool

## How the search works

The search uses Fuse.js which is a fuzzy matching library. It doesn't require exact matches - so if you search for "comp" it will find "component", and if you search for "searh" it will still find "search". 

The algorithm looks through three fields with different importance levels:
- File paths (weighted 3x)
- File names (weighted 2x) 
- File content (weighted 1x)

This means if you're looking for a file, it's faster to search by path or name than by content.

---

Made for searching code faster.
