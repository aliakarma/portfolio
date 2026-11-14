import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Newspaper, Calendar } from 'lucide-react'
import Meta from '../components/Meta'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { SITE_URL } from '../data/site'
import { jsonLd } from '../lib/jsonld'
import { profile } from '../data/profile'
import { siteCounts, newsItems } from '../lib/content'

/*
  The feed is built in lib/content.js: every paper appears automatically, and
  non-paper milestones come from data/news.js.
*/
export async function getStaticProps() {
  return { props: { counts: siteCounts(), news: newsItems() } }
}

export default function News({ news: sortedNews }) {

  const NEWS_JSONLD = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `News & Research Milestones | ${profile.name}`,
    url: `${SITE_URL}/news/`,
    description: `Papers, preprints, and research milestones by ${profile.name}, newest first.`,
    numberOfItems: sortedNews.length,
    itemListElement: sortedNews.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Article',
        headline: item.title,
        datePublished: new Date(item.date).toISOString().slice(0, 10),
        ...(item.href ? { url: `${SITE_URL}${item.href}` } : {}),
        author: {
          '@type': 'Person',
          name: profile.name,
          url: `${SITE_URL}/`,
        },
      },
    })),
  }

  return (
    <>
      <Meta
        title="News & Updates"
        description={`Papers, preprints, and research milestones by ${profile.name} in agentic AI, trustworthy AI, AI verification and validation, and secure AI.`}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(NEWS_JSONLD) }}
        />
      </Head>

      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            {/* HEADER */}
            <SectionReveal>
              <div className="mb-14">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Updates</span>
                </div>
                <h1
                  className="font-display font-light text-parchment-100 mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  Latest <span className="gold-text italic">News</span>
                </h1>
                <p className="font-body text-parchment-300 max-w-2xl mb-8">
                  Papers, preprints, and other milestones, newest first. Select a paper to open it in the publication archive.
                </p>
                <div className="section-divider" />
              </div>
            </SectionReveal>

            {/* NEWS LIST */}
            <SectionReveal>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-8">
                  <Newspaper size={16} className="text-gold-400" aria-hidden="true" />
                  <h2 className="font-display text-2xl text-parchment-100">News Feed</h2>
                </div>

                <div className="relative border-l border-gold-500/20 ml-3 sm:ml-4 space-y-10 pb-4">
                  {sortedNews.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="relative pl-6 sm:pl-8"
                    >
                      {/* Timeline dot */}
                      <span
                        className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold-500 ring-4 ring-noir-900"
                        aria-hidden="true"
                      />

                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 mb-1">
                        <div className="flex items-center gap-1.5 text-gold-400 font-mono text-xs whitespace-nowrap mt-1">
                          <Calendar size={12} />
                          <span>{item.date}</span>
                        </div>
                        <h3 className="font-display text-lg text-parchment-100 leading-snug flex-1">
                          {item.href
                            ? <Link href={item.href} className="hover:text-gold-300 transition-colors">{item.title}</Link>
                            : item.title}
                          {item.venue && (
                            <span className="text-gold-400 font-mono text-sm sm:text-base"> — {item.venue}</span>
                          )}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {sortedNews.length === 0 && (
                  <div className="text-center py-20 text-parchment-400 font-mono text-sm" role="status">
                    No news items yet.
                  </div>
                )}
              </div>
            </SectionReveal>

          </div>
        </div>
      </PageTransition>
    </>
  )
}
