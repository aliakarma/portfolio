import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, BookOpen, ArrowRight, FileText, Star, Quote, TrendingUp, Award, Layers, Users } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { profile } from '../data/profile'
import { publications } from '../data/publications'

const ResearchGraph = dynamic(() => import('../components/ResearchGraph'), { ssr: false })

function AnimatedCounter({ target, suffix = '', delay = 0 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])
  useEffect(() => {
    if (!started) return
    const timer = setTimeout(() => {
      let cur = 0; const step = Math.ceil(target / 40)
      const iv = setInterval(() => { cur = Math.min(cur + step, target); setCount(cur); if (cur >= target) clearInterval(iv) }, 30)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [started, target, delay])
  return <span ref={ref}>{count}{suffix}</span>
}

const socialLinks = [
  { icon: <BookOpen size={18} />, href: profile.scholar,            label: 'Google Scholar' },
  { icon: <Github size={18} />,   href: profile.github,             label: 'GitHub' },
  { icon: <Linkedin size={18} />, href: profile.linkedin,           label: 'LinkedIn' },
  { icon: <Mail size={18} />,     href: `mailto:${profile.email}`,  label: 'Email' },
]

const stats = [
  { icon: <FileText size={16} />,   value: 12, suffix: '',  label: 'Publications',     sub: 'peer-reviewed & in pipeline' },
  { icon: <Layers size={16} />,     value: 5,  suffix: '',  label: 'Research Areas',   sub: 'AI safety to governance' },
  { icon: <Award size={16} />,      value: 3,  suffix: '',  label: 'Conferences', sub: 'IEEE ICCA 2025 & ICBDT 2025 ICETAS 2026 ' },
  { icon: <TrendingUp size={16} />, value: 5,  suffix: '+', label: 'Journals',         sub: 'Springer, PLOS ONE, MDPI, IEEE' },
]

export default function Home() {
  const recent = publications.slice(0, 3)
  return (
    <>
      <Head>
        <title>Ali Akarma — AI Researcher</title>
        <meta name="description" content="Ali Akarma — AI Researcher specializing in Agentic AI, AI Safety, and Trustworthy Machine Learning at Islamic University of Madinah." />
      </Head>
      <PageTransition>

        {/* HERO */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern" style={{ backgroundSize: '40px 40px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-gold opacity-25 pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              {/* Left */}
              <div className="md:col-span-3">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1 border border-gold-500/30 bg-gold-500/5 rounded-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                    <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">AI Researcher · Islamic University of Madinah</span>
                  </div>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-display text-6xl md:text-8xl font-light text-parchment-100 leading-none mb-1">Ali</motion.h1>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                  className="font-display text-6xl md:text-8xl font-light leading-none mb-8">
                  <span className="gold-shimmer">Akarma</span>
                </motion.h1>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                  className="font-mono text-base md:text-lg text-parchment-300 mb-6 h-7">
                  <TypeAnimation
                    sequence={['Designing Safety-Aligned Agentic Systems.', 2200, 'Researching Trustworthy Machine Learning.', 2200, 'Building AI Governance Frameworks.', 2200, 'Studying Failure Modes in Autonomous AI.', 2200]}
                    wrapper="span" speed={55} repeat={Infinity} className="text-gold-300" />
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                  className="font-body text-parchment-300 text-base leading-relaxed max-w-xl mb-10">{profile.bio}</motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-3 mb-10">
                  <Link href="/research" className="group flex items-center gap-2 px-6 py-3 bg-gold-500 text-noir-900 font-mono text-xs font-medium tracking-widest uppercase hover:bg-gold-400 transition-all">
                    View Research <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href={profile.scholar} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-gold-500/40 text-gold-400 font-mono text-xs tracking-widest uppercase hover:bg-gold-500/10 transition-all">
                    <BookOpen size={13} /> Google Scholar
                  </a>
                  <a href={profile.cv} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-parchment-300/20 text-parchment-300 font-mono text-xs tracking-widest uppercase hover:border-parchment-300/50 transition-all">
                    <FileText size={13} /> Download CV
                  </a>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex items-center gap-5">
                  {socialLinks.map(s => (
                    <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                      aria-label={s.label} className="text-parchment-400 hover:text-gold-400 transition-all duration-200 hover:scale-110">{s.icon}</a>
                  ))}
                </motion.div>
              </div>

              {/* Right — stats */}
              <div className="md:col-span-2">
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="space-y-3">
                  {stats.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
                      className="glass-card p-4 flex items-center gap-4">
                      <div className="w-10 h-10 border border-gold-500/25 bg-gold-500/8 flex items-center justify-center flex-shrink-0 text-gold-400">{stat.icon}</div>
                      <div className="flex-1">
                        <div className="font-display text-2xl text-gold-400"><AnimatedCounter target={stat.value} suffix={stat.suffix} delay={0.8 + i * 0.1} /></div>
                        <div className="font-mono text-xs text-parchment-100">{stat.label}</div>
                        <div className="font-mono text-xs text-parchment-400/50">{stat.sub}</div>
                      </div>
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
                    className="glass-card p-4 border-gold-500/15">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={12} className="text-gold-400" />
                      <span className="font-mono text-xs text-gold-400/70 tracking-widest uppercase">Scholar Metrics</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[{label:'Citations',value:profile.scholarMetrics.citations},{label:'h-index',value:profile.scholarMetrics.hIndex},{label:'i10-index',value:profile.scholarMetrics.i10Index}].map(m => (
                        <div key={m.label} className="text-center">
                          <div className="font-display text-xl text-parchment-100">{m.value}</div>
                          <div className="font-mono text-xs text-parchment-400/50">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-parchment-400/40 tracking-widest uppercase">scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-gold-500/40 to-transparent" />
          </motion.div>
        </section>

        {/* RESEARCH VISION */}
        <SectionReveal>
          <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
            <div className="section-divider mb-16" />
            <div className="grid md:grid-cols-5 gap-10 items-start">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold-500/60" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Research Vision</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-light text-parchment-100 leading-tight">
                  Why This<br /><span className="gold-text italic">Research</span><br />Matters
                </h2>
              </div>
              <div className="md:col-span-3">
                <div className="relative glass-card p-8 border-l-2 border-gold-500/50">
                  <Quote size={28} className="text-gold-500/20 absolute top-6 right-6" />
                  {profile.researchVision.split('\n\n').map((para, i) => (
                    <p key={i} className={`font-body text-parchment-200 leading-relaxed text-base ${i > 0 ? 'mt-4' : ''}`}>{para}</p>
                  ))}
                  <div className="mt-6 pt-4 border-t border-gold-500/10 flex flex-wrap gap-2">
                    {profile.researchInterests.map(interest => (
                      <motion.span key={interest} whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 glass-card border border-gold-500/15">
                        <Star size={9} className="text-gold-400" fill="currentColor" />
                        <span className="font-mono text-xs text-parchment-300">{interest}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* RESEARCH GRAPH */}
        <SectionReveal>
          <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
            <div className="section-divider mb-12" />
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-px bg-gold-500/60" />
              <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Knowledge Graph</span>
            </div>
            <h2 className="font-display text-3xl text-parchment-100 mb-8">Research Landscape</h2>
            <div className="glass-card p-6 border border-gold-500/10">
              <ResearchGraph />
            </div>
          </section>
        </SectionReveal>

        {/* RECENT PUBLICATIONS */}
        <SectionReveal>
          <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
            <div className="section-divider mb-12" />
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-px bg-gold-500/60" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Latest Work</span>
                </div>
                <h2 className="font-display text-3xl text-parchment-100">Recent Publications</h2>
              </div>
              <Link href="/research" className="font-mono text-xs text-gold-400 tracking-widest uppercase hover-underline flex items-center gap-1">
                All {publications.length} Papers <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-4">
              {recent.map((pub, i) => (
                <motion.div key={pub.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="pub-card-accent glass-card p-5 pl-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-parchment-100 mb-1 leading-snug">{pub.title}</h3>
                      <p className="font-mono text-xs text-parchment-400 mb-2">{pub.authorsStr}</p>
                      <div className="flex flex-wrap gap-1.5">{pub.tags.slice(0,3).map(tag => <span key={tag} className="tag-badge">{tag}</span>)}</div>
                    </div>
                    <span className={`font-mono text-xs px-2 py-1 border rounded-sm ${pub.status === 'published' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-700/30' : pub.status === 'accepted' ? 'bg-sky-900/30 text-sky-400 border-sky-700/30' : 'bg-amber-900/30 text-amber-400 border-amber-700/30'}`}>{pub.statusLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/research" className="inline-flex items-center gap-2 font-mono text-xs text-gold-400 tracking-widest uppercase hover:text-gold-300 transition-colors">
                View Full Publication Archive <ArrowRight size={12} />
              </Link>
            </div>
          </section>
        </SectionReveal>
      </PageTransition>
    </>
  )
}
