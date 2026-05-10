import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, BookOpen, ArrowRight, FileText, Star, Quote, TrendingUp, Award, Layers } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { profile } from '../data/profile'
import { publications } from '../data/publications'

const ResearchGraph = dynamic(() => import('../components/ResearchGraph'), { ssr: false })
import ErrorBoundary from '../components/ErrorBoundary'
const AUTHOR_REGEX = new RegExp(`(${profile.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`)

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', delay = 0 }) {
  const [count,   setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let iv
    const timer = setTimeout(() => {
      let cur = 0
      const step = Math.ceil(target / 40)
      iv = setInterval(() => {
        cur = Math.min(cur + step, target)
        setCount(cur)
        if (cur >= target) clearInterval(iv)
      }, 30)
    }, delay * 1000)
    return () => {
      clearTimeout(timer)
      if (iv) clearInterval(iv)
    }
  }, [started, target, delay])

  return <span ref={ref}>{count}{suffix}</span>
}

const socialLinks = [
  { icon: <BookOpen size={18} />, href: profile.scholar,           label: 'Google Scholar Profile' },
  { icon: <Github   size={18} />, href: profile.github,            label: 'GitHub' },
  { icon: <Linkedin size={18} />, href: profile.linkedin,          label: 'LinkedIn' },
  { icon: <Mail     size={18} />, href: `mailto:${profile.email}`, label: 'Email' },
]

/*
  Performance Fix: stats are now derived from publications data instead of
  hardcoded numbers. Adding a new publication updates the hero counter automatically.
*/
const conferenceVenues = [...new Set(
  publications
    .filter(p => p.type === 'conference')
    .map(p => p.venueShort)
)]

const journalCount = publications.filter(p => p.type === 'journal').length

const stats = [
  {
    icon:   <FileText size={16} />,
    value:  publications.length,
    suffix: '',
    label:  'Publications',
    sub:    'peer-reviewed & in pipeline',
  },
  {
    icon:   <Layers size={16} />,
    value:  5,
    suffix: '',
    label:  'Research Areas',
    sub:    'safety, governance, agentic AI',
  },
  {
    icon:   <Award size={16} />,
    value:  conferenceVenues.length,
    suffix: '',
    label:  'Conferences',
    // Responsive Fix: shorter sub-label prevents overflow on 320px stat cards
    sub:    'IEEE ICCA, ICBDT, ICETAS',
  },
  {
    icon:   <TrendingUp size={16} />,
    value:  journalCount,
    suffix: '',
    label:  'Journals',
    sub:    'Springer, PLOS ONE, MDPI, IEEE',
  },
]

export default function Home() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)
    const handler = (e) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const recent = [...publications]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)

  return (
    <>
      <Head>
        <title>Ali Akarma — AI Researcher</title>
        <meta
          name="description"
          content="Ali Akarma — AI Researcher specializing in designing autonomous AI systems that fail safely by design at the Islamic University of Madinah."
        />
        <link rel="canonical" href="https://aliakarma.codes" />
        <meta property="og:title" content="Ali Akarma — AI Researcher" />
        <meta property="og:description" content="Designing autonomous AI systems that fail safely by design." />
        <meta property="og:url" content="https://aliakarma.codes" />
      </Head>

      <PageTransition>

        {/* ═══ HERO ═══ */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-grid-pattern"
            style={{ backgroundSize: '40px 40px' }}
            aria-hidden="true"
          />
          {/* Responsive Fix: use min() to prevent radial gradient causing horizontal scroll */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-radial-gold opacity-25 pointer-events-none"
            style={{ width: 'min(700px, 100vw)', height: 'min(700px, 100vw)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">

              {/* Left column */}
              <div className="md:col-span-3">

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6 sm:mb-8"
                >
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold-500/30 bg-gold-500/5 rounded-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse flex-shrink-0" aria-hidden="true" />
                      <span className="font-mono text-[10px] sm:text-xs text-gold-400 uppercase tracking-widest">
                        AI Researcher · IU Madinah
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold-500/20 bg-noir-800 rounded-sm">
                      <Award size={12} className="text-gold-400 flex-shrink-0" />
                      <span className="font-mono text-[10px] sm:text-xs text-parchment-200 uppercase tracking-widest">
                        GPA 4.23
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Name — fluid typography to avoid abrupt breakpoint jumps */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-display font-light text-parchment-100 leading-none mb-1"
                  style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)' }}
                >
                  Ali
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="font-display font-light leading-none mb-6 sm:mb-8"
                  style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)' }}
                >
                  <span className="gold-shimmer">Akarma</span>
                </motion.h1>

                {/* Typing animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="font-mono text-base md:text-lg text-parchment-300 mb-6 min-h-[28px]"
                  aria-live="polite"
                >
                  {prefersReduced ? (
                    <span className="text-gold-300">Designing Safety-Aligned Agentic Systems.</span>
                  ) : (
                    <TypeAnimation
                      sequence={[
                        'Designing Safety-Aligned Agentic Systems.',   2200,
                        'Researching Trustworthy Machine Learning.',    2200,
                        'Building AI Governance Frameworks.',           2200,
                        'Studying Failure Modes in Autonomous AI.',     2200,
                      ]}
                      wrapper="span"
                      speed={55}
                      repeat={Infinity}
                      className="text-gold-300"
                    />
                  )}
                </motion.div>

                {/* Bio */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="font-body text-parchment-300 text-base leading-relaxed max-w-xl mb-8"
                >
                  {profile.bio}
                </motion.p>

                {/* Core Research Thesis Card — Enhanced for Professionalism */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="mb-10 relative"
                >
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gold-500/40" />
                  <div className="glass-card p-6 border border-gold-500/10 bg-gold-500/[0.02]">
                    <div className="flex gap-4">
                      <Quote size={20} className="text-gold-500/40 flex-shrink-0 mt-1" />
                      <p className="font-display text-lg text-parchment-100 italic leading-relaxed">
                        I study how to make autonomous AI systems <span className="text-gold-400">fail safely</span>: designing governance architectures that prevent unintended actions before they propagate through real-world infrastructure.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-3 mb-8 sm:mb-10"
                >
                  <Link
                    href="/research"
                    className="group flex items-center gap-2 px-6 sm:px-8 py-3 bg-gold-500 text-noir-900 font-mono text-xs font-bold tracking-widest uppercase hover:bg-gold-400 transition-all min-h-[48px] shadow-lg shadow-gold-500/20"
                  >
                    View Research
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                  <div className="flex gap-2">
                    <a
                      href={profile.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Google Scholar profile (opens in new tab)"
                      className="flex items-center justify-center w-12 h-12 border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 transition-all"
                    >
                      <BookOpen size={18} aria-hidden="true" />
                    </a>
                    <a
                      href={profile.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Download CV (opens in new tab)"
                      className="flex items-center justify-center w-12 h-12 border border-parchment-300/20 text-parchment-300 hover:border-parchment-300/50 transition-all"
                    >
                      <FileText size={18} aria-hidden="true" />
                    </a>
                  </div>
                </motion.div>

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center gap-4"
                  aria-label="Social media links"
                >
                  {socialLinks.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="text-parchment-400 hover:text-gold-400 transition-all duration-200 hover:scale-110 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <span aria-hidden="true">{s.icon}</span>
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Right column — stat cards */}
              <div className="md:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="space-y-4"
                >
                  {/* Featured Research Focus Card — Premium Academic Detail */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, delay: 0.5 }}
                      className="glass-card p-6 border-gold-500/20 bg-gold-500/[0.03] mb-6"
                    >
                      <h4 className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.2em] mb-4">Current Research Frontier</h4>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                            <Star size={14} className="text-gold-400" />
                          </div>
                          <div>
                            <p className="font-display text-base text-parchment-100 leading-snug">Autonomous Safety Governance</p>
                            <p className="font-mono text-[10px] text-parchment-400 mt-1 uppercase">Safety-Critical Multi-Agent Systems</p>
                          </div>
                        </div>
                        <div className="h-px bg-gold-500/10" />
                        <p className="font-body text-xs text-parchment-300 leading-relaxed italic">
                          "Investigating cryptographic trust-anchors and constrained reasoning for large-scale agentic deployments."
                        </p>
                      </div>
                    </motion.div>

                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="glass-card p-4 flex items-center gap-4"
                    >
                      <div
                        className="w-10 h-10 border border-gold-500/25 bg-gold-500/10 flex items-center justify-center flex-shrink-0 text-gold-400"
                        aria-hidden="true"
                      >
                        {stat.icon}
                      </div>
                      {/* Responsive Fix: min-w-0 prevents flex children from overflowing on 320px */}
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-2xl text-gold-400">
                          <AnimatedCounter target={stat.value} suffix={stat.suffix} delay={0.8 + i * 0.1} />
                        </div>
                        <div className="font-mono text-xs text-parchment-100 truncate">{stat.label}</div>
                        <div className="font-mono text-xs text-parchment-400/50 truncate">{stat.sub}</div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Scholar metrics card */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="glass-card p-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={12} className="text-gold-400" aria-hidden="true" />
                      <span className="font-mono text-xs text-gold-400/70 tracking-widest uppercase">Scholar Metrics</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Citations',  value: profile.scholarMetrics.citations },
                        { label: 'h-index',    value: profile.scholarMetrics.hIndex },
                        { label: 'i10-index',  value: profile.scholarMetrics.i10Index },
                      ].map(m => (
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

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="font-mono text-xs text-parchment-400/40 tracking-widest uppercase">scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-gold-500/40 to-transparent"
            />
          </motion.div>
        </section>

        {/* ═══ RESEARCH VISION ═══ */}
        <SectionReveal>
          <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <div className="section-divider mb-16" />
            <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-start">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Research Vision</span>
                </div>
                <h2
                  className="font-display font-light text-parchment-100 leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
                >
                  Why This<br />
                  <span className="gold-text italic">Research</span><br />
                  Matters
                </h2>
              </div>
              <div className="md:col-span-3">
                <div className="relative glass-card p-6 sm:p-8 border-l-2 border-gold-500/50">
                  <Quote size={28} className="text-gold-500/20 absolute top-6 right-6" aria-hidden="true" />
                  {profile.researchVision.split('\n\n').map((para, i) => (
                    <p key={i} className={`font-body text-parchment-200 leading-relaxed text-base ${i > 0 ? 'mt-4' : ''}`}>
                      {para}
                    </p>
                  ))}
                  <div className="mt-6 pt-4 border-t border-gold-500/10 flex flex-wrap gap-2">
                    {profile.researchInterests.map(interest => (
                      <motion.span
                        key={interest}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 glass-card border border-gold-500/15"
                      >
                        <Star size={9} className="text-gold-400" fill="currentColor" aria-hidden="true" />
                        <span className="font-mono text-xs text-parchment-300">{interest}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ═══ RESEARCH GRAPH ═══ */}
        <SectionReveal>
          <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-20">
            <div className="section-divider mb-12" />
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
              <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Knowledge Graph</span>
            </div>
            <h2 className="font-display text-3xl text-parchment-100 mb-8">Research Landscape</h2>
            <div className="glass-card p-4 sm:p-6 border border-gold-500/10 overflow-hidden min-h-[400px]">
              <ErrorBoundary message="The D3 visualization failed to initialize. Please refresh the page.">
                <ResearchGraph />
              </ErrorBoundary>
            </div>
          </section>
        </SectionReveal>

        {/* ═══ RECENT PUBLICATIONS ═══ */}
        <SectionReveal>
          <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
            <div className="section-divider mb-12" />
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Latest Work</span>
                </div>
                <h2 className="font-display text-3xl text-parchment-100">Recent Publications</h2>
              </div>
              <Link
                href="/research"
                className="font-mono text-xs text-gold-400 tracking-widest uppercase hover-underline flex items-center gap-1 self-end min-h-[44px]"
              >
                All {publications.length} Papers <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-4">
              {recent.map((pub, i) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="pub-card-accent glass-card p-5 pl-7"
                >
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-3">
                    <div className="w-full sm:flex-1 sm:min-w-0">
                      <h3 className="font-display text-lg text-parchment-100 mb-1 leading-snug">{pub.title}</h3>
                      <p className="font-mono text-xs text-parchment-400 mb-2 leading-relaxed">
                        {pub.authorsStr.split(AUTHOR_REGEX).map((part, idx) => (
                          AUTHOR_REGEX.test(part)
                            ? <span key={idx} className="text-gold-400 font-semibold">{part}</span>
                            : <span key={idx}>{part}</span>
                        ))}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {pub.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag-badge">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <span className={`w-full sm:w-auto font-mono text-[10px] sm:text-xs px-2 py-1 border rounded-sm break-words ${
                      pub.status === 'published' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-700/30'
                      : pub.status === 'accepted' ? 'bg-sky-900/30 text-sky-400 border-sky-700/30'
                      : 'bg-amber-900/30 text-amber-400 border-amber-700/30'
                    }`}>
                      {pub.statusLabel}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 font-mono text-xs text-gold-400 tracking-widest uppercase hover:text-gold-300 transition-colors min-h-[44px]"
              >
                View Full Publication Archive <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </SectionReveal>

      </PageTransition>
    </>
  )
}
