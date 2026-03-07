import Head from 'next/head'
import { motion } from 'framer-motion'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { blogPosts } from '../data/blog'
import { profile } from '../data/profile'

export default function Blog() {
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
                <div className="glass-card p-4 border-amber-500/20 inline-flex items-start gap-3 max-w-lg mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 animate-pulse" />
                  <p className="font-mono text-xs text-amber-400/80">Coming soon — posts below are illustrative of planned writing topics.</p>
                </div>
                <div className="section-divider mt-6" />
              </div>
            </SectionReveal>
            <div className="space-y-6">
              {blogPosts.map((post,i) => (
                <motion.article key={post.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} whileHover={{y:-4}}
                  className="glass-card pub-card-accent p-7 pl-8 group cursor-pointer">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-gold-400/60 border border-gold-500/20 px-2 py-0.5 rounded-sm">{post.category}</span>
                    <span className="flex items-center gap-1 font-mono text-xs text-parchment-400/60"><Clock size={10}/>{post.readTime}</span>
                    <span className="font-mono text-xs text-parchment-400/40">{post.date}</span>
                    {post.placeholder && <span className="font-mono text-xs text-amber-400/60 border border-amber-500/20 px-2 py-0.5 rounded-sm">Placeholder</span>}
                  </div>
                  <h2 className="font-display text-2xl text-parchment-100 mb-3 leading-snug group-hover:text-gold-200 transition-colors">{post.title}</h2>
                  <p className="font-body text-sm text-parchment-300 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">{post.tags.map(tag => <span key={tag} className="flex items-center gap-1 tag-badge"><Tag size={8}/>{tag}</span>)}</div>
                    <span className="font-mono text-xs text-gold-400/50 group-hover:text-gold-400 transition-colors flex items-center gap-1">Read <ArrowRight size={10}/></span>
                  </div>
                </motion.article>
              ))}
            </div>
            <SectionReveal delay={0.3}>
              <div className="mt-16 glass-card p-8 text-center border border-gold-500/20">
                <h3 className="font-display text-2xl text-parchment-100 mb-3">Stay Updated</h3>
                <p className="font-body text-parchment-300 text-sm mb-6">Research articles on agentic AI safety are in progress. Follow on Google Scholar for publication updates.</p>
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
