import Link from 'next/link'
import { Github, Linkedin, Mail, BookOpen, Link2 } from 'lucide-react'
import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  const socialLinks = [
    { icon: <BookOpen size={18} />, href: profile.scholar,  label: 'Google Scholar Profile' },
    { icon: <Github   size={18} />, href: profile.github,   label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: profile.linkedin, label: 'LinkedIn' },
    { icon: <Mail     size={18} />, href: '/contact',           label: 'Contact' },
    ...(profile.orcid ? [{ icon: <Link2 size={18} />, href: profile.orcid, label: 'ORCID Profile' }] : []),
  ]

  return (
    <footer className="border-t border-gold-500/10 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-center md:text-left">
            <h3 className="font-display text-xl text-parchment-100">
              Ali <span className="text-gold-400">Akarma</span>
            </h3>
            <p className="font-mono text-xs text-parchment-400 mt-1 tracking-wide">
              AI Researcher · Islamic University of Madinah
            </p>
          </div>

          <nav aria-label="Social media links" className="flex items-center gap-5">
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-parchment-400 hover:text-gold-400 transition-colors p-1 min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <span aria-hidden="true">{s.icon}</span>
              </a>
            ))}
          </nav>

          <div className="font-mono text-xs text-parchment-400 text-center md:text-right">
            <p>© {year} Ali Akarma</p>
            <p className="mt-1 opacity-60">Next.js · TailwindCSS · Framer Motion</p>
          </div>
        </div>

        <div className="section-divider mt-8" />
        <p className="text-center font-mono text-xs text-parchment-400/60 mt-4">Madinah, Saudi Arabia</p>
      </div>
    </footer>
  )
}
