import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, ChevronUp, ExternalLink, BookOpen,
  Code2, Database, FileText, Copy, Check, X
} from 'lucide-react'

const HIGHLIGHTED_AUTHOR = 'Ali Akarma'

const STATUS_STYLES = {
  published: 'bg-emerald-900/40 text-emerald-300 border-emerald-600/30',
  accepted:  'bg-sky-900/40 text-sky-300 border-sky-600/30',
  review:    'bg-amber-900/40 text-amber-300 border-amber-600/30',
}

const TYPE_LABELS = {
  conference:   'Conference',
  journal:      'Journal',
  book_chapter: 'Book Chapter',
}

const TAG_PALETTE = {
  'Agentic AI':    'text-violet-300 border-violet-500/25 bg-violet-900/20',
  'AI Safety':     'text-rose-300 border-rose-500/25 bg-rose-900/20',
  'Safety':        'text-rose-300 border-rose-500/25 bg-rose-900/20',
  'AI Governance': 'text-teal-300 border-teal-500/25 bg-teal-900/20',
  'Ethics':        'text-teal-300 border-teal-500/25 bg-teal-900/20',
  'Blockchain':    'text-amber-300 border-amber-500/25 bg-amber-900/20',
  'Digital Twins': 'text-cyan-300 border-cyan-500/25 bg-cyan-900/20',
  'LLMs':          'text-blue-300 border-blue-500/25 bg-blue-900/20',
  'Multi-Agent RL':'text-indigo-300 border-indigo-500/25 bg-indigo-900/20',
  'Smart Cities':  'text-green-300 border-green-500/25 bg-green-900/20',
}

const tagClass = (t) =>
  TAG_PALETTE[t] || 'text-parchment-400 border-parchment-400/20 bg-parchment-400/5'

/* ─── BibTeX Modal ─── */
function BibTeXModal({ bibtex, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /* Accessibility Fix: close on Escape */
  const handleKeyDown = (e) => { if (e.key === 'Escape') onClose() }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="BibTeX citation viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-900/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card border border-gold-500/25 w-full max-w-2xl p-4 sm:p-6 relative"
      >
        <button
          onClick={onClose}
          aria-label="Close BibTeX viewer"
          className="absolute top-3 right-3 text-parchment-400 hover:text-parchment-100 p-1 min-h-[36px] min-w-[36px] flex items-center justify-center"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={14} className="text-gold-400" aria-hidden="true" />
          <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">
            BibTeX Citation
          </span>
        </div>

        <pre className="bg-noir-900/80 border border-noir-500 rounded-sm p-3 sm:p-4 font-mono text-xs text-parchment-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {bibtex}
        </pre>

        <button
          onClick={handleCopy}
          className={`mt-4 flex items-center gap-2 font-mono text-xs px-4 py-2 border transition min-h-[40px] ${
            copied
              ? 'border-emerald-500/50 text-emerald-400 bg-emerald-900/20'
              : 'border-gold-500/40 text-gold-400 hover:bg-gold-500/10'
          }`}
        >
          {copied
            ? <><Check size={12} aria-hidden="true" /> Copied!</>
            : <><Copy size={12} aria-hidden="true" /> Copy BibTeX</>
          }
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ─── Publication Card ─── */
export default function PublicationCard({ pub, index = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const [showBib, setShowBib]   = useState(false)

  return (
    <>
      <motion.div
        layout="position"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        className="pub-card-accent glass-card pl-3 sm:pl-7"
      >
        <div className="p-3 sm:p-5">

          {/* TOP SECTION */}
          <div className="flex flex-wrap items-start gap-3 mb-3">

            {/* LEFT CONTENT */}
            <div className="flex-1 min-w-0 w-full">

              {/* TYPE + VENUE */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs text-parchment-400/60 border border-parchment-400/20 px-1.5 py-0.5 rounded-sm">
                  {TYPE_LABELS[pub.type] || pub.type}
                </span>
                <span className="font-mono text-xs text-parchment-400/60">
                  {pub.venueShort} · {pub.year}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="font-display text-lg sm:text-xl leading-snug text-parchment-100 mb-1.5">
                {pub.title}
              </h3>

              {/* AUTHORS */}
              <p className="font-mono text-xs text-parchment-400 mb-3 leading-relaxed">
                {pub.authorsStr.split(new RegExp(`(${HIGHLIGHTED_AUTHOR})`)).map((part, i) =>
                  part === HIGHLIGHTED_AUTHOR
                    ? <span key={i} className="text-gold-400 font-semibold">{part}</span>
                    : part
                )}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-1.5">
                {pub.tags.map(tag => (
                  <span
                    key={tag}
                    className={`font-mono text-xs px-2 py-0.5 border rounded-sm ${tagClass(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* STATUS BADGE */}
            <span className={`self-start flex-shrink-0 text-[10px] sm:text-xs px-2 py-1 border rounded-sm ${STATUS_STYLES[pub.status]}`}>
              {pub.statusLabel}
            </span>

          </div>

          {/*
            Responsive Fix: action bar uses gap-x instead of border-l dividers.
            border-l items look broken when they wrap to a new line on mobile
            (the left border appears with no item to its left). gap-x-3 provides
            clear visual spacing without this artifact.
          */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 pt-3 border-t border-noir-600/60">

            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label={expanded ? 'Collapse abstract' : 'Expand abstract'}
              className="flex items-center gap-1 text-xs font-mono text-parchment-400 hover:text-gold-400 min-h-[36px] px-1"
            >
              {expanded
                ? <ChevronUp size={11} aria-hidden="true" />
                : <ChevronDown size={11} aria-hidden="true" />
              }
              Abstract
            </button>

            <button
              onClick={() => setShowBib(true)}
              aria-label="View BibTeX citation"
              className="flex items-center gap-1 text-xs font-mono text-parchment-400 hover:text-gold-400 min-h-[36px] px-1"
            >
              <BookOpen size={11} aria-hidden="true" /> BibTeX
            </button>

            {pub.doi && (
              <a
                href={pub.doi}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View DOI for ${pub.title} (opens in new tab)`}
                className="flex items-center gap-1 text-xs font-mono text-parchment-400 hover:text-gold-400 min-h-[36px] px-1"
              >
                <ExternalLink size={11} aria-hidden="true" /> DOI
              </a>
            )}

            {pub.pdf && (
              <a
                href={pub.pdf}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download PDF for ${pub.title} (opens in new tab)`}
                className="flex items-center gap-1 text-xs font-mono text-parchment-400 hover:text-gold-400 min-h-[36px] px-1"
              >
                <FileText size={11} aria-hidden="true" /> PDF
              </a>
            )}

            {pub.code && (
              <a
                href={pub.code}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View code repository for ${pub.title} (opens in new tab)`}
                className="flex items-center gap-1 text-xs font-mono text-parchment-400 hover:text-gold-400 min-h-[36px] px-1"
              >
                <Code2 size={11} aria-hidden="true" /> Code
              </a>
            )}

            {pub.dataset && (
              <a
                href={pub.dataset}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View dataset for ${pub.title} (opens in new tab)`}
                className="flex items-center gap-1 text-xs font-mono text-parchment-400 hover:text-gold-400 min-h-[36px] px-1"
              >
                <Database size={11} aria-hidden="true" /> Dataset
              </a>
            )}

          </div>

          {/* EXPANDED ABSTRACT */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-gold-500/10">
                  <p className="font-mono text-xs text-gold-400/60 tracking-widest uppercase mb-2">
                    Abstract
                  </p>
                  <p className="text-sm text-parchment-300 leading-relaxed">
                    {pub.abstract}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>

      <AnimatePresence>
        {showBib && (
          <BibTeXModal bibtex={pub.bibtex} onClose={() => setShowBib(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
