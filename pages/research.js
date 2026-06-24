import Head from 'next/head'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, BookOpen, ExternalLink, TrendingUp, FileText, Layers, ChevronDown, ChevronUp } from 'lucide-react'
import Meta from '../components/Meta'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import PublicationCard from '../components/PublicationCard'
import { publications } from '../data/publications'
import { profile } from '../data/profile'

const ALL_TAGS = [...new Set(publications.flatMap(p => p.tags))].sort()

const normalize = (value) => String(value ?? '').trim().toLowerCase()

const TYPE_FILTERS    = ['All', 'first_author', 'conference', 'journal', 'book_chapter']
const STATUS_FILTERS  = ['All', 'published', 'accepted', 'review']

const TYPE_LABELS = {
  All:          'All Types',
  first_author: 'First Author Papers',
  conference:   'Conference',
  journal:      'Journal',
  book_chapter: 'Book Chapter',
}

const STATUS_LABELS = {
  All:       'All',
  published: 'Published',
  accepted:  'Accepted',
  review:    'Under Review',
}

/*
  ScholarlyArticle structured data — makes each publication individually
  machine-readable for Google Scholar, academic crawlers, and rich results.
  Only published/accepted work is included to keep claims verifiable.
*/
const SCHOLARLY_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Publications by Ali Akarma',
  itemListElement: publications
    .filter(p => p.status === 'published' || p.status === 'accepted')
    .map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'ScholarlyArticle',
        headline: p.title,
        author: p.authorsStr.split(', ').map(name => ({ '@type': 'Person', name })),
        datePublished: String(p.year),
        publisher: { '@type': 'Organization', name: p.venue },
        isPartOf: { '@type': 'Periodical', name: p.venue },
        about: p.tags,
        ...(p.abstract ? { abstract: p.abstract } : {}),
        ...(p.doi ? { sameAs: p.doi, url: p.doi } : {}),
      },
    })),
}

export default function Research() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter,   setTypeFilter]   = useState('All')
  const [tagFilter,    setTagFilter]    = useState(null)
  /* Responsive Fix: tags panel collapses on mobile to reduce filter height */
  const [showTags,     setShowTags]     = useState(false)

  const filtered = useMemo(() => {
    return publications
      .filter(p => {
        const s = statusFilter === 'All' || normalize(p.status) === normalize(statusFilter)
        const t =
          typeFilter === 'All'
            ? true
            : typeFilter === 'first_author'
            ? p.title === "Governance-Constrained Agentic AI: Blockchain-Enforced Human Oversight for Safety-Critical Wildfire Monitoring" ||
              p.title === "Agents for Agents: An Interrogator-Based Secure Framework for Autonomous Internet of Underwater Things"
            : normalize(p.type) === normalize(typeFilter)
        const g = !tagFilter || p.tags.some(tag => normalize(tag) === normalize(tagFilter))
        return s && t && g
      })
      .sort((a, b) => b.year - a.year || b.id - a.id)
  }, [statusFilter, typeFilter, tagFilter])

  const counts = {
    published: publications.filter(p => p.status === 'published').length,
    accepted:  publications.filter(p => p.status === 'accepted').length,
    review:    publications.filter(p => p.status === 'review').length,
  }

  return (
    <>
      <Meta
        title="Research Archive"
        description={`Archive of ${publications.length} publications by Ali Akarma on AI safety, agentic AI governance, and autonomous systems — IEEE, Springer, PLOS ONE, and MDPI.`}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHOLARLY_JSONLD) }}
        />
      </Head>

      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6">

            {/* HEADER */}
            <SectionReveal>
              <div className="mb-14">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Publications</span>
                </div>
                <h1
                  className="font-display font-light text-parchment-100 mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  Research <span className="gold-text italic">Archive</span>
                </h1>
                <p className="font-body text-parchment-300 max-w-2xl mb-8">
                  {publications.length} publications and manuscripts spanning agentic AI architectures,
                  safety, governance, and real-world deployment. I also maintain distilled{' '}
                  <a href="/blog" className="text-gold-400 hover:underline">research notes</a> for 
                  key findings and practical implications.
                </p>
                <div className="section-divider" />
              </div>
            </SectionReveal>

            {/* STATS */}
            <SectionReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
                {[
                  { icon: <FileText  size={16} />, value: counts.published, label: 'Published',    bg: 'bg-emerald-900/20 border-emerald-600/20' },
                  { icon: <TrendingUp size={16}/>, value: counts.accepted,  label: 'Accepted',     bg: 'bg-sky-900/20 border-sky-600/20' },
                  { icon: <Layers    size={16} />, value: counts.review,    label: 'Under Review', bg: 'bg-amber-900/20 border-amber-600/20' },
                  { icon: <BookOpen  size={16} />, value: publications.length, label: 'Total',     bg: 'bg-gold-900/20 border-gold-600/20' },
                ].map(m => (
                  <div key={m.label} className={`glass-card border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 ${m.bg}`}>
                    <div className="text-gold-400 flex-shrink-0" aria-hidden="true">{m.icon}</div>
                    <div className="min-w-0">
                      <div className="font-display text-xl sm:text-2xl text-parchment-100">{m.value}</div>
                      <div className="font-mono text-xs text-parchment-400 truncate">{m.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* GOOGLE SCHOLAR */}
            <SectionReveal>
              <a
                href={profile.scholar}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View full citation metrics on Google Scholar (opens in new tab)"
                className="inline-flex items-center gap-3 mb-10 p-4 glass-card border-gold-500/20 hover:border-gold-500/40 transition-all"
              >
                <BookOpen size={15} className="text-gold-400 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs text-parchment-400">Full citation metrics</p>
                  <p className="font-mono text-xs text-gold-400 flex items-center gap-1">
                    Google Scholar Profile <ExternalLink size={10} aria-hidden="true" />
                  </p>
                </div>
              </a>
            </SectionReveal>

            {/* FILTERS */}
            <SectionReveal>
              <div
                className="mb-8 p-4 sm:p-5 glass-card border border-gold-500/10 space-y-4"
                role="search"
                aria-label="Filter publications"
              >
                <div className="flex items-center gap-2">
                  <Filter size={13} className="text-gold-400" aria-hidden="true" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">
                    Filter Publications
                  </span>
                </div>

                {/* STATUS */}
                <fieldset>
                  <legend className="font-mono text-xs text-parchment-400/60 mb-2">Status</legend>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_FILTERS.map(s => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        aria-pressed={statusFilter === s}
                        aria-label={`Filter by status: ${STATUS_LABELS[s]}`}
                        className={`font-mono text-xs px-3 py-1.5 border rounded-sm transition-all min-h-[36px] ${
                          statusFilter === s
                            ? 'border-gold-500/60 bg-gold-500/15 text-gold-300'
                            : 'border-parchment-300/15 text-parchment-400 hover:border-gold-500/30'
                        }`}
                      >
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* TYPE */}
                <fieldset>
                  <legend className="font-mono text-xs text-parchment-400/60 mb-2">Type</legend>
                  <div className="flex flex-wrap gap-2">
                    {TYPE_FILTERS.map(t => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTypeFilter(t)}
                        aria-pressed={typeFilter === t}
                        aria-label={`Filter by type: ${TYPE_LABELS[t]}`}
                        className={`font-mono text-xs px-3 py-1.5 border rounded-sm transition-all min-h-[36px] ${
                          typeFilter === t
                            ? 'border-gold-500/60 bg-gold-500/15 text-gold-300'
                            : 'border-parchment-300/15 text-parchment-400 hover:border-gold-500/30'
                        }`}
                      >
                        {TYPE_LABELS[t]}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/*
                  Responsive Fix: tag filter collapses on mobile behind a toggle button.
                  13+ tags wrapping to 6 lines would make the filter section taller than
                  the viewport on small screens before the user sees any publications.
                */}
                <fieldset>
                  <legend className="font-mono text-xs text-parchment-400/60 mb-2">
                    Topic
                    {tagFilter && (
                      <span className="ml-2 text-gold-400">· {tagFilter}</span>
                    )}
                  </legend>
                  <button
                    type="button"
                    onClick={() => setShowTags(!showTags)}
                    aria-expanded={showTags}
                    aria-controls="tag-filter-panel"
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <span className="font-mono text-xs text-parchment-400/80 cursor-pointer select-none">
                      {showTags ? 'Hide topics' : 'Show topics'}
                    </span>
                    <span className="ml-auto text-parchment-400/60">
                      {showTags
                        ? <ChevronUp size={12} aria-hidden="true" />
                        : <ChevronDown size={12} aria-hidden="true" />
                      }
                    </span>
                  </button>

                  <AnimatePresence>
                    {showTags && (
                      <motion.div
                        id="tag-filter-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 mt-3">
                          <button
                            type="button"
                            onClick={() => setTagFilter(null)}
                            aria-pressed={!tagFilter}
                            className={`font-mono text-xs px-3 py-1 border rounded-sm transition-all min-h-[36px] ${
                              !tagFilter
                                ? 'border-gold-500/60 bg-gold-500/15 text-gold-300'
                                : 'border-parchment-300/15 text-parchment-400 hover:border-gold-500/30'
                            }`}
                          >
                            All
                          </button>
                          {ALL_TAGS.map(tag => (
                            <button
                              type="button"
                              key={tag}
                              onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
                              aria-pressed={tagFilter === tag}
                              className={`font-mono text-xs px-3 py-1 border rounded-sm transition-all min-h-[36px] ${
                                tagFilter === tag
                                  ? 'border-gold-500/60 bg-gold-500/15 text-gold-300'
                                  : 'border-parchment-300/15 text-parchment-400 hover:border-gold-500/30'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </fieldset>
              </div>
            </SectionReveal>

            {/* COUNT — Fix: full opacity for WCAG contrast compliance */}
            <p className="font-mono text-xs text-parchment-400 mb-5" aria-live="polite" aria-atomic="true">
              Showing <span className="text-gold-400 font-semibold">{filtered.length}</span> of {publications.length} publications
            </p>

            {/* LIST */}
            <motion.div layout="position" className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((pub, i) => (
                  <PublicationCard key={pub.id} pub={pub} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-parchment-400 font-mono text-sm" role="status">
                No publications match the selected filters.
              </div>
            )}

          </div>
        </div>
      </PageTransition>
    </>
  )
}
