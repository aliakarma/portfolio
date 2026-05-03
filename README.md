# Ali Akarma — Academic Portfolio v2.0

> A production-quality, fully interactive academic portfolio for an AI researcher specializing in Agentic AI, AI Safety, and Trustworthy Machine Learning.

**→ Live:** [aliakarma.codes](https://www.aliakarma.codes/) *(after deployment)*

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Scholarly Noir Theme** | Deep dark background, warm gold accents, Cormorant Garamond + JetBrains Mono |
| ✨ **Particle Field** | Animated gold particle canvas background on every page |
| 🔄 **Page Transitions** | Framer Motion enter/exit transitions |
| 📜 **Scroll Reveal** | Intersection Observer-based staggered animations |
| 🧪 **Research Vision** | Highlighted section with full research statement |
| 🕸️ **Knowledge Graph** | D3.js force-directed research theme network |
| 📚 **Publication Dashboard** | 12 papers with filtering by status, type, topic |
| 📋 **BibTeX Viewer** | One-click BibTeX copy for every publication |
| 🔬 **Reproducibility Panel** | Code/Dataset/Notebook links per paper |
| 📊 **Citation Metrics** | Scholar metrics dashboard (h-index, citations, i10) |
| 🧩 **Project Cards** | Modal detail view with linked publication |
| 📈 **Animated Counters** | Stats that count up on scroll |
| 📱 **Fully Responsive** | Mobile-first, works on all screen sizes |
| 🚀 **Static Export** | Deploys to GitHub Pages or Vercel |

---

## 🗂 Repository Structure

```
portfolio/
│
├── data/                        ← All content lives here
│   ├── profile.js               ← Personal info, bio, education, awards
│   ├── publications.js          ← All 12 papers with BibTeX, abstracts
│   ├── projects.js              ← 6 research projects
│   ├── researchThemes.js        ← Knowledge graph nodes & edges
│   └── blog.js                  ← Writing / blog posts
│
├── components/
│   ├── Navbar.js                ← Floating nav with scroll behavior
│   ├── Footer.js                ← Site footer with social links
│   ├── PublicationCard.js       ← Rich card: abstract, BibTeX, reproducibility
│   ├── ProjectCard.js           ← Project card with modal
│   ├── ResearchGraph.js         ← D3.js force-directed knowledge graph
│   ├── PageTransition.js        ← Framer Motion page wrapper
│   ├── SectionReveal.js         ← Scroll-triggered reveal animation
│   └── ParticleField.js         ← Animated canvas particle background
│
├── pages/
│   ├── index.js                 ← Hero, stats, vision, graph, publications
│   ├── about.js                 ← Bio, education, experience, awards
│   ├── research.js              ← Full publication dashboard + metrics
│   ├── projects.js              ← Project grid with modal details
│   ├── skills.js                ← Radar chart + skill bars + clusters
│   ├── blog.js                  ← Writing section
│   ├── contact.js               ← Contact form + copy email
│   ├── 404.js                   ← Custom 404
│   ├── _app.js
│   └── _document.js
│
├── public/
│   ├── profile.jpg              ← Add your photo here
│   └── Ali_Akarma_CV.pdf        ← Add your CV here
│
├── styles/
│   └── globals.css              ← Scholarly Noir theme variables
│
├── next.config.js               ← Static export config
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **npm** or **yarn**

### Local Development

```bash
# 1. Clone / unzip the repository
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Visit http://localhost:3000
```

---

## 📦 Deployment

### Option A — Vercel (Recommended, Zero Config)

```bash
# Push to GitHub, then:
npx vercel

# Or connect your GitHub repo at vercel.com/new
```

Vercel auto-detects Next.js and deploys on every push. No configuration needed.

### Option B — GitHub Pages

```bash
# 1. Build and export
npm run build

# 2. Deploy to gh-pages branch
npm run deploy

# 3. In GitHub: Settings → Pages → Source: gh-pages branch
```

> **Note:** If your repository is NOT named `aliakarma.github.io` (e.g. it's `portfolio`), uncomment the `basePath` line in `next.config.js`:
> ```js
> basePath: '/portfolio',
> ```

---

## ✏️ Customization

### Update Content

All content is separated from UI in the `data/` folder:

| File | What to Edit |
|------|-------------|
| `data/profile.js` | Name, bio, email, links, research vision, scholar metrics |
| `data/publications.js` | Add/edit papers — include DOI, PDF, code links |
| `data/projects.js` | Research projects with linked papers |
| `data/researchThemes.js` | Knowledge graph nodes and edges |
| `data/blog.js` | Writing / blog posts |

### Add Profile Photo

1. Place your photo as `public/profile.jpg`
2. In `pages/about.js`, replace the letter avatar `<span>A</span>` with:
   ```jsx
   <img src="/profile.jpg" alt="Ali Akarma" className="w-48 h-48 object-cover" />
   ```

### Add CV Download

1. Place your PDF as `public/Ali_Akarma_CV.pdf`
2. CV download links in Navbar and Hero automatically point to this file

### Add Paper Links

In `data/publications.js`, populate these fields for each paper:
```js
{
  doi:      "https://doi.org/10.xxxx/xxxxx",
  pdf:      "https://arxiv.org/pdf/xxxx.xxxxx",
  code:     "https://github.com/aliakarma/paper-repo",
  notebook: "https://colab.research.google.com/...",
}
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Next.js](https://nextjs.org) | 14 | React framework + static export |
| [TailwindCSS](https://tailwindcss.com) | 3 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animations & transitions |
| [D3.js](https://d3js.org) | 7 | Research knowledge graph |
| [Lucide React](https://lucide.dev) | — | Icons |
| Google Fonts | — | Cormorant Garamond, Source Serif 4, JetBrains Mono |
| react-type-animation | 3 | Typing effect |

---

## 🎨 Design System

**Scholarly Noir** — academic elegance in dark mode:

| Token | Value | Usage |
|-------|-------|-------|
| `noir-900` | `#08080f` | Background |
| `gold-500` | `#e8a900` | Primary accent |
| `parchment-100` | `#f7f2e8` | Primary text |
| `parchment-300` | `#d9cdb5` | Secondary text |
| Cormorant Garamond | Display font | Headings, names |
| JetBrains Mono | Mono font | Labels, tags, code |
| Source Serif 4 | Body font | Paragraphs, abstracts |

---

## 📋 Pages Overview

| Page | URL | Contents |
|------|-----|----------|
| Home | `/` | Hero, animated stats, research vision, knowledge graph, recent papers |
| About | `/about` | Biography, education timeline, research experience, awards |
| Research | `/research` | Publication dashboard with filtering, BibTeX, reproducibility links |
| Projects | `/projects` | Research system cards with modal detail view |
| Skills | `/skills` | Radar chart, animated bars, skill word cloud |
| Writing | `/blog` | Research notes and articles (placeholder) |
| Contact | `/contact` | Copy-email button, social links, contact form |

---

## 📄 License

MIT — Free to use and adapt for your own academic portfolio

---