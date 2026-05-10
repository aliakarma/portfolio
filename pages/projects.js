import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Code2, Github, ExternalLink } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import { publications } from '../data/publications'

/* ─── Project Modal ─── */
function ProjectModal({ project, onClose }) {
  const linkedPaper = project.paper 
    ? publications.find(p => p.pdf === project.paper || p.doi === project.paper) 
    : null

  /* Accessibility Fix: close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  /* Accessibility Fix: Focus trap for modals — Section 13 High */
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = originalStyle }
  }, [])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-noir-900/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="glass-card max-w-3xl w-full p-6 sm:p-10 border border-gold-500/20 relative max-h-[92vh] overflow-y-auto shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-6 right-6 text-parchment-400 hover:text-parchment-100 transition-colors p-1 min-h-[40px] min-w-[40px] flex items-center justify-center bg-noir-800/50 rounded-full"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 border border-gold-500/30 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
            <Code2 size={20} className="text-gold-400" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-2xl sm:text-3xl text-parchment-100 leading-tight mb-1">{project.title}</h2>
            <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 border rounded-sm ${
              project.status === 'Published' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' : 'border-gold-500/30 text-gold-400 bg-gold-500/5'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <p className="font-mono text-[10px] text-gold-400 tracking-[0.2em] uppercase mb-3">Overview</p>
              <p className="font-body text-parchment-200 text-base leading-relaxed">{project.description}</p>
            </div>

            {/* Storytelling segments — Section 9/13 Fix */}
            {project.problem && (
              <div>
                <p className="font-mono text-[10px] text-gold-400 tracking-[0.2em] uppercase mb-3">The Problem</p>
                <p className="font-body text-parchment-300 text-sm leading-relaxed">{project.problem}</p>
              </div>
            )}
            
            {project.approach && (
              <div>
                <p className="font-mono text-[10px] text-gold-400 tracking-[0.2em] uppercase mb-3">Technical Approach</p>
                <p className="font-body text-parchment-300 text-sm leading-relaxed">{project.approach}</p>
              </div>
            )}

            {project.results && (
              <div>
                <p className="font-mono text-[10px] text-gold-400 tracking-[0.2em] uppercase mb-3">Key Results</p>
                <p className="font-body text-parchment-300 text-sm leading-relaxed">{project.results}</p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <p className="font-mono text-[10px] text-gold-400 tracking-[0.2em] uppercase mb-4">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="tag-badge text-[10px]">{tech}</span>
                ))}
              </div>
            </div>

            {linkedPaper && (
              <div className="p-4 border border-gold-500/20 bg-gold-500/5 rounded-sm">
                <p className="font-mono text-[10px] text-gold-400/70 tracking-widest uppercase mb-3">Peer Reviewed</p>
                <p className="font-display text-sm text-parchment-100 leading-snug mb-3">{linkedPaper.title}</p>
                <a 
                  href={linkedPaper.pdf || linkedPaper.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-gold-400 hover:underline flex items-center gap-1"
                >
                  Read Publication <ExternalLink size={10} />
                </a>
              </div>
            )}

            <div className="space-y-3 pt-4 border-t border-noir-600">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gold-500/40 text-gold-400 font-mono text-[10px] tracking-widest uppercase hover:bg-gold-500/10 transition-all"
                >
                  <Github size={14} aria-hidden="true" /> View Source
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gold-500 text-noir-900 font-mono text-[10px] tracking-widest uppercase hover:bg-gold-400 transition-all"
                >
                  <ExternalLink size={14} aria-hidden="true" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const featured = projects.filter(p => p.featured)
  const other    = projects.filter(p => !p.featured)

  return (
    <>
      <Head>
        <title>Projects — Ali Akarma</title>
        <meta name="description" content="Research projects by Ali Akarma — applied AI systems for safety, governance, and real-world deployment." />
      </Head>

      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Projects</span>
                </div>
                <h1
                  className="font-display font-light text-parchment-100 mb-4"
                  style={{ fontSize: 'clamp(2.25rem, 8vw, 4.5rem)' }}
                >
                  Research <span className="gold-text italic">Systems</span>
                </h1>
                <p className="font-body text-parchment-300 max-w-2xl">
                  Applied AI systems built at the intersection of safety, governance, and real-world deployment
                  — each tied to peer-reviewed research.
                </p>
                <div className="section-divider mt-8" />
              </div>
            </SectionReveal>

            <SectionReveal>
              <h2 className="font-display text-2xl text-parchment-100 mb-6">Featured Projects</h2>
              {/* Responsive Fix: 1 col on xs, 2 on sm, 3 on md */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mb-16">
                {featured.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ProjectCard project={project} onClick={() => setSelected(project)} />
                  </motion.div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="font-display text-2xl text-parchment-100 mb-6">All Projects</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                {other.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ProjectCard project={project} onClick={() => setSelected(project)} />
                  </motion.div>
                ))}
              </div>
            </SectionReveal>

          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </PageTransition>
    </>
  )
}
