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
            {socialLinks.map(s => {
              const isExternal = s.href.startsWith('http')
              const linkClass = "text-parchment-400 hover:text-gold-400 transition-colors p-1 min-h-[36px] min-w-[36px] flex items-center justify-center"
              return isExternal ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={linkClass}
                >
                  <span aria-hidden="true">{s.icon}</span>
                </a>
              ) : (
                <Link key={s.label} href={s.href} aria-label={s.label} className={linkClass}>
                  <span aria-hidden="true">{s.icon}</span>
                </Link>
              )
            })}
          </nav>

          <div className="font-mono text-xs text-parchment-400 text-center md:text-right">
            <p>© {year} Ali Akarma</p>
            <p className="mt-1 opacity-60">Next.js · TailwindCSS · Framer Motion</p>
          </div>
        </div>

        {/* Site directory navigation for users and search engine crawlers */}
        <nav aria-label="Footer navigation" className="my-8 pt-8 border-t border-gold-500/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Link href="/" className="font-mono text-xs uppercase tracking-widest text-parchment-300 hover:text-gold-400 transition-colors">
            Home
          </Link>
          <Link href="/about/" className="font-mono text-xs uppercase tracking-widest text-parchment-300 hover:text-gold-400 transition-colors">
            About
          </Link>
          <Link href="/research/" className="font-mono text-xs uppercase tracking-widest text-parchment-300 hover:text-gold-400 transition-colors">
            Research Archive
          </Link>
          <Link href="/projects/" className="font-mono text-xs uppercase tracking-widest text-parchment-300 hover:text-gold-400 transition-colors">
            Research Systems
          </Link>
          <Link href="/blog/" className="font-mono text-xs uppercase tracking-widest text-parchment-300 hover:text-gold-400 transition-colors">
            Research Notes
          </Link>
          <Link href="/news/" className="font-mono text-xs uppercase tracking-widest text-parchment-300 hover:text-gold-400 transition-colors">
            News Feed
          </Link>
          <Link href="/contact/" className="font-mono text-xs uppercase tracking-widest text-parchment-300 hover:text-gold-400 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="section-divider mt-4" />
        <p className="text-center font-mono text-xs text-parchment-400/60 mt-4">Madinah, Saudi Arabia</p>
      </div>
    </footer>
  )
}
