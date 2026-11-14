import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PAGES } from '../data/nav'

const norm = (path) => (path.length > 1 ? path.replace(/\/$/, '') : path)

/*
  Cards for every other page, with live counts. Rendered at the end of each
  page by _app.js and near the top of the homepage, so a visitor who lands on
  any single page can see what else the site holds.
*/
export default function ExploreNext({ current = '/', counts, heading = 'Keep exploring', className = '' }) {
  const pages = PAGES.filter(p => p.href !== '/' && norm(p.href) !== norm(current))

  return (
    <section aria-labelledby="explore-heading" className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
        <h2 id="explore-heading" className="font-mono text-xs text-gold-400 tracking-widest uppercase">{heading}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map(p => {
          const count = p.countKey ? counts?.[p.countKey] : null
          return (
            <Link
              key={p.href}
              href={p.href}
              className="glass-card p-5 border border-gold-500/15 hover:border-gold-500/40 transition-all group flex flex-col min-h-[44px]"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-lg text-parchment-100 group-hover:text-gold-300 transition-colors">{p.title}</span>
                {count != null && (
                  <span className="font-mono text-xs text-gold-400 whitespace-nowrap">{count} {p.unit}</span>
                )}
              </span>
              <span className="font-body text-xs text-parchment-400 mt-1 leading-relaxed flex-1">{p.blurb}</span>
              <span className="font-mono text-xs text-gold-400/80 mt-3 inline-flex items-center gap-1 group-hover:underline">
                Open <ArrowRight size={11} aria-hidden="true" />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
