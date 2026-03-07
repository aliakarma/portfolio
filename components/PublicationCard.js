import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, ChevronUp, ExternalLink, BookOpen,
  Code2, Database, FileText, Copy, Check, X, Tag
} from 'lucide-react'

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
  'Agentic AI':       'text-violet-300 border-violet-500/25 bg-violet-900/20',
  'AI Safety':        'text-rose-300   border-rose-500/25   bg-rose-900/20',
  'Safety':           'text-rose-300   border-rose-500/25   bg-rose-900/20',
  'AI Governance':    'text-teal-300   border-teal-500/25   bg-teal-900/20',
  'Ethics':           'text-teal-300   border-teal-500/25   bg-teal-900/20',
  'Blockchain':       'text-amber-300  border-amber-500/25  bg-amber-900/20',
  'Digital Twins':    'text-cyan-300   border-cyan-500/25   bg-cyan-900/20',
  'LLMs':             'text-blue-300   border-blue-500/25   bg-blue-900/20',
  'Multi-Agent RL':   'text-indigo-300 border-indigo-500/25 bg-indigo-900/20',
  'Smart Cities':     'text-green-300  border-green-500/25  bg-green-900/20',
}
const tagClass = (t) => TAG_PALETTE[t] || 'text-parchment-400 border-parchment-400/20 bg-parchment-400/5'

function BibTeXModal({ bibtex, onClose }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-noir-900/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card border border-gold-500/25 w-full max-w-2xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-parchment-400 hover:text-parchment-100 transition-colors"
        >
          <X size={16} />
        </button>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={14} className="text-gold-400" />
          <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">BibTeX Citation</span>
        </div>
        <pre className="bg-noir-900/80 border border-noir-500 rounded-sm p-4 font-mono text-xs text-parchment-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
          {bibtex}
        </pre>
        <button
          onClick={handleCopy}
          className={`mt-4 flex items-center gap-2 font-mono text-xs px-4 py-2 border transition-all duration-200 ${
            copied
              ? 'border-emerald-500/50 text-emerald-400 bg-emerald-900/20'
              : 'border-gold-500/40 text-gold-400 hover:bg-gold-500/10'
          }`}
        >
          {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy BibTeX</>}
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function PublicationCard({ pub, index = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const [showBib, setShowBib] = useState(false)

  const hasLinks = pub.doi || pub.pdf || pub.code || pub.dataset || pub.notebook

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        className="pub-card-accent glass-card pl-7 group"
      >
        <div className="p-5">
          {/* Top row */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              {/* Type + venue */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs text-parchment-400/60 border border-parchment-400/15 px-1.5 py-0.5 rounded-sm">
                  {TYPE_LABELS[pub.type] || pub.type}
                </span>
                <span className="font-mono text-xs text-parchment-400/60">{pub.venueShort} · {pub.year}</span>
              </div>
              {/* Title */}
              <h3 className="font-display text-xl leading-snug text-parchment-100 mb-1.5 group-hover:text-gold-100 transition-colors">
                {pub.title}
              </h3>
              {/* Authors */}
              <p className="font-mono text-xs text-parchment-400 mb-3">
                {pub.authorsStr}
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {pub.tags.map((tag) => (
                  <span key={tag} className={`font-mono text-xs px-2 py-0.5 border rounded-sm ${tagClass(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Status badge */}
            <span className={`flex-shrink-0 font-mono text-xs px-2.5 py-1 border rounded-sm ${STATUS_STYLES[pub.status]}`}>
              {pub.statusLabel}
            </span>
          </div>

          {/* Action row */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-noir-600/60">
            {/* Expand abstract */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 font-mono text-xs text-parchment-400 hover:text-gold-400 transition-colors"
            >
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              Abstract
            </button>

            {/* BibTeX */}
            <button
              onClick={() => setShowBib(true)}
              className="flex items-center gap-1.5 font-mono text-xs text-parchment-400 hover:text-gold-400 transition-colors border-l border-noir-600/60 pl-3"
            >
              <BookOpen size={11} /> BibTeX
            </button>

            {/* Resource links */}
            {pub.doi && (
              <a href={pub.doi} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-parchment-400 hover:text-gold-400 transition-colors border-l border-noir-600/60 pl-3">
                <ExternalLink size={11} /> DOI
              </a>
            )}
            {pub.pdf && (
              <a href={pub.pdf} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-parchment-400 hover:text-gold-400 transition-colors border-l border-noir-600/60 pl-3">
                <FileText size={11} /> PDF
              </a>
            )}
            {pub.code && (
              <a href={pub.code} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-parchment-400 hover:text-gold-400 transition-colors border-l border-noir-600/60 pl-3">
                <Code2 size={11} /> Code
              </a>
            )}
            {pub.dataset && (
              <a href={pub.dataset} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-parchment-400 hover:text-gold-400 transition-colors border-l border-noir-600/60 pl-3">
                <Database size={11} /> Dataset
              </a>
            )}
          </div>

          {/* Expanded: abstract + reproducibility */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-gold-500/10 space-y-4">
                  {/* Abstract */}
                  <div>
                    <p className="font-mono text-xs text-gold-400/60 tracking-widest uppercase mb-2">Abstract</p>
                    <p className="font-body text-sm text-parchment-300 leading-relaxed">{pub.abstract}</p>
                  </div>

                  {/* Reproducibility panel */}
                  <div>
                    <p className="font-mono text-xs text-gold-400/60 tracking-widest uppercase mb-2">
                      Reproducibility
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: 'Code', icon: <Code2 size={13} />, href: pub.code, available: !!pub.code },
                        { label: 'Dataset', icon: <Database size={13} />, href: pub.dataset, available: !!pub.dataset },
                        { label: 'Notebook', icon: <FileText size={13} />, href: pub.notebook, available: !!pub.notebook },
                        { label: 'PDF', icon: <BookOpen size={13} />, href: pub.pdf, available: !!pub.pdf },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2 px-3 py-2 border rounded-sm font-mono text-xs ${
                            item.available
                              ? 'border-gold-500/30 text-gold-400 bg-gold-500/5 hover:bg-gold-500/10 cursor-pointer'
                              : 'border-noir-500/60 text-parchment-400/30 cursor-not-allowed'
                          }`}
                          onClick={() => item.available && window.open(item.href, '_blank')}
                        >
                          {item.icon}
                          {item.label}
                          {item.available && <Check size={10} className="ml-auto text-emerald-400" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* BibTeX Modal */}
      <AnimatePresence>
        {showBib && <BibTeXModal bibtex={pub.bibtex} onClose={() => setShowBib(false)} />}
      </AnimatePresence>
    </>
  )
}
