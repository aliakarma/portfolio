import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ParticleField from '../components/ParticleField'

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <ParticleField />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
      <Footer />
    </>
  )
}
