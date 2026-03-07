import Head from 'next/head'
import { useState } from 'react'
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
  const [typeFilter,   setTypeFilter]   = useState('All')
  const [tagFilter,    setTagFilter]    = useState(null)

  const filtered = publications.filter(p => {
    const s = statusFilter === 'All' || p.status === statusFilter
    const t = typeFilter   === 'All' || p.type   === typeFilter
    const g = !tagFilter              || p.tags.includes(tagFilter)
    return s && t && g
  })

  const counts = {
    published: publications.filter(p => p.status === 'published').length,
    accepted:  publications.filter(p => p.status === 'accepted').length,
    review:    publications.filter(p => p.status === 'review').length,
  }

  const TYPE_FILTERS   = ['All', 'conference', 'journal', 'book_chapter']
  const STATUS_FILTERS = ['All', 'published', 'accepted', 'review']
  const TYPE_LABELS    = { All: 'All Types', conference: 'Conference', journal: 'Journal', book_chapter: 'Book Chapter' }
  const STATUS_LABELS  = { All: 'All Statuses', published: 'Published', accepted: 'Accepted', review: 'Under Review' }

  return (
    <>
      <Head><title>Research & Publications — Ali Akarma</title></Head>
      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal>
              <div className="mb-14">
                <div className="flex items-center gap-4 mb-4"><div className="w-8 h-px bg-gold-500/60" /><span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Publications</span></div>
                <h1 className="font-display text-5xl md:text-7xl font-light text-parchment-100 mb-4">Research <span className="gold-text italic">Archive</span></h1>
                <p className="font-body text-parchment-300 max-w-2xl mb-8">{publications.length} publications and manuscripts spanning agentic AI architectures, safety, governance, and real-world deployment in critical systems.</p>
                <div className="section-divider" />
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[{icon:<FileText size={16}/>,value:counts.published,label:'Published',bg:'bg-emerald-900/20 border-emerald-600/20'},{icon:<TrendingUp size={16}/>,value:counts.accepted,label:'Accepted',bg:'bg-sky-900/20 border-sky-600/20'},{icon:<Layers size={16}/>,value:counts.review,label:'Under Review',bg:'bg-amber-900/20 border-amber-600/20'},{icon:<BookOpen size={16}/>,value:publications.length,label:'Total',bg:'bg-gold-900/20 border-gold-600/20'}].map(m => (
                  <div key={m.label} className={`glass-card border p-4 flex items-center gap-3 ${m.bg}`}>
                    <div className="text-gold-400">{m.icon}</div>
                    <div><div className="font-display text-2xl text-parchment-100">{m.value}</div><div className="font-mono text-xs text-parchment-400">{m.label}</div></div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal>
              <a href={profile.scholar} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mb-10 p-4 glass-card border-gold-500/20 hover:border-gold-500/40 transition-all">
                <BookOpen size={15} className="text-gold-400" />
                <div><p className="font-mono text-xs text-parchment-400">Full citation metrics</p><p className="font-mono text-xs text-gold-400 flex items-center gap-1">Google Scholar Profile <ExternalLink size={10} /></p></div>
              </a>
            </SectionReveal>

            <SectionReveal>
              <div className="mb-8 p-5 glass-card border border-gold-500/10 space-y-3">
                <div className="flex items-center gap-2"><Filter size={13} className="text-gold-400" /><span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Filter Publications</span></div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-parchment-400/60 w-14">Status:</span>
                  {STATUS_FILTERS.map(s => (
                    <button key={s} onClick={() => setStatusFilter(s)}
                      className={`font-mono text-xs px-3 py-1.5 border rounded-sm transition-all ${statusFilter === s ? 'border-gold-500/60 bg-gold-500/15 text-gold-300' : 'border-parchment-300/15 text-parchment-400 hover:border-gold-500/30'}`}>
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-parchment-400/60 w-14">Type:</span>
                  {TYPE_FILTERS.map(t => (
                    <button key={t} onClick={() => setTypeFilter(t)}
                      className={`font-mono text-xs px-3 py-1.5 border rounded-sm transition-all ${typeFilter === t ? 'border-gold-500/60 bg-gold-500/15 text-gold-300' : 'border-parchment-300/15 text-parchment-400 hover:border-gold-500/30'}`}>
                      {TYPE_LABELS[t]}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-parchment-400/60 w-14">Topic:</span>
                  <button onClick={() => setTagFilter(null)} className={`font-mono text-xs px-2.5 py-1 border rounded-sm transition-all ${!tagFilter ? 'border-gold-500/60 bg-gold-500/15 text-gold-300' : 'border-parchment-300/15 text-parchment-400 hover:border-gold-500/30'}`}>All</button>
                  {ALL_TAGS.map(tag => (
                    <button key={tag} onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
                      className={`font-mono text-xs px-2.5 py-1 border rounded-sm transition-all ${tagFilter === tag ? 'border-gold-500/60 bg-gold-500/15 text-gold-300' : 'border-parchment-300/15 text-parchment-400 hover:border-gold-500/30'}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <p className="font-mono text-xs text-parchment-400/60 mb-5">Showing <span className="text-gold-400">{filtered.length}</span> of {publications.length} publications</p>

            <motion.div layout className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((pub, i) => <PublicationCard key={pub.id} pub={pub} index={i} />)}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && <div className="text-center py-20 text-parchment-400 font-mono text-sm">No publications match the selected filters.</div>}

            <SectionReveal>
              <div className="mt-16 section-divider mb-12" />
              <div className="flex items-center gap-4 mb-6"><div className="w-8 h-px bg-gold-500/60" /><h2 className="font-display text-2xl text-parchment-100">Citation Metrics</h2></div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6 border border-gold-500/15">
                  <div className="flex items-center gap-2 mb-5"><BookOpen size={15} className="text-gold-400" /><span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Google Scholar — {profile.scholarMetrics.since}–Present</span></div>
                  <div className="grid grid-cols-3 gap-4">
                    {[{label:'Total Citations',value:profile.scholarMetrics.citations},{label:'h-index',value:profile.scholarMetrics.hIndex},{label:'i10-index',value:profile.scholarMetrics.i10Index}].map(m => (
                      <div key={m.label} className="text-center p-4 border border-noir-500/60 rounded-sm">
                        <div className="font-display text-4xl font-light text-gold-400 mb-1">{m.value}</div>
                        <div className="font-mono text-xs text-parchment-400">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="font-mono text-xs text-parchment-400/40 mt-4 text-center">Metrics as of 2025 · Actively growing</p>
                </div>
                <div className="glass-card p-6 border border-gold-500/15">
                  <p className="font-mono text-xs text-gold-400/70 tracking-widest uppercase mb-5">Publication Breakdown</p>
                  <div className="space-y-4">
                    {[{label:'IEEE Conferences',count:5,color:'bg-blue-400'},{label:'Springer',count:2,color:'bg-purple-400'},{label:'PLOS ONE',count:2,color:'bg-amber-400'},{label:'MDPI Journals',count:1,color:'bg-green-400'},{label:'ETASR',count:1,color:'bg-teal-400'},{label:'Heliyon',count:1,color:'bg-rose-400'}].map(b => (
                      <div key={b.label}>
                        <div className="flex justify-between mb-1.5"><span className="font-body text-sm text-parchment-300">{b.label}</span><span className="font-mono text-xs text-parchment-400">{b.count}</span></div>
                        <div className="h-1 bg-noir-600 rounded-full"><motion.div initial={{width:0}} whileInView={{width:`${(b.count/12)*100}%`}} viewport={{once:true}} transition={{duration:0.8,ease:'easeOut'}} className={`h-full rounded-full ${b.color}`} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </PageTransition>
    </>
  )
}
