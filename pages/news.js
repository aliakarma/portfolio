import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, Calendar } from 'lucide-react'
import Meta from '../components/Meta'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'

// Edit your future news items here!
// Each item only requires id, date, and title.
const newsData = [
  {
    id: 16,
    date: 'July 20, 2026',
    title: 'New paper: Integrating High-Level Requirements to Low-Level Tests with Machine-Readable V&V Specifications — APSEC 2026',
  },
  {
    id: 15,
    date: 'June 1, 2026',
    title: 'Started Internship at King Fahd University of Petroleum and Minerals (KFUPM)',
  },
  {
    id: 14,
    date: 'July 17, 2026',
    title: 'New paper: Agentic AI-enhanced digital twins for Smart City civil infrastructure: A secure, autonomous and auditable management framework — PLoS One',
  },
  {
    id: 13,
    date: 'June 30, 2026',
    title: 'New paper: ADAPT: An Agentic AI Framework for People with Disabilities and Neurodivergence — Journal of Disability Research',
  },
  {
    id: 12,
    date: 'June 26, 2026',
    title: 'New paper: FedAgent-Chain: A Secure Federated and Agentic AI Framework for Multilingual Disability-Inclusive Employment in AI Cities — MDPI Smart Cities',
  },
  {
    id: 11,
    date: 'April 27, 2026',
    title: 'New paper: Agentic AI for Climate-Resilient Cities: A PRISMA-Guided Review and Digital Twin Framework — MDPI Sustainability',
  },
  {
    id: 10,
    date: 'April 26, 2026',
    title: 'New paper: Autonomous Traffic Signal Optimization Using Digital Twin and Agentic AI for Real-Time Decision-Making to Uphold Roadway Efficiency — MECON 2026',
  },
  {
    id: 9,
    date: 'April 5, 2026',
    title: 'New paper: Governance-Constrained Agentic AI: Blockchain-Enforced Human Oversight for Safety-Critical Wildfire Monitoring — ICETAS 2026',
  },
  {
    id: 8,
    date: 'April 5, 2026',
    title: 'New paper: Agents for Agents: An Interrogator-Based Secure Framework for Autonomous Internet of Underwater Things — ICETAS 2026',
  },
  {
    id: 7,
    date: 'June 6, 2026',
    title: 'New paper: FinNutriAgent (FNA): An Agentic AI for Budget and Nutrition Planning — ETASR',
  },
  {
    id: 6,
    date: 'April 13, 2026',
    title: 'New paper: Use of AI Tools: Guidelines to Maintain Academic Integrity — Springer',
  },
  {
    id: 5,
    date: 'December 22, 2025',
    title: 'New paper: FinAgent: Agentic AI for Personal Finance & Nutrition — IEEE ICCA',
  },
  {
    id: 4,
    date: 'December 22, 2025',
    title: 'New paper: Blockchain-Monitored Agentic AI Architecture for Trusted Perception–Reasoning–Action Pipelines — IEEE ICCA',
  },
  {
    id: 3,
    date: 'November 27, 2025',
    title: 'New paper: Agentic AI Framework for Individuals with Disabilities and Neurodivergence: A Multi-Agent System for Healthy Eating, Daily Routines, and Inclusive Well-Being — ICBDT',
  },
  {
    id: 2,
    date: 'November 28, 2025',
    title: 'New paper: Agentic AI for Smart Inventory Replenishment — ICBDT',
  },
  {
    id: 1,
    date: 'November 27, 2025',
    title: 'New paper: Agentic AI Framework for Cloudburst Prediction and Coordinated Response — ICBDT',
  },
]

export default function News() {
  const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Meta
        title="News & Updates"
        description="Latest news and updates by Ali Akarma."
      />

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
                  Chronological updates on my research and other activities.
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
                          {(() => {
                            const dashIndex = item.title.indexOf(' — ') !== -1 
                              ? item.title.indexOf(' — ') 
                              : item.title.indexOf('—');
                            
                            if (dashIndex !== -1) {
                              const mainText = item.title.substring(0, dashIndex);
                              const isSpaced = item.title.substring(dashIndex, dashIndex + 3) === ' — ';
                              const venueText = item.title.substring(dashIndex + (isSpaced ? 3 : 1));
                              
                              return (
                                <>
                                  {mainText}{' '}
                                  <span className="text-gold-400 font-mono text-sm sm:text-base">
                                    — {venueText.trim()}
                                  </span>
                                </>
                              );
                            }
                            return item.title;
                          })()}
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
