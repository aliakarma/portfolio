import Link from 'next/link'
import { Github, Linkedin, Mail, BookOpen } from 'lucide-react'
import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gold-500/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl text-parchment-100">Ali <span className="text-gold-400">Akarma</span></h3>
            <p className="font-mono text-xs text-parchment-400 mt-1 tracking-wide">AI Researcher · Islamic University of Madinah</p>
          </div>
          <div className="flex items-center gap-5">
            {[{icon:<BookOpen size={18}/>,href:profile.scholar,label:'Scholar'},{icon:<Github size={18}/>,href:profile.github,label:'GitHub'},{icon:<Linkedin size={18}/>,href:profile.linkedin,label:'LinkedIn'},{icon:<Mail size={18}/>,href:`mailto:${profile.email}`,label:'Email'}].map(s => (
              <a key={s.label} href={s.href} target={s.href.startsWith('mailto')?undefined:'_blank'} rel="noopener noreferrer" aria-label={s.label}
                className="text-parchment-400 hover:text-gold-400 transition-colors">{s.icon}</a>
            ))}
          </div>
          <div className="font-mono text-xs text-parchment-400 text-center md:text-right">
            <p>© {year} Ali Akarma</p>
            <p className="mt-1 opacity-60">Next.js · TailwindCSS · Framer Motion</p>
          </div>
        </div>
        <div className="section-divider mt-8" />
        <p className="text-center font-mono text-xs text-parchment-400/30 mt-4">Madinah, Saudi Arabia</p>
      </div>
    </footer>
  )
}
