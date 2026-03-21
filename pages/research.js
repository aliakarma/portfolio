import Head from 'next/head'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, BookOpen, ExternalLink, TrendingUp, FileText, Layers } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import PublicationCard from '../components/PublicationCard'
import { publications } from '../data/publications'
import { profile } from '../data/profile'

const ALL_TAGS = [...new Set(publications.flatMap(p => p.tags))]

export default function Research() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [tagFilter, setTagFilter] = useState(null)

  // ✅ PERFORMANCE OPTIMIZATION
  const filtered = useMemo(() => {
    return publications
      .filter(p => {
        const s = statusFilter === 'All' || p.status === statusFilter
        const t = typeFilter === 'All' || p.type === typeFilter
        const g = !tagFilter || p.tags.includes(tagFilter)
        return s && t && g
      })
      .sort((a, b) => b.year - a.year || b.id - a.id)
  }, [statusFilter, typeFilter, tagFilter])

  const counts = {
    published: publications.filter(p => p.status === 'published').length,
    accepted: publications.filter(p => p.status === 'accepted').length,
    review: publications.filter(p => p.status === 'review').length,
  }

  const TYPE_FILTERS = ['All', 'conference', 'journal', 'book_chapter']
  const STATUS_FILTERS = ['All', 'published', 'accepted', 'review']

  const TYPE_LABELS = {
    All: 'All Types',
    conference: 'Conference',
    journal: 'Journal',
    book_chapter: 'Book Chapter'
  }

  const STATUS_LABELS = {
    All: 'All Statuses',
    published: 'Published',
    accepted: 'Accepted',
    review: 'Under Review'
  }

  return (
    <>
      <Head>
        <title>Research & Publications — Ali Akarma</title>
      </Head>

      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          {/* ✅ Improved container for better readability on large screens */}
          <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6">

            {/* HEADER */}
            <SectionReveal>
              <div className="mb-14">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold-500/60" />
                  <span className="font-mono text-xs text-gold-400 tracking-normal sm:tracking-widest uppercase">
                    Publications
                  </span>
                </div>

                {/* ✅ Fluid typography */}
                <h1 className="font-display font-light text-parchment-100 mb-4 text-[clamp(2rem,5vw,4rem)]">
                  Research <span className="gold-text italic">Archive</span>
                </h1>

                <p className="font-body text-parchment-300 max-w-2xl mb-8">
                  {publications.length} publications and manuscripts spanning agentic AI architectures, safety, governance, and real-world deployment in critical systems.
                </p>

                <div className="section-divider" />
              </div>
            </SectionReveal>

            {/* STATS */}
            <SectionReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
                {[
                  { icon: <FileText size={16} />, value: counts.published, label: 'Published', bg: 'bg-emerald-900/20 border-emerald-600/20' },
                  { icon: <TrendingUp size={16} />, value: counts.accepted, label: 'Accepted', bg: 'bg-sky-900/20 border-sky-600/20' },
                  { icon: <Layers size={16} />, value: counts.review, label: 'Under Review', bg: 'bg-amber-900/20 border-amber-600/20' },
                  { icon: <BookOpen size={16} />, value: publications.length, label: 'Total', bg: 'bg-gold-900/20 border-gold-600/20' }
                ].map(m => (
                  <div key={m.label} className={`glass-card border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 ${m.bg}`}>
                    <div className="text-gold-400 flex-shrink-0">{m.icon}</div>
                    <div className="min-w-0">
                      <div className="font-display text-xl sm:text-2xl text-parchment-100">{m.value}</div>
                      <div className="font-mono text-xs text-parchment-400">{m.label}</div>
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
                className="inline-flex items-center gap-3 mb-10 p-4 glass-card border-gold-500/20 hover:border-gold-500/40 transition-all"
              >
                <BookOpen size={15} className="text-gold-400 flex-shrink-0" />
                <div>
                  <p className="font-mono text-xs text-parchment-400">Full citation metrics</p>
                  <p className="font-mono text-xs text-gold-400 flex items-center gap-1">
                    Google Scholar Profile <ExternalLink size={10} />
                  </p>
                </div>
              </a>
            </SectionReveal>

            {/* FILTERS */}
            <SectionReveal>
              <div className="mb-8 p-4 sm:p-5 glass-card border border-gold-500/10 space-y-3">

                <div className="flex items-center gap-2">
                  <Filter size={13} className="text-gold-400" />
                  <span className="font-mono text-xs text-gold-400 tracking-normal sm:tracking-widest uppercase">
                    Filter Publications
                  </span>
                </div>

                {/* STATUS */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="font-mono text-xs text-parchment-400/60 min-w-[50px] sm:min-w-[60px]">
                    Status:
                  </span>
                  {STATUS_FILTERS.map(s => (
                    <button
                      key={s}
                      aria-label={`Filter by ${s}`}
                      onClick={() => setStatusFilter(s)}
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

                {/* TYPE */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="font-mono text-xs text-parchment-400/60 min-w-[50px] sm:min-w-[60px]">
                    Type:
                  </span>
                  {TYPE_FILTERS.map(t => (
                    <button
                      key={t}
                      aria-label={`Filter by ${t}`}
                      onClick={() => setTypeFilter(t)}
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

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="font-mono text-xs text-parchment-400/60 min-w-[50px] sm:min-w-[60px]">
                    Topic:
                  </span>

                  <button
                    onClick={() => setTagFilter(null)}
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
                      key={tag}
                      onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
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

              </div>
            </SectionReveal>

            {/* COUNT */}
            <p className="font-mono text-xs text-parchment-400/60 mb-5">
              Showing <span className="text-gold-400">{filtered.length}</span> of {publications.length} publications
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
              <div className="text-center py-20 text-parchment-400 font-mono text-sm">
                No publications match the selected filters.
              </div>
            )}

          </div>
        </div>
      </PageTransition>
    </>
  )
}
