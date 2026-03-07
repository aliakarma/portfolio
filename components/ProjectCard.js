import { motion } from 'framer-motion'
import { Code2, ExternalLink, Github } from 'lucide-react'

const STATUS_COLORS = {
  'Published':    'text-emerald-400 bg-emerald-900/20 border-emerald-700/30',
  'Accepted':     'text-sky-400 bg-sky-900/20 border-sky-700/30',
  'Under Review': 'text-amber-400 bg-amber-900/20 border-amber-700/30',
  'Research':     'text-violet-400 bg-violet-900/20 border-violet-700/30',
}

export default function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(232,169,0,0.08)' }}
      transition={{ duration: 0.2 }}
      className="glass-card p-6 cursor-pointer group relative overflow-hidden h-full flex flex-col"
      onClick={onClick}
    >
      {/* Hover glow */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gold-500/5 rounded-full -translate-y-14 translate-x-14 group-hover:scale-[2.5] transition-transform duration-500 pointer-events-none" />

      <div className="relative flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-9 h-9 border border-gold-500/20 bg-gold-500/5 flex items-center justify-center group-hover:border-gold-500/50 transition-colors">
            <Code2 size={15} className="text-gold-400/60 group-hover:text-gold-400 transition-colors" />
          </div>
          <span className={`font-mono text-xs px-2 py-0.5 border rounded-sm ${STATUS_COLORS[project.status] || 'text-parchment-400 border-parchment-400/20'}`}>
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl text-parchment-100 mb-2 leading-snug group-hover:text-gold-200 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-parchment-400 leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-badge">{tag}</span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="font-mono text-xs text-parchment-400/50 border border-parchment-400/10 px-1.5 py-0.5 rounded-sm">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-xs text-parchment-400/30">+{project.technologies.length - 4}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-noir-600/50">
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-parchment-400/50 hover:text-gold-400 transition-colors"
              >
                <Github size={14} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-parchment-400/50 hover:text-gold-400 transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          <span className="font-mono text-xs text-gold-400/40 group-hover:text-gold-400/70 transition-colors">
            Details →
          </span>
        </div>
      </div>
    </motion.div>
  )
}
