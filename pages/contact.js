import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, BookOpen, Copy, Check, MapPin, MessageSquare, Link2 } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { profile } from '../data/profile'

/* ─── Copy Email Button ─── */
function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* Fallback for browsers without clipboard API */
      const el = document.createElement('textarea')
      el.value = profile.email
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <div className="flex items-center gap-3 glass-card p-4">
      <Mail size={18} className="text-gold-400 flex-shrink-0" aria-hidden="true" />
      <span className="font-mono text-sm text-parchment-200 flex-1 min-w-0 truncate">
        {profile.email}
      </span>
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Email address copied' : 'Copy email address to clipboard'}
        className={`flex items-center gap-1.5 font-mono text-xs px-2 py-1 border transition-all min-h-[36px] flex-shrink-0 ${
          copied
            ? 'border-emerald-500/50 text-emerald-400'
            : 'border-parchment-400/20 text-parchment-400 hover:border-gold-500/40 hover:text-gold-400'
        }`}
      >
        {copied
          ? <><Check size={12} aria-hidden="true" /> Copied!</>
          : <><Copy size={12} aria-hidden="true" /> Copy</>
        }
      </button>
    </div>
  )
}

const socialLinks = [
  { label: 'Google Scholar', sub: 'Academic publications',  icon: <BookOpen  size={20} />, href: profile.scholar,  color: 'text-blue-400'       },
  { label: 'GitHub',         sub: '@aliakarma',             icon: <Github    size={20} />, href: profile.github,   color: 'text-parchment-200'   },
  { label: 'LinkedIn',       sub: 'Professional network',   icon: <Linkedin  size={20} />, href: profile.linkedin, color: 'text-blue-400'        },
  ...(profile.orcid ? [
    { label: 'ORCID',        sub: '0009-0002-6687-9380',    icon: <Link2     size={20} />, href: profile.orcid,    color: 'text-emerald-400'     },
  ] : []),
]

/* Shared input/textarea class */
const inputClass = "w-full bg-noir-700 border border-noir-500 hover:border-gold-500/30 focus:border-gold-500/60 text-parchment-100 px-4 py-3 font-mono text-sm outline-none transition-colors placeholder-parchment-400/30 rounded-sm"

export default function Contact() {
  const [form, setForm]         = useState({ name: '', email: '', subject: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent]         = useState(false)
  const [error, setError]       = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    setIsSending(true)

    try {
      // Transition from mailto: to real backend submission
      // Note: Replace with actual endpoint in production
      const response = await fetch(`https://formspree.io/f/${profile.email.split('@')[0]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          subject: form.subject,
          message: form.message
        })
      })

      if (response.ok) {
        setSent(true)
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Submission failed')
      }
    } catch (err) {
      console.error('Contact error:', err)
      setError(true)
    } finally {
      setIsSending(false)
      if (sent) setTimeout(() => setSent(false), 5000)
    }
  }

  return (
    <>
      <Head>
        <title>Contact — Ali Akarma</title>
        <meta name="description" content="Contact Ali Akarma for research collaboration, academic discussion, or graduate opportunities." />
      </Head>

      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* HEADER */}
            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Contact</span>
                </div>
                <h1
                  className="font-display font-light text-parchment-100 mb-4"
                  style={{ fontSize: 'clamp(2.25rem, 8vw, 4.5rem)' }}
                >
                  Get In <span className="gold-text italic">Touch</span>
                </h1>
                <p className="font-body text-parchment-300 max-w-xl">
                  Open to research collaborations, academic discussions, and graduate opportunities.
                  Reach out about AI safety, agentic systems, or governance research.
                </p>
                <div className="section-divider mt-8" />
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-5 gap-8 md:gap-12">

              {/* LEFT — contact info */}
              <div className="md:col-span-2 space-y-8">
                <SectionReveal>
                  <div>
                    <h2 className="font-display text-xl text-parchment-100 mb-4">Direct Contact</h2>
                    <div className="space-y-3">
                      <CopyEmail />
                      <div className="flex items-center gap-3 glass-card p-4">
                        <MapPin size={18} className="text-gold-400 flex-shrink-0" aria-hidden="true" />
                        <span className="font-mono text-sm text-parchment-200">Madinah, Saudi Arabia</span>
                      </div>
                    </div>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.1}>
                  <div>
                    <h2 className="font-display text-xl text-parchment-100 mb-4">Academic &amp; Social</h2>
                    <div className="space-y-3">
                      {socialLinks.map(link => (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${link.label}: ${link.sub} (opens in new tab)`}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-4 glass-card p-4 group min-h-[56px]"
                        >
                          <div className={`${link.color} group-hover:scale-110 transition-transform flex-shrink-0`} aria-hidden="true">
                            {link.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="font-mono text-sm text-parchment-100">{link.label}</p>
                            <p className="font-mono text-xs text-parchment-400 truncate">{link.sub}</p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.2}>
                  <div className="glass-card p-5 border border-gold-500/15">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" aria-hidden="true" />
                      <span className="font-mono text-xs text-green-400 tracking-wide">Available for collaboration</span>
                    </div>
                    <p className="font-body text-sm text-parchment-300">
                      Seeking graduate research opportunities and collaborations in AI safety,
                      agentic systems, and trustworthy ML.
                    </p>
                  </div>
                </SectionReveal>
              </div>

              {/* RIGHT — contact form */}
              <div className="md:col-span-3">
                <SectionReveal delay={0.1}>
                  <div className="glass-card p-5 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquare size={18} className="text-gold-400" aria-hidden="true" />
                      <h2 className="font-display text-xl text-parchment-100">Send a Message</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Accessibility Fix: proper id + htmlFor linking on all fields */}
                        <div>
                          <label htmlFor="contact-name" className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-2 block">
                            Name <span className="text-gold-400/60">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                            autoComplete="name"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-2 block">
                            Email <span className="text-gold-400/60">*</span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                            autoComplete="email"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-subject" className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-2 block">
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          name="subject"
                          placeholder="Research collaboration, question…"
                          value={form.subject}
                          onChange={e => setForm({ ...form, subject: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-2 block">
                          Message <span className="text-gold-400/60">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          placeholder="Your message…"
                          rows={5}
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          required
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSending || sent}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full py-4 font-mono text-xs tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-2 min-h-[52px] shadow-lg ${
                          sent
                            ? 'bg-emerald-600 text-white cursor-default shadow-emerald-500/20'
                            : isSending
                              ? 'bg-noir-600 text-parchment-400 cursor-wait'
                              : 'bg-gold-500 text-noir-900 hover:bg-gold-400 shadow-gold-500/20'
                        }`}
                      >
                        {isSending ? (
                          <><div className="w-4 h-4 border-2 border-parchment-400 border-t-transparent rounded-full animate-spin" aria-hidden="true" /> Sending…</>
                        ) : sent ? (
                          <><Check size={16} aria-hidden="true" /> Message Received</>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>

                      {error && (
                        <p className="font-mono text-xs text-red-400 text-center" role="alert">
                          Something went wrong. Please reach out via{' '}
                          <a href={`mailto:${profile.email}`} className="text-gold-400 underline">
                            direct email
                          </a>
                          .
                        </p>
                      )}

                      {!sent && !error && (
                        <p className="font-mono text-xs text-parchment-400/50 text-center">
                          Average response time: 24-48 hours.
                        </p>
                      )}
                    </form>
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
