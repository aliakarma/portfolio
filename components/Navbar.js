import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'News',     href: '/news' },
  { label: 'Research', href: '/research' },
  { label: 'Projects', href: '/projects' },
  { label: 'Notes',    href: '/blog' },
  { label: 'Contact',  href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [imgError, setImgError]       = useState(false)
  const [navHeight, setNavHeight]     = useState(64)   // Responsive Fix: track real nav height
  const navRef                        = useRef(null)
  const router                        = useRouter()

  /* Track scroll for backdrop blur */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false) }, [router.pathname])

  /*
    Responsive Fix: measure the actual navbar height so the mobile dropdown
    can be positioned exactly below it — avoids the hardcoded top-[60px] bug
    where the menu overlaps or leaves a gap depending on scroll state.
  */
  useEffect(() => {
    if (!navRef.current) return
    const ro = new ResizeObserver(entries => {
      if (entries[0]) setNavHeight(entries[0].contentRect.height)
    })
    ro.observe(navRef.current)
    return () => ro.disconnect()
  }, [])

  /* Close mobile menu on Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && mobileOpen) setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        ref={navRef}
        role="navigation"
        aria-label="Primary navigation"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-noir-900/92 backdrop-blur-md border-b border-gold-500/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Go to home page">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 border border-gold-500/40 bg-gold-500/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                {imgError ? (
                  <span className="font-display text-gold-400 text-base font-bold" aria-hidden="true">A</span>
                ) : (
                  <img
                    src="/profile.jpg"
                    alt="Ali Akarma"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
              <span className="font-display text-parchment-100 text-lg font-medium tracking-wide">
                Ali <span className="text-gold-400">Akarma</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5" role="list">
            {navLinks.map((link) => {
              const active = router.pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  role="listitem"
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3 py-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 hover-underline ${
                    active ? 'text-gold-400 nav-active' : 'text-parchment-300 hover:text-parchment-100'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-gold-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
            <a
              href="/Ali_Akarma_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV (opens in new tab)"
              className="ml-3 flex items-center gap-1.5 px-4 py-1.5 border border-gold-500/40 text-gold-400 font-mono text-xs tracking-widest uppercase hover:bg-gold-500/10 transition-all rounded-sm"
            >
              <FileText size={11} aria-hidden="true" /> CV
            </a>
          </div>

          {/* Mobile hamburger — min 44px touch target */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-parchment-200 hover:text-gold-400 transition-colors p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown — positioned exactly below the navbar using measured height */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ top: navHeight }}   /* Responsive Fix: dynamic positioning */
            className="fixed left-0 right-0 z-40 bg-noir-800/97 backdrop-blur-md border-b border-gold-500/10 overflow-hidden"
          >
            <div className="flex flex-col px-4 sm:px-6 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={router.pathname === link.href ? 'page' : undefined}
                  className={`py-3 font-mono text-xs tracking-widest uppercase border-b border-noir-600/50 min-h-[44px] flex items-center ${
                    router.pathname === link.href ? 'text-gold-400' : 'text-parchment-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/Ali_Akarma_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download CV (opens in new tab)"
                className="py-3 font-mono text-xs tracking-widest uppercase text-gold-400 flex items-center gap-2 min-h-[44px]"
              >
                <FileText size={11} aria-hidden="true" /> Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
