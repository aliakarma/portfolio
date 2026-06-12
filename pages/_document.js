import { Html, Head, Main, NextScript } from 'next/document'
import { PROFILE_IMAGE_URL, SITE_NAME, SITE_SHORT_NAME, SITE_URL } from '../data/site'

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
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  "name": SITE_NAME,
                  "alternateName": SITE_SHORT_NAME,
                  "url": `${SITE_URL}/`,
                  "publisher": { "@id": `${SITE_URL}/#organization` }
                },
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  "name": SITE_NAME,
                  "url": `${SITE_URL}/`,
                  "logo": {
                    "@type": "ImageObject",
                    "url": PROFILE_IMAGE_URL
                  },
                  "image": PROFILE_IMAGE_URL,
                  "sameAs": [
                    "https://www.linkedin.com/in/aliakarma",
                    "https://github.com/aliakarma",
                    "https://scholar.google.com/citations?user=kQZZJtYAAAAJ"
                  ]
                },
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  "name": SITE_NAME,
                  "url": `${SITE_URL}/`,
                  "mainEntityOfPage": `${SITE_URL}/about/`,
                  "email": "mailto:aliakarma974@gmail.com",
                  "image": {
                    "@type": "ImageObject",
                    "url": PROFILE_IMAGE_URL
                  },
                  "jobTitle": "AI Researcher",
                  "description": "AI Researcher specializing in Agentic AI, AI Safety, and AI Governance.",
                  "sameAs": [
                    "https://www.linkedin.com/in/aliakarma",
                    "https://github.com/aliakarma",
                    "https://scholar.google.com/citations?user=kQZZJtYAAAAJ",
                    "https://orcid.org/0009-0002-6687-9380"
                  ],
                  "affiliation": {
                    "@type": "CollegeOrUniversity",
                    "name": "Islamic University of Madinah",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Madinah",
                      "addressCountry": "SA"
                    }
                  },
                  "alumniOf": {
                    "@type": "CollegeOrUniversity",
                    "name": "Islamic University of Madinah"
                  },
                  "knowsAbout": [
                    "Agentic AI",
                    "AI Safety",
                    "Trustworthy Machine Learning",
                    "Large Language Models",
                    "AI Governance",
                    "Multi-Agent Systems",
                    "Digital Twins"
                  ]
                }
              ]
            })
          }}
        />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
