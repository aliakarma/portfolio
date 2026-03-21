import '../styles/globals.css'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ParticleField from '../components/ParticleField'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
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
