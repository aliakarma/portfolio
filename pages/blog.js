import Head from 'next/head'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight, Tag, ChevronDown, ChevronUp, MapPin } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { blogPosts } from '../data/blog'
import { profile } from '../data/profile'

export default function Blog() {
  const [expanded, setExpanded] = useState(null)

  return (
    <>
      <Head><title>Writing — Ali Akarma</title></Head>
      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-4xl mx-auto px-6">
            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4"><div className="w-8 h-px bg-gold-500/60" /><span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Writing</span></div>
                <h1 className="font-display text-5xl md:text-7xl font-light text-parchment-100 mb-4">Research <span className="gold-text italic">Notes</span></h1>
                <p className="font-body text-parchment-300 max-w-2xl mb-6">{blogPosts.length} articles drawn from published research — each paper distilled into a concise, reader-friendly post covering key findings, contributions, and practical implications.</p>
                <div className="section-divider" />
              </div>
            </SectionReveal>
            <div className="space-y-5">
              {blogPosts.map((post, i) => {
                const isOpen = expanded === post.id
                return (
                  <motion.article key={post.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}}
                    className="glass-card pub-card-accent pl-7 group">
                    <div className="p-5">
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-mono text-xs text-gold-400/70 border border-gold-500/20 px-2 py-0.5 rounded-sm">{post.category}</span>
                        <span className="flex items-center gap-1 font-mono text-xs text-parchment-400/60"><Clock size={10}/>{post.readTime}</span>
                        <span className="font-mono text-xs text-parchment-400/40">{post.date.slice(0, 'YYYY-MM'.length)}</span>
                        {post.venue && (
                          <span className="flex items-center gap-1 font-mono text-xs text-parchment-400/50 border border-parchment-400/15 px-2 py-0.5 rounded-sm">
                            <MapPin size={9}/>{post.venue}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-xl leading-snug text-parchment-100 mb-2 group-hover:text-gold-100 transition-colors">{post.title}</h2>

                      {/* Excerpt */}
                      <p className="font-body text-sm text-parchment-300 leading-relaxed mb-4">{post.excerpt}</p>

                      {/* Tags + expand toggle */}
                      <div className="flex items-center justify-between pt-3 border-t border-noir-600/60">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 tag-badge"><Tag size={8}/>{tag}</span>
                          ))}
                        </div>
                        <button
                          onClick={() => setExpanded(isOpen ? null : post.id)}
                          className="flex items-center gap-1.5 font-mono text-xs text-parchment-400 hover:text-gold-400 transition-colors ml-3 flex-shrink-0"
                        >
                          {isOpen ? <><ChevronUp size={11}/>Less</> : <><ChevronDown size={11}/>More</>}
                        </button>
                      </div>

                      {/* Expanded detail */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{height:0, opacity:0}}
                            animate={{height:'auto', opacity:1}}
                            exit={{height:0, opacity:0}}
                            transition={{duration:0.3}}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 pt-5 border-t border-gold-500/10 space-y-5">
                              {/* Summary */}
                              {post.summary && (
                                <div>
                                  <p className="font-mono text-xs text-gold-400/60 tracking-widest uppercase mb-2">Overview</p>
                                  <p className="font-body text-sm text-parchment-300 leading-relaxed">{post.summary}</p>
                                </div>
                              )}
                              {/* Key contributions */}
                              {post.keyContributions && (
                                <div>
                                  <p className="font-mono text-xs text-gold-400/60 tracking-widest uppercase mb-2">Key Contributions</p>
                                  <ul className="space-y-1.5">
                                    {post.keyContributions.map((c, j) => (
                                      <li key={j} className="flex items-start gap-2 font-body text-sm text-parchment-300 leading-relaxed">
                                        <span className="text-gold-400 mt-1 flex-shrink-0">›</span>{c}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {/* Implications */}
                              {post.implications && (
                                <div>
                                  <p className="font-mono text-xs text-gold-400/60 tracking-widest uppercase mb-2">Practical Implications</p>
                                  <p className="font-body text-sm text-parchment-300 leading-relaxed">{post.implications}</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.article>
                )
              })}
            </div>
            <SectionReveal delay={0.3}>
              <div className="mt-16 glass-card p-8 text-center border border-gold-500/20">
                <h3 className="font-display text-2xl text-parchment-100 mb-3">Stay Updated</h3>
                <p className="font-body text-parchment-300 text-sm mb-6">Follow on Google Scholar for the latest publication updates and citation metrics.</p>
                <a href={profile.scholar} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-noir-900 font-mono text-xs tracking-widest uppercase hover:bg-gold-400 transition-all">
                  Follow on Google Scholar <ArrowRight size={12}/>
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </PageTransition>
    </>
  )
}
