import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="font-display font-light text-gold-500/10 leading-none select-none"
            aria-hidden="true"
            style={{ fontSize: 'clamp(6rem, 25vw, 12rem)' }}
          >
            404
          </p>
          <h1 className="font-display text-3xl text-parchment-100 -mt-4 sm:-mt-8 mb-4">
            Page Not Found
          </h1>
          <p className="font-body text-parchment-400 mb-8">
            This page doesn't exist in the research archive.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-noir-900 font-mono text-xs tracking-widest uppercase hover:bg-gold-400 transition-all min-h-[44px]"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
