import Head from 'next/head'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Award, BookOpen, Microscope, GraduationCap, Github, Linkedin, Mail, Link2, Quote } from 'lucide-react'
import Meta from '../components/Meta'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { profile } from '../data/profile'
import { publications } from '../data/publications'

export default function About() {
  const publications_count = publications.length


  const socialLinks = [
    { icon: <Github   size={16} />, href: profile.github,            label: 'GitHub' },
    { icon: <Linkedin size={16} />, href: profile.linkedin,          label: 'LinkedIn' },
    { icon: <Mail     size={16} />, href: `mailto:${profile.email}`, label: 'Email' },
    ...(profile.orcid ? [{ icon: <Link2 size={16} />, href: profile.orcid, label: 'ORCID Profile' }] : []),
  ]

  return (
    <>
      <Meta
        title="About"
        description="About Ali Akarma — AI researcher specializing in the gap between autonomous capability and institutional accountability."
        type="profile"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfilePage',
              mainEntity: { '@id': 'https://aliakarma.codes/#person' },
            }),
          }}
        />
      </Head>


      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">About</span>
                </div>
                <h1
                  className="font-display font-light text-parchment-100 mb-6"
                  style={{ fontSize: 'clamp(2.25rem, 8vw, 4.5rem)' }}
                >
                  The <span className="gold-text italic">Researcher</span>
                </h1>
                <div className="section-divider" />
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">

              {/* Sidebar */}
              <div className="md:col-span-1">
                <SectionReveal>
                  {/* Profile photo — explicit dimensions prevent CLS */}
                  <div className="relative mb-8">
                    <div className="w-48 h-48 mx-auto md:mx-0 border border-gold-500/30 bg-noir-700 flex items-center justify-center relative overflow-hidden">
                      <img
                        src="/profile.jpg"
                        alt="Ali Akarma"
                        width={192}
                        height={192}
                        className="w-48 h-48 object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      { icon: <MapPin        size={14} />, text: 'Madinah, Saudi Arabia' },
                      { icon: <GraduationCap size={14} />, text: 'Islamic University of Madinah' },
                      { icon: <BookOpen      size={14} />, text: 'Google Scholar', href: profile.scholar },
                      ...(profile.orcid ? [{ icon: <Link2 size={14} />, text: 'ORCID', href: profile.orcid }] : []),
                      { icon: <Microscope    size={14} />, text: `${publications_count} Publications` },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-parchment-300">
                        <div className="text-gold-400 flex-shrink-0 mt-0.5" aria-hidden="true">{item.icon}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs hover-underline text-gold-400 break-words"
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span className="font-mono text-xs break-words">{item.text}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Social links — 44px min touch targets */}
                  <div className="flex gap-3 mb-8 flex-wrap">
                    {socialLinks.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target={s.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="text-parchment-400 hover:text-gold-400 transition-colors p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <span aria-hidden="true">{s.icon}</span>
                      </a>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-mono text-xs text-gold-400 tracking-widest uppercase mb-4">Research Areas</h3>
                    <div className="space-y-2">
                      {profile.researchInterests.map(interest => (
                        <div key={interest} className="flex items-start gap-2 text-parchment-300">
                          <div className="w-1 h-1 rounded-full bg-gold-400 mt-2 flex-shrink-0" aria-hidden="true" />
                          <span className="font-body text-sm leading-relaxed">{interest}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              </div>

              {/* Main content */}
              <div className="md:col-span-2 space-y-12">

                <SectionReveal delay={0.1}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-4">Biography</h2>
                    <p className="font-body text-parchment-300 text-base leading-relaxed">{profile.bio}</p>
                    <p className="font-body text-parchment-300 text-base leading-relaxed mt-4">
                      Currently pursuing a B.S. in Information Technology on a merit-based fully funded scholarship,
                      Ali has authored or co-authored papers across IEEE conferences, Springer, PLOS ONE, and MDPI —
                      spanning agentic architectures, digital twins, AI governance, and safety-critical deployment.
                      His research is motivated by a conviction that powerful AI systems must be understandable,
                      governable, and safe by design.
                    </p>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.15}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Education</h2>
                    {profile.education.map(edu => (
                      <motion.div
                        key={edu.institution}
                        whileHover={{ x: 4 }}
                        className="glass-card pub-card-accent p-5 sm:p-6 pl-7 mb-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div className="min-w-0">
                            <h3 className="font-display text-xl text-parchment-100">{edu.degree}</h3>
                            <p className="font-mono text-xs text-gold-400 mt-1">{edu.institution}</p>
                            <p className="font-mono text-xs text-parchment-400">{edu.location}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Calendar size={12} className="text-parchment-400" aria-hidden="true" />
                            <span className="font-mono text-xs text-parchment-400">{edu.period}</span>
                            {edu.current && (
                              <span className="font-mono text-xs bg-green-900/30 text-green-400 border border-green-700/30 px-2 py-0.5 rounded-sm">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                        <ul className="space-y-1.5 mb-4">
                          {edu.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-parchment-300">
                              <div className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" aria-hidden="true" />
                              <span className="font-body text-sm">{d}</span>
                            </li>
                          ))}
                        </ul>
                        {edu.thesisInterest && (
                          <div className="p-3 bg-gold-500/5 border border-gold-500/10 rounded-sm">
                            <p className="font-mono text-[10px] text-gold-400 uppercase tracking-widest mb-1">Thesis Interest</p>
                            <p className="font-body text-sm text-parchment-200">{edu.thesisInterest}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.2}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Research Experience</h2>
                    {profile.experience.map(exp => (
                      <motion.div
                        key={exp.role}
                        whileHover={{ x: 4 }}
                        className="glass-card pub-card-accent p-5 sm:p-6 pl-7 mb-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div className="min-w-0">
                            <h3 className="font-display text-xl text-parchment-100">{exp.role}</h3>
                            <p className="font-mono text-xs text-gold-400 mt-1">{exp.institution}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Calendar size={12} className="text-parchment-400" aria-hidden="true" />
                            <span className="font-mono text-xs text-parchment-400">{exp.period}</span>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-parchment-300">
                              <div className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" aria-hidden="true" />
                              <span className="font-body text-sm leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.22}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Technical Methods & Expertise</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Agentic AI Systems', desc: 'Designing constrained reasoning pipelines with explicit safety guardrails and policy alignment.' },
                        { title: 'Safety Engineering', desc: 'Analyzing failure modes and edge cases in autonomous decision-making systems.' },
                        { title: 'AI Governance', desc: 'Implementing blockchain-based auditing and immutable oversight for AI agents.' },
                        { title: 'Technical Writing', desc: 'Distilling complex research into peer-reviewed publications and technical reports.' },
                      ].map((item, i) => (
                        <div key={i} className="glass-card p-5 border border-gold-500/10">
                          <h4 className="font-mono text-xs text-gold-400 uppercase tracking-widest mb-2">{item.title}</h4>
                          <p className="font-body text-sm text-parchment-300 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.25}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Awards &amp; Certifications</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {profile.awards.map((award, i) => (
                        <motion.div
                          key={award.title}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          whileHover={{ y: -2 }}
                          className="glass-card p-5"
                        >
                          <div className="flex items-start gap-3">
                            <Award size={16} className="text-gold-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <div className="min-w-0">
                              <h4 className="font-display text-base text-parchment-100 leading-snug mb-1">{award.title}</h4>
                              <p className="font-mono text-xs text-gold-400/80">{award.issuer}</p>
                              <p className="font-body text-xs text-parchment-400 mt-2 leading-relaxed">{award.description}</p>
                              <p className="font-mono text-[10px] text-parchment-400/50 mt-2">{award.year}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>


              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  )
}
