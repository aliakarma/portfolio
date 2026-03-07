import Head from 'next/head'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'

const skills = {
  'AI & Machine Learning': [
    {name:'Agentic AI Systems',level:92},{name:'Large Language Models (LLMs)',level:90},{name:'AI Safety & Alignment',level:88},{name:'Adversarial ML',level:80},{name:'Multi-Agent Deep RL',level:82},{name:'Failure Mode Analysis',level:88},
  ],
  'Programming & Engineering': [
    {name:'Python',level:90},{name:'LangChain / LangGraph',level:85},{name:'PyTorch',level:75},{name:'FastAPI / REST APIs',level:72},{name:'Git & GitHub',level:88},
  ],
  'Research & Academic': [
    {name:'Academic Writing',level:92},{name:'Literature Review',level:90},{name:'Research Methodology',level:86},{name:'Critical Thinking',level:90},{name:'Technical Communication',level:88},
  ],
  'Systems & Platforms': [
    {name:'Blockchain / Smart Contracts',level:72},{name:'IoT Systems',level:68},{name:'Digital Twins',level:76},{name:'Cloud Platforms',level:65},
  ],
}

function SkillBar({name,level,delay=0}) {
  return (
    <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay,duration:0.5}} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="font-body text-sm text-parchment-200">{name}</span>
        <span className="font-mono text-xs text-gold-400/70">{level}%</span>
      </div>
      <div className="h-1 bg-noir-600 rounded-full overflow-hidden">
        <motion.div initial={{width:0}} whileInView={{width:`${level}%`}} viewport={{once:true}} transition={{delay:delay+0.2,duration:0.9,ease:'easeOut'}}
          className="h-full rounded-full" style={{background:'linear-gradient(90deg,#c98a00,#f4c040)'}} />
      </div>
    </motion.div>
  )
}

function RadarChart({data}) {
  const N=data.length, cx=150, cy=150, r=105
  const angles=data.map((_,i)=>(i/N)*Math.PI*2-Math.PI/2)
  const pt=(angle,rad)=>({x:cx+rad*Math.cos(angle),y:cy+rad*Math.sin(angle)})
  const poly=data.map((d,i)=>pt(angles[i],(d.level/100)*r))
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto">
      {[0.25,0.5,0.75,1].map(l=><polygon key={l} points={angles.map(a=>pt(a,l*r)).map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke="rgba(232,169,0,0.1)" strokeWidth="1"/>)}
      {angles.map((a,i)=>{const p=pt(a,r);return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(232,169,0,0.12)" strokeWidth="1"/>})}
      <polygon points={poly.map(p=>`${p.x},${p.y}`).join(' ')} fill="rgba(232,169,0,0.1)" stroke="rgba(244,192,64,0.7)" strokeWidth="1.5"/>
      {poly.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3" fill="#f4c040"/>)}
      {data.map((d,i)=>{const lp=pt(angles[i],r+22);return<text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fill="rgba(237,229,208,0.65)" fontFamily="JetBrains Mono,monospace">{d.name.length>14?d.name.slice(0,12)+'…':d.name}</text>})}
    </svg>
  )
}

const clusters = ['LLM Prompting','Agentic Pipeline Design','Safety Constraints','Python','Failure Mode Analysis','AI Governance','Academic Writing','Multi-Agent RL','Blockchain','Digital Twins','LangChain','PyTorch','Adversarial AI','Constitutional AI','Critical Thinking','IoT Security','Smart Cities']
const clusterSizes = ['text-base','text-lg','text-xl','text-2xl','text-lg','text-xl','text-2xl','text-base','text-base','text-lg','text-lg','text-base','text-lg','text-sm','text-xl','text-sm','text-lg']

export default function Skills() {
  return (
    <>
      <Head><title>Skills — Ali Akarma</title></Head>
      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4"><div className="w-8 h-px bg-gold-500/60" /><span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Skills</span></div>
                <h1 className="font-display text-5xl md:text-7xl font-light text-parchment-100 mb-4">Technical <span className="gold-text italic">Expertise</span></h1>
                <div className="section-divider mt-8" />
              </div>
            </SectionReveal>
            <div className="grid md:grid-cols-5 gap-12 mb-16">
              <SectionReveal className="md:col-span-2">
                <div className="glass-card p-6">
                  <h3 className="font-mono text-xs text-gold-400 tracking-widest uppercase mb-6 text-center">AI Competency Radar</h3>
                  <RadarChart data={skills['AI & Machine Learning']} />
                  <p className="font-mono text-xs text-parchment-400/40 text-center mt-4">Self-assessed proficiency</p>
                </div>
              </SectionReveal>
              <div className="md:col-span-3 space-y-6">
                {Object.entries(skills).map(([cat,catSkills],ci) => (
                  <SectionReveal key={cat} delay={ci*0.1}>
                    <div className="glass-card p-6">
                      <h3 className="font-display text-lg text-parchment-100 mb-5">{cat}</h3>
                      {catSkills.map((s,i) => <SkillBar key={s.name} name={s.name} level={s.level} delay={ci*0.1+i*0.05} />)}
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
            <SectionReveal>
              <div className="section-divider mb-12" />
              <h2 className="font-display text-2xl text-parchment-100 mb-8">Skill Clusters</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {clusters.map((item,i) => (
                  <motion.span key={item} initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.04}}
                    whileHover={{scale:1.05}} className={`font-display ${clusterSizes[i]} text-parchment-300 hover:text-gold-400 cursor-default transition-colors duration-200 px-2`}>{item}</motion.span>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </PageTransition>
    </>
  )
}
