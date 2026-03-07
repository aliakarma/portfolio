import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, BookOpen, Copy, Check, MapPin, MessageSquare } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { profile } from '../data/profile'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2200) }
  return (
    <div className="flex items-center gap-3 glass-card p-4">
      <Mail size={18} className="text-gold-400 flex-shrink-0" />
      <span className="font-mono text-sm text-parchment-200 flex-1">{profile.email}</span>
      <button onClick={handleCopy}
        className={`flex items-center gap-1.5 font-mono text-xs px-2 py-1 border transition-all ${copied ? 'border-emerald-500/50 text-emerald-400' : 'border-parchment-400/20 text-parchment-400 hover:border-gold-500/40 hover:text-gold-400'}`}>
        {copied ? <><Check size={12}/>Copied!</> : <><Copy size={12}/>Copy</>}
      </button>
    </div>
  )
}

const socialLinks = [
  {label:'Google Scholar',sub:'Academic publications',icon:<BookOpen size={20}/>,href:profile.scholar,color:'text-blue-400'},
  {label:'GitHub',sub:'@aliakarma',icon:<Github size={20}/>,href:profile.github,color:'text-parchment-200'},
  {label:'LinkedIn',sub:'Professional network',icon:<Linkedin size={20}/>,href:profile.linkedin,color:'text-blue-400'},
]

export default function Contact() {
  const [form, setForm] = useState({name:'',email:'',subject:'',message:''})
  const [sent, setSent] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    window.open(`mailto:${profile.email}?subject=${encodeURIComponent(form.subject||'Portfolio Contact')}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`)
    setSent(true); setTimeout(() => setSent(false), 4000)
  }

  const inputClass = "w-full bg-noir-700 border border-noir-500 hover:border-gold-500/30 focus:border-gold-500/60 text-parchment-100 px-4 py-3 font-mono text-sm outline-none transition-colors placeholder-parchment-400/30"

  return (
    <>
      <Head><title>Contact — Ali Akarma</title></Head>
      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4"><div className="w-8 h-px bg-gold-500/60" /><span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Contact</span></div>
                <h1 className="font-display text-5xl md:text-7xl font-light text-parchment-100 mb-4">Get In <span className="gold-text italic">Touch</span></h1>
                <p className="font-body text-parchment-300 max-w-xl">Open to research collaborations, academic discussions, and graduate opportunities. Reach out about AI safety, agentic systems, or governance research.</p>
                <div className="section-divider mt-8" />
              </div>
            </SectionReveal>
            <div className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-2 space-y-8">
                <SectionReveal>
                  <div>
                    <h3 className="font-display text-xl text-parchment-100 mb-4">Direct Contact</h3>
                    <div className="space-y-3">
                      <CopyEmail />
                      <div className="flex items-center gap-3 glass-card p-4"><MapPin size={18} className="text-gold-400 flex-shrink-0"/><span className="font-mono text-sm text-parchment-200">Madinah, Saudi Arabia</span></div>
                    </div>
                  </div>
                </SectionReveal>
                <SectionReveal delay={0.1}>
                  <div>
                    <h3 className="font-display text-xl text-parchment-100 mb-4">Academic & Social</h3>
                    <div className="space-y-3">
                      {socialLinks.map(link => (
                        <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" whileHover={{x:4}}
                          className="flex items-center gap-4 glass-card p-4 group">
                          <div className={`${link.color} group-hover:scale-110 transition-transform`}>{link.icon}</div>
                          <div><p className="font-mono text-sm text-parchment-100">{link.label}</p><p className="font-mono text-xs text-parchment-400">{link.sub}</p></div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
                <SectionReveal delay={0.2}>
                  <div className="glass-card p-5 border border-gold-500/15">
                    <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/><span className="font-mono text-xs text-green-400 tracking-wide">Available for collaboration</span></div>
                    <p className="font-body text-sm text-parchment-300">Seeking graduate research opportunities and collaborations in AI safety, agentic systems, and trustworthy ML.</p>
                  </div>
                </SectionReveal>
              </div>
              <div className="md:col-span-3">
                <SectionReveal delay={0.1}>
                  <div className="glass-card p-8">
                    <div className="flex items-center gap-3 mb-6"><MessageSquare size={18} className="text-gold-400"/><h3 className="font-display text-xl text-parchment-100">Send a Message</h3></div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-2 block">Name</label><input type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className={inputClass}/></div>
                        <div><label className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-2 block">Email</label><input type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required className={inputClass}/></div>
                      </div>
                      <div><label className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-2 block">Subject</label><input type="text" placeholder="Research collaboration, question..." value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} className={inputClass}/></div>
                      <div><label className="font-mono text-xs text-parchment-400 tracking-widest uppercase mb-2 block">Message</label><textarea placeholder="Your message..." rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required className={`${inputClass} resize-none`}/></div>
                      <motion.button type="submit" whileHover={{scale:1.01}} whileTap={{scale:0.99}}
                        className={`w-full py-4 font-mono text-xs tracking-widest uppercase font-medium transition-all flex items-center justify-center gap-2 ${sent ? 'bg-green-600 text-white' : 'bg-gold-500 text-noir-900 hover:bg-gold-400'}`}>
                        {sent ? <><Check size={14}/>Sent — Check Your Mail App</> : 'Send Message'}
                      </motion.button>
                      <p className="font-mono text-xs text-parchment-400/40 text-center">Opens your email client with the message pre-filled.</p>
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
