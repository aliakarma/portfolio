import Head from 'next/head'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Code2, Github, ExternalLink, FileText, Database } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import { publications } from '../data/publications'

function ProjectModal({ project, onClose }) {
  const linkedPaper = project.paper ? publications.find(p => p.id === project.paper) : null
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-noir-900/85 backdrop-blur-md" onClick={onClose}>
      <motion.div initial={{scale:0.9,y:20}} animate={{scale:1,y:0}} exit={{scale:0.9,y:20}}
        onClick={e => e.stopPropagation()} className="glass-card max-w-2xl w-full p-8 border border-gold-500/20 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-parchment-400 hover:text-parchment-100 transition-colors"><X size={18} /></button>
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 border border-gold-500/30 bg-gold-500/10 flex items-center justify-center flex-shrink-0"><Code2 size={16} className="text-gold-400" /></div>
          <div><h2 className="font-display text-2xl text-parchment-100">{project.title}</h2><span className="font-mono text-xs text-gold-400/80">{project.status}</span></div>
        </div>
        <p className="font-body text-parchment-300 leading-relaxed mb-6">{project.description}</p>
        <div className="mb-6">
          <p className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-3">Technologies</p>
          <div className="flex flex-wrap gap-2">{project.technologies.map(tech => <span key={tech} className="tag-badge">{tech}</span>)}</div>
        </div>
        <div className="mb-6">
          <p className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-3">Research Themes</p>
          <div className="flex flex-wrap gap-2">{project.themes.map(t => <span key={t} className="font-mono text-xs text-parchment-300 border border-parchment-300/20 px-2 py-0.5 rounded-sm">{t}</span>)}</div>
        </div>
        {linkedPaper && (
          <div className="mb-6 p-4 border border-gold-500/20 bg-gold-500/5">
            <p className="font-mono text-xs text-gold-400/70 tracking-widest uppercase mb-2">Related Publication</p>
            <p className="font-display text-base text-parchment-200 leading-snug">{linkedPaper.title}</p>
            <p className="font-mono text-xs text-parchment-400 mt-1">{linkedPaper.statusLabel}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-gold-500/40 text-gold-400 font-mono text-xs tracking-widest uppercase hover:bg-gold-500/10 transition-all">
            <Github size={14} /> GitHub
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gold-500 text-noir-900 font-mono text-xs tracking-widest uppercase hover:bg-gold-400 transition-all">
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const featured = projects.filter(p => p.featured)
  const other = projects.filter(p => !p.featured)

  return (
    <>
      <Head><title>Projects — Ali Akarma</title></Head>
      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4"><div className="w-8 h-px bg-gold-500/60" /><span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Projects</span></div>
                <h1 className="font-display text-5xl md:text-7xl font-light text-parchment-100 mb-4">Research <span className="gold-text italic">Systems</span></h1>
                <p className="font-body text-parchment-300 max-w-2xl">Applied AI systems built at the intersection of safety, governance, and real-world deployment — each tied to peer-reviewed research.</p>
                <div className="section-divider mt-8" />
              </div>
            </SectionReveal>
            <SectionReveal>
              <h2 className="font-display text-2xl text-parchment-100 mb-6">Featured Projects</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {featured.map((project, i) => (
                  <motion.div key={project.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                    <ProjectCard project={project} onClick={() => setSelected(project)} />
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-display text-2xl text-parchment-100 mb-6">All Projects</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {other.map((project, i) => (
                  <motion.div key={project.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                    <ProjectCard project={project} onClick={() => setSelected(project)} />
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
        <AnimatePresence>
          {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      </PageTransition>
    </>
  )
}
