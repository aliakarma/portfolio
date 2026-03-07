import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Research', href: '/research' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills',   href: '/skills' },
  { label: 'Writing',  href: '/blog' },
  { label: 'Contact',  href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [router.pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-noir-900/92 backdrop-blur-md border-b border-gold-500/10 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 border border-gold-500/40 bg-gold-500/10 flex items-center justify-center">
                <span className="font-display text-gold-400 text-sm font-bold">A</span>
              </div>
              <span className="font-display text-parchment-100 text-lg font-medium tracking-wide">
                Ali <span className="text-gold-400">Akarma</span>
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = router.pathname === link.href
              return (
                <Link key={link.href} href={link.href}
                  className={`relative px-3 py-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 hover-underline ${active ? 'text-gold-400 nav-active' : 'text-parchment-300 hover:text-parchment-100'}`}
                >
                  {link.label}
                  {active && (
                    <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-px bg-gold-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                  )}
                </Link>
              )
            })}
            <a href="/Ali_Akarma_CV.pdf" target="_blank" rel="noopener noreferrer"
              className="ml-3 flex items-center gap-1.5 px-4 py-1.5 border border-gold-500/40 text-gold-400 font-mono text-xs tracking-widest uppercase hover:bg-gold-500/10 transition-all rounded-sm">
              <FileText size={11} /> CV
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-parchment-200 hover:text-gold-400 transition-colors">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-noir-800/97 backdrop-blur-md border-b border-gold-500/10">
            <div className="flex flex-col px-6 py-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`py-3 font-mono text-xs tracking-widest uppercase border-b border-noir-600/50 ${router.pathname === link.href ? 'text-gold-400' : 'text-parchment-300'}`}>
                  {link.label}
                </Link>
              ))}
              <a href="/Ali_Akarma_CV.pdf" target="_blank" rel="noopener noreferrer"
                className="py-3 font-mono text-xs tracking-widest uppercase text-gold-400 flex items-center gap-2">
                <FileText size={11} /> Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
