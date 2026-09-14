import { motion } from 'framer-motion'

/*
  Framer Motion's own viewport detection (whileInView + viewport.once) —
  same trigger-once / 10% threshold as before, without a second
  IntersectionObserver library in the shared bundle.
*/
export default function SectionReveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
