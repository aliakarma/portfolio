import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Ali Akarma — AI Researcher specializing in Agentic AI, AI Safety, and Trustworthy Machine Learning at the Islamic University of Madinah." />
        <meta name="keywords" content="Ali Akarma, AI Research, Agentic AI, AI Safety, LLMs, Machine Learning, Islamic University of Madinah" />
        <meta property="og:title" content="Ali Akarma — AI Researcher" />
        <meta property="og:description" content="Agentic AI · AI Safety · Trustworthy ML" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
