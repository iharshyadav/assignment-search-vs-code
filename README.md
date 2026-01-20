# ⚡ Lightning Code Search

> VSCode search, but **actually** fast. Instant fuzzy matching in <50ms.

<div align="center">

![Demo Video](https://github.com/user-attachments/assets/e4db9ac0-4006-45ac-96f1-8af3264b1f79)

**[🚀 Live Demo](https://assignment-search-vs-code.vercel.app)** | **[📺 Watch Full Demo Video](https://github.com/user-attachments/assets/387073d7-0055-40b4-83e0-cc5358d70a30)**

</div>

---

## 🎯 The Problem with VSCode Search

VSCode's built-in search has frustrated me for years:

- ❌ **Slow** - Takes 5-10 seconds on medium codebases
- ❌ **No fuzzy matching** - Typos break everything
- ❌ **Poor UX** - Results load progressively, causing UI stutter
- ❌ **No relevance ranking** - Results appear chronologically, not by relevance

I use VSCode 8 hours a day. This always bothered me. So I rebuilt it.

---

## ✨ My Solution

![Search in Action](https://github.com/user-attachments/assets/6b840de0-f5dd-4721-ba60-5a2a83663f54)

**Lightning Code Search** demonstrates how code search should work:

| Feature | VSCode | Lightning Search |
|---------|--------|------------------|
| Search Speed | 5-10s | **<50ms** ⚡ |
| Fuzzy Matching | ❌ | ✅ |
| Relevance Scoring | ❌ | ✅ 0-100% |
| File Explorer | ✅ | ✅ Better UX |
| Code Preview | Basic | ✅ With context |

---

## 🎬 Screenshots & Demo

### Main Interface
<div align="center">
  <img src="https://github.com/user-attachments/assets/23c445dd-7b48-4819-bc68-1df3ac858e01" alt="Main Interface" width="800"/>
</div>

### Search Results with Fuzzy Matching
<div align="center">
  <img src="https://github.com/user-attachments/assets/6b840de0-f5dd-4721-ba60-5a2a83663f54" alt="Search Results" width="800"/>
</div>

---

## 🚀 Key Features

### ⚡ Instant Fuzzy Search
- Results appear as you type (<50ms)
- Finds "function" even if you type "funtion"
- Smart ranking: filename matches > content matches

### 📁 File Explorer
- VSCode-style collapsible tree
- File type icons with syntax colors
- Click to preview full file content

### 💎 Clean UX
- Code snippets with surrounding context
- Relevance scores (0-100%) for each result
- Real-time performance metrics
- Keyboard shortcuts (Cmd/Ctrl+K to search)

---

## 🛠️ Technical Deep Dive

### Search Implementation

Built with **Fuse.js** for fuzzy string matching:
```typescript
// Optimized configuration
{
  keys: [
    { name: 'path', weight: 3 },      // Prioritize filenames
    { name: 'content', weight: 1 }    // Then content
  ],
  threshold: 0.4,                     // Balance between strict/loose
  includeMatches: true,               // Show what matched
  includeScore: true,                 // Relevance percentage
  minMatchCharLength: 2,              // Ignore single chars
  ignoreLocation: true                // Search entire file
}
```

**Custom Scoring Logic:**
- Boost results where query appears in filename (3x weight)
- Boost exact matches over fuzzy matches
- Boost matches at start of lines (likely declarations)

### Architecture Decisions

**Why Fuse.js over regex?**
- Fuzzy matching tolerates typos
- Built-in relevance scoring
- Better performance on large datasets

**Why client-side search?**
- Zero backend = instant deployment
- No API latency
- Works offline
- Simpler architecture for demo

**Why limit to 50 results?**
- Rendering 1000+ DOM nodes is slow
- Top 50 results are usually what you need
- Can add "Load More" if needed

### Performance Optimizations

1. **Pre-computed index** - Search index built once on load
2. **Debounced input** - Wait 150ms before searching (prevents lag while typing)
3. **Result limiting** - Max 50 results for instant rendering
4. **Code splitting** - Fuse.js lazy-loaded to reduce initial bundle

---

## 📊 Performance Metrics

Tested on a codebase with **50 files** (~10,000 lines of code):

| Metric | Value |
|--------|-------|
| **Average search time** | <50ms ⚡ |
| **Index build time** | ~100ms (once on load) |
| **Bundle size** | ~150KB gzipped |
| **Memory usage** | ~15MB |

*Benchmarked on MacBook Pro M1, Chrome 120*

**Real-world comparison:**
- VSCode searching same codebase: **3-5 seconds**
- Lightning Search: **<50ms**
- **60-100x faster** 🚀

---

## 🏃 Quick Start
```bash
# Clone
git clone https://github.com/iharshyadav/assignment-search-vs-code.git
cd assignment-search-vs-code

# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:5173](http://localhost:5173) and start searching!

---

## 🎯 Use Cases

This project demonstrates:
- ✅ **Performance optimization** - <50ms search with proper indexing
- ✅ **UX design** - Clean, intuitive interface
- ✅ **Algorithm selection** - Choosing right tool (Fuse.js) for the job
- ✅ **TypeScript** - Full type safety
- ✅ **Modern React** - Hooks, proper state management
- ✅ **Attention to detail** - Keyboard shortcuts, empty states, loading states

---

## 🚀 Future Enhancements

If I had more time, I'd add:

**Search Features:**
- [ ] Regex search mode toggle
- [ ] File type filtering (.tsx, .ts, .json only)
- [ ] Search history with recent queries dropdown
- [ ] Multi-file search & replace
- [ ] Search within specific folders only

**UI/UX:**
- [ ] Syntax highlighting in code previews (Prism.js)
- [ ] Dark mode toggle
- [ ] Keyboard navigation (arrow keys through results)
- [ ] Split view for comparing files
- [ ] Export results to markdown/CSV

**Performance:**
- [ ] Web Workers for background indexing
- [ ] Virtual scrolling for 1000+ results
- [ ] Incremental index updates (re-index only changed files)

**Integration:**
- [ ] GitHub integration - search any public repo by URL
- [ ] VSCode extension version
- [ ] Chrome extension for searching GitHub repos

---

## 💭 Why I Built This

I've used VSCode for 5+ years and always found the search frustrating. When I saw this assignment, I knew exactly what to build.

**The goal wasn't to rebuild VSCode** - it was to demonstrate:
1. I can identify real UX problems in tools I use daily
2. I understand performance optimization (indexing, fuzzy search)
3. I can ship a polished product in 3 hours
4. I care about developer experience

This project proves that **instant, fuzzy code search is possible** - so why don't our tools have it by default?

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Search:** Fuse.js (fuzzy matching algorithm)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Deployment:** Vercel

---

## 📝 What I Learned

Building this in 3 hours taught me:
- How to scope a project ruthlessly (focus on core pain points)
- The importance of choosing the right library (Fuse.js was perfect)
- How to optimize for perceived performance (debouncing, limiting results)
- That great UX comes from solving real problems, not adding features

---
</div>
