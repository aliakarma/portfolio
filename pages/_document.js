import { Html, Head, Main, NextScript } from 'next/document'
import { PROFILE_IMAGE_URL, SITE_NAME, SITE_SHORT_NAME, SITE_URL } from '../data/site'
import { jsonLd } from '../lib/jsonld'
import { profile } from '../data/profile'

const sameAs = [profile.linkedin, profile.github, profile.scholar, profile.orcid].filter(Boolean)

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="google0403a632ca2d950b" />
        <meta
          name="keywords"
          content={[profile.name, ...profile.researchInterests.map(i => i.short), profile.institution].join(', ')}
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
            __html: jsonLd({
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
                  "sameAs": sameAs
                },
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  "name": SITE_NAME,
                  "url": `${SITE_URL}/`,
                  "mainEntityOfPage": `${SITE_URL}/about/`,
                  "email": `mailto:${profile.email}`,
                  "image": {
                    "@type": "ImageObject",
                    "url": PROFILE_IMAGE_URL
                  },
                  "jobTitle": profile.title,
                  "description": profile.summary,
                  "sameAs": sameAs,
                  "affiliation": {
                    "@type": "CollegeOrUniversity",
                    "name": profile.institution,
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Madinah",
                      "addressCountry": "SA"
                    }
                  },
                  "knowsAbout": profile.researchInterests.map(i => i.label)
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
