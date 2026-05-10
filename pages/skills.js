import Head from 'next/head'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'

const skills = {
  'AI & Machine Learning': [
    { name: 'Agentic AI Systems',          level: 'Expert' },
    { name: 'Large Language Models (LLMs)', level: 'Expert' },
    { name: 'AI Safety & Alignment',        level: 'Proficient' },
    { name: 'Adversarial ML',               level: 'Proficient' },
    { name: 'Multi-Agent Systems',          level: 'Proficient' },
    { name: 'Failure Mode Analysis',        level: 'Proficient' },
  ],
  'Programming & Engineering': [
    { name: 'Python',                level: 'Expert' },
    { name: 'LangChain / LangGraph', level: 'Proficient' },
    { name: 'PyTorch',               level: 'Comfortable' },
    { name: 'FastAPI / REST APIs',   level: 'Comfortable' },
    { name: 'Git & GitHub',          level: 'Proficient' },
  ],
  'Research & Academic': [
    { name: 'Academic Writing',         level: 'Expert' },
    { name: 'Literature Review',        level: 'Expert' },
    { name: 'Research Methodology',     level: 'Proficient' },
    { name: 'Critical Thinking',        level: 'Expert' },
    { name: 'Technical Communication',  level: 'Expert' },
  ],
  'Systems & Governance': [
    { name: 'Blockchain (Ethereum/Fabric)', level: 'Comfortable' },
    { name: 'IoT & Edge Intelligence',      level: 'Comfortable' },
    { name: 'Digital Twins',                level: 'Comfortable' },
    { name: 'Cloud Infrastructure',         level: 'Familiar' },
  ],
}

const LEVEL_MAP = {
  'Expert':      95,
  'Proficient':  82,
  'Comfortable': 68,
  'Familiar':    50,
}

/* ─── Skill Row ─── */
function SkillRow({ name, level, delay = 0 }) {
  const levelColor = {
    'Expert':      'text-gold-400 border-gold-500/30 bg-gold-500/10',
    'Proficient':  'text-parchment-200 border-parchment-400/20 bg-parchment-400/5',
    'Comfortable': 'text-parchment-300 border-parchment-400/10',
    'Familiar':    'text-parchment-400 border-parchment-400/5',
  }[level]

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center justify-between py-3 border-b border-noir-600/50 last:border-0"
    >
      <span className="font-body text-sm text-parchment-200">{name}</span>
      <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 border ${levelColor} rounded-sm`}>
        {level}
      </span>
    </motion.div>
  )
}

/* ─── Radar Chart ─── */
function RadarChart({ data }) {
  const N      = data.length
  const cx     = 150
  const cy     = 150
  const r      = 85  // Reduced radius to give labels more space
  const angles = data.map((_, i) => (i / N) * Math.PI * 2 - Math.PI / 2)
  const pt     = (angle, rad) => ({ x: cx + rad * Math.cos(angle), y: cy + rad * Math.sin(angle) })
  const poly   = data.map((d, i) => pt(angles[i], (LEVEL_MAP[d.level] / 100) * r))

  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full max-w-xs mx-auto"
      role="img"
      aria-labelledby="radar-title"
    >
      <title id="radar-title">
        AI competency radar chart showing proficiency levels:
        {data.map(d => ` ${d.name} (${d.level})`).join(',')}
      </title>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map(l => (
        <polygon
          key={l}
          points={angles.map(a => pt(a, l * r)).map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="rgba(232,169,0,0.1)"
          strokeWidth="1"
          aria-hidden="true"
        />
      ))}

      {/* Axis lines */}
      {angles.map((a, i) => {
        const p = pt(a, r)
        return (
          <line
            key={i}
            x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke="rgba(232,169,0,0.12)"
            strokeWidth="1"
            aria-hidden="true"
          />
        )
      })}

      {/* Data polygon */}
      <polygon
        points={poly.map(p => `${p.x},${p.y}`).join(' ')}
        fill="rgba(232,169,0,0.12)"
        stroke="rgba(244,192,64,0.8)"
        strokeWidth="1.5"
        aria-hidden="true"
      />

      {/* Axis labels */}
      {data.map((d, i) => {
        const angle = angles[i]
        const lp = pt(angle, r + 28)
        
        // Multi-line label support for longer strings
        const words = d.name.split(' ')
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="rgba(237,229,208,0.7)"
            fontFamily="JetBrains Mono, monospace"
            aria-hidden="true"
          >
            {words.length > 2 ? (
              <>
                <tspan x={lp.x} dy="-0.6em">{words.slice(0, 2).join(' ')}</tspan>
                <tspan x={lp.x} dy="1.2em">{words.slice(2).join(' ')}</tspan>
              </>
            ) : d.name}
          </text>
        )
      })}
    </svg>
  )
}

const clusters = [
  'LLM Prompting', 'Agentic Pipeline Design', 'Safety Constraints', 'Python',
  'Failure Mode Analysis', 'AI Governance', 'Academic Writing', 'Multi-Agent RL',
  'Blockchain', 'Digital Twins', 'LangChain', 'PyTorch', 'Adversarial AI',
  'Constitutional AI', 'Critical Thinking', 'IoT Security', 'Smart Cities',
]

const clusterSizes = [
  'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-lg', 'text-xl',
  'text-2xl', 'text-base', 'text-base', 'text-lg', 'text-lg', 'text-base',
  'text-lg', 'text-sm', 'text-xl', 'text-sm', 'text-lg',
]

export default function Skills() {
  return (
    <>
      <Head>
        <title>Skills — Ali Akarma</title>
        <meta name="description" content="Technical skills and expertise of Ali Akarma — AI researcher specializing in agentic AI, safety, and governance." />
      </Head>

      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold-500/60" aria-hidden="true" />
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Skills</span>
                </div>
                <h1
                  className="font-display font-light text-parchment-100 mb-4"
                  style={{ fontSize: 'clamp(2.25rem, 8vw, 4.5rem)' }}
                >
                  Technical <span className="gold-text italic">Expertise</span>
                </h1>
                <div className="section-divider mt-8" />
              </div>
            </SectionReveal>

            {/* Responsive Fix: grid stacks to single column on mobile */}
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 mb-16">

              <SectionReveal className="md:col-span-2">
                <div className="glass-card p-5 sm:p-6">
                  <h2 className="font-mono text-xs text-gold-400 tracking-widest uppercase mb-6 text-center">
                    AI Competency Radar
                  </h2>
                  <RadarChart data={skills['AI & Machine Learning']} />
                  <p className="font-mono text-xs text-parchment-400/50 text-center mt-4">
                    Self-assessed proficiency levels
                  </p>
                </div>
              </SectionReveal>

              <div className="md:col-span-3 space-y-6">
                {Object.entries(skills).map(([cat, catSkills], ci) => (
                  <SectionReveal key={cat} delay={ci * 0.1}>
                    <div className="glass-card p-5 sm:p-6 h-full flex flex-col">
                      <h2 className="font-display text-lg text-parchment-100 mb-4 border-b border-gold-500/10 pb-3">{cat}</h2>
                      <div className="flex-1">
                        {catSkills.map((s, i) => (
                          <SkillRow key={s.name} name={s.name} level={s.level} delay={ci * 0.1 + i * 0.05} />
                        ))}
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>

            {/* Research Methods & Frameworks */}
            <SectionReveal>
              <div className="section-divider mb-12" />
              <h2 className="font-display text-2xl text-parchment-100 mb-8">Research Methods & Frameworks</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Agentic Workflows', items: ['LangGraph', 'AutoGPT', 'ReAct'] },
                  { label: 'Safety Analysis', items: ['Failure Modes', 'Jailbreaking', 'Robustness'] },
                  { label: 'Governance', items: ['Blockchain', 'Constitutional AI', 'Audit Logs'] },
                  { label: 'Evaluation', items: ['Human-in-loop', 'Benchmarking', 'Red Teaming'] },
                ].map((group, i) => (
                  <div key={i} className="p-4 border border-gold-500/5 bg-gold-500/[0.02]">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-500/60 mb-3">{group.label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(item => (
                        <span key={item} className="font-body text-sm text-parchment-300">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

          </div>
        </div>
      </PageTransition>
    </>
  )
}
