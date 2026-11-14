// data/researchThemes.js — the themes drawn in the homepage research graph.
//
// Each theme is one publication tag (see data/tags.js). Nothing else is typed
// in: paper counts, node sizes and the links between themes are computed from
// the papers at build time (researchGraph() in lib/content.js). Tag a new
// paper and its themes grow on the next build.

export const researchThemes = [
  // Research directions
  { tag: 'Agentic AI',     group: 'direction', description: 'Autonomous agents that plan, call tools, and act across multi-step tasks' },
  { tag: 'Trustworthy AI', group: 'direction', description: 'Accountability, fairness, transparency, and auditability in deployed AI' },
  { tag: 'AI V&V',         group: 'direction', description: 'Machine-checkable requirements, test traceability, and provable guarantees' },
  { tag: 'Secure AI',      group: 'direction', description: 'Attacks on AI systems and defenses against injection, tampering, and privacy leakage' },
  { tag: 'AI Governance',  group: 'direction', description: 'Human oversight, policy enforcement, and regulation-aligned controls' },
  { tag: 'AI Safety',      group: 'direction', description: 'Constraints and failure-mode analysis that keep autonomous systems within safe bounds' },

  // Methods
  { tag: 'LLMs',                   group: 'method', description: 'LLM-based orchestration with LangChain, LangGraph, and MCP' },
  { tag: 'Reinforcement Learning', group: 'method', description: 'Learned control policies under cost, safety, and feasibility constraints' },
  { tag: 'Federated Learning',     group: 'method', description: 'Training across institutions without pooling raw data' },
  { tag: 'Blockchain',             group: 'method', description: 'Tamper-evident audit trails and enforced approval steps for agent actions' },
  { tag: 'Digital Twins',          group: 'method', description: 'Continuously updated simulations that agents monitor and act through' },

  // Application domains
  { tag: 'Smart Cities',      group: 'domain', description: 'Urban infrastructure, mobility, retail, and water systems' },
  { tag: 'Assistive AI',      group: 'domain', description: 'Agentic support for people with disabilities and neurodivergence' },
  { tag: 'Cybersecurity',     group: 'domain', description: 'Intrusion detection and trust monitoring for IoT and critical infrastructure' },
  { tag: 'Disaster Response', group: 'domain', description: 'Early warning and coordinated response for wildfires and cloudbursts' },
]

export const groupColors = {
  direction: '#e8a900',
  method:    '#7dd3fc',
  domain:    '#86efac',
}
