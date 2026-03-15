import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ParticleField from '../components/ParticleField'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <ParticleField />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
