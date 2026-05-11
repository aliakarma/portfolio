import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="Ali Akarma, AI Research, Agentic AI, AI Safety, LLMs, Machine Learning, Islamic University of Madinah"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#08080f" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ali Akarma",
              "url": "https://aliakarma.codes",
              "image": "https://aliakarma.codes/og-image.png",
              "jobTitle": "AI Researcher",
              "description": "AI Researcher specializing in Agentic AI and AI Safety.",
              "sameAs": [
                "https://www.linkedin.com/in/aliakarma",
                "https://github.com/aliakarma",
                "https://scholar.google.com/citations?user=kQZZJtYAAAAJ"
              ],
              "affiliation": {
                "@type": "Organization",
                "name": "Islamic University of Madinah"
              },
              "knowsAbout": [
                "Agentic AI",
                "AI Safety",
                "Trustworthy Machine Learning",
                "Large Language Models",
                "AI Governance"
              ]
            })
          }}
        />

        {/* Performance Fix: preconnect for DNS before font requests */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/*
          Performance Fix: fonts loaded as <link> tags (non-blocking) instead of
          CSS @import (render-blocking). Saves 200–400ms on first paint.
          display=swap prevents invisible text during font load.
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,300;1,8..60,400&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
