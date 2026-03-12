import Head from 'next/head'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Award, BookOpen, Microscope, GraduationCap, Github, Linkedin, Mail } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { profile } from '../data/profile'

export default function About() {
  return (
    <>
      <Head><title>About — Ali Akarma</title></Head>
      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4"><div className="w-8 h-px bg-gold-500/60" /><span className="font-mono text-xs text-gold-400 tracking-widest uppercase">About</span></div>
                <h1 className="font-display text-5xl md:text-7xl font-light text-parchment-100 mb-6">The <span className="gold-text italic">Researcher</span></h1>
                <div className="section-divider" />
              </div>
            </SectionReveal>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <SectionReveal>
                  <div className="relative mb-8">
                    <div className="w-48 h-48 mx-auto md:mx-0 border border-gold-500/30 bg-noir-700 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-radial-gold opacity-30" />
                      <img src="/profile.jpg" alt="Ali Akarma" className="w-48 h-48 object-cover" />
                      <div className="absolute inset-0 bg-grid-pattern opacity-50" style={{backgroundSize:'20px 20px'}} />
                    </div>
                  </div>
                  <div className="space-y-3 mb-8">
                    {[{icon:<MapPin size={14}/>,text:'Madinah, Saudi Arabia'},{icon:<GraduationCap size={14}/>,text:'Islamic University of Madinah'},{icon:<BookOpen size={14}/>,text:'Google Scholar',href:profile.scholar},{icon:<Microscope size={14}/>,text:'12 Publications'}].map((item,i) => (
                      <div key={i} className="flex items-center gap-3 text-parchment-300">
                        <div className="text-gold-400 flex-shrink-0">{item.icon}</div>
                        {item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-mono text-xs hover-underline text-gold-400">{item.text}</a> : <span className="font-mono text-xs">{item.text}</span>}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mb-8">
                    {[{icon:<Github size={16}/>,href:profile.github},{icon:<Linkedin size={16}/>,href:profile.linkedin},{icon:<Mail size={16}/>,href:`mailto:${profile.email}`}].map((s,i) => (
                      <a key={i} href={s.href} target={s.href.startsWith('mailto')?undefined:'_blank'} rel="noopener noreferrer"
                        className="text-parchment-400 hover:text-gold-400 transition-colors">{s.icon}</a>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-mono text-xs text-gold-400 tracking-widest uppercase mb-4">Research Areas</h3>
                    <div className="space-y-2">
                      {profile.researchInterests.map(interest => (
                        <div key={interest} className="flex items-start gap-2 text-parchment-300">
                          <div className="w-1 h-1 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                          <span className="font-body text-sm leading-relaxed">{interest}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              </div>
              <div className="md:col-span-2 space-y-12">
                <SectionReveal delay={0.1}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-4">Biography</h2>
                    <p className="font-body text-parchment-300 text-base leading-relaxed">{profile.bio}</p>
                    <p className="font-body text-parchment-300 text-base leading-relaxed mt-4">Currently pursuing a B.S. in Information Technology on a merit-based fully funded scholarship, Ali has authored or co-authored papers across IEEE conferences, Springer, PLOS ONE, and MDPI — spanning agentic architectures, digital twins, AI governance, and safety-critical deployment. His research is motivated by a conviction that powerful AI systems must be understandable, governable, and safe by design.</p>
                  </div>
                </SectionReveal>
                <SectionReveal delay={0.15}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Education</h2>
                    {profile.education.map(edu => (
                      <motion.div key={edu.institution} whileHover={{x:4}} className="glass-card pub-card-accent p-6 pl-7 mb-4">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-display text-xl text-parchment-100">{edu.degree}</h3>
                            <p className="font-mono text-xs text-gold-400 mt-1">{edu.institution}</p>
                            <p className="font-mono text-xs text-parchment-400">{edu.location}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={12} className="text-parchment-400" />
                            <span className="font-mono text-xs text-parchment-400">{edu.period}</span>
                            {edu.current && <span className="font-mono text-xs bg-green-900/30 text-green-400 border border-green-700/30 px-2 py-0.5 rounded-sm">Current</span>}
                          </div>
                        </div>
                        <ul className="space-y-1.5">{edu.details.map((d,i) => (
                          <li key={i} className="flex items-start gap-2 text-parchment-300"><div className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" /><span className="font-body text-sm">{d}</span></li>
                        ))}</ul>
                      </motion.div>
                    ))}
                  </div>
                </SectionReveal>
                <SectionReveal delay={0.2}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Research Experience</h2>
                    {profile.experience.map(exp => (
                      <motion.div key={exp.role} whileHover={{x:4}} className="glass-card pub-card-accent p-6 pl-7 mb-4">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div><h3 className="font-display text-xl text-parchment-100">{exp.role}</h3><p className="font-mono text-xs text-gold-400 mt-1">{exp.institution}</p></div>
                          <div className="flex items-center gap-2"><Calendar size={12} className="text-parchment-400" /><span className="font-mono text-xs text-parchment-400">{exp.period}</span></div>
                        </div>
                        <ul className="space-y-2">{exp.bullets.map((b,i) => (
                          <li key={i} className="flex items-start gap-2 text-parchment-300"><div className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" /><span className="font-body text-sm leading-relaxed">{b}</span></li>
                        ))}</ul>
                      </motion.div>
                    ))}
                  </div>
                </SectionReveal>
                <SectionReveal delay={0.25}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Awards & Certifications</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {profile.awards.map((award,i) => (
                        <motion.div key={award.title} initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.08}} whileHover={{y:-2}} className="glass-card p-5">
                          <div className="flex items-start gap-3">
                            <Award size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-display text-base text-parchment-100 leading-snug mb-1">{award.title}</h4>
                              <p className="font-mono text-xs text-gold-400/80">{award.issuer}</p>
                              <p className="font-mono text-xs text-parchment-400 mt-1">{award.year}</p>
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
