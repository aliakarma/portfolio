import '../styles/globals.css'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import { Cormorant_Garamond, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ParticleField from '../components/ParticleField'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

/*
  Performance: fonts are self-hosted via next/font instead of the
  render-blocking Google Fonts stylesheet — removes two third-party
  origins from the critical path and eliminates layout shift from
  late-loading fonts (size-adjusted fallbacks are generated at build).
*/
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <style jsx global>{`
        :root {
          --font-cormorant: ${cormorant.style.fontFamily};
          --font-source: ${sourceSerif.style.fontFamily};
          --font-jetbrains: ${jetbrains.style.fontFamily};
        }
      `}</style>
      <ParticleField />
      <Navbar />
      {/*
        Performance Fix: mode="popLayout" instead of mode="wait"
        "wait" forces old page to fully exit (300ms) before new page enters,
        creating 800ms total dead time. "popLayout" allows overlap for instant feel.
      */}
      <AnimatePresence mode="popLayout" initial={false}>
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
