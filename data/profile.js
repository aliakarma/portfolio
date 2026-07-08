import scholarData from './scholar.json'

export const profile = {
  name: "Ali Akarma",
  title: "AI Researcher",
  tagline: "Designing autonomous AI systems that fail safely by design.",
  institution: "Islamic University of Madinah",
  location: "Madinah, Saudi Arabia",
  degree: "B.S. Information Technology (2023–2027)",
  email: "aliakarma974@gmail.com",
  github: "https://github.com/aliakarma",
  scholar: "https://scholar.google.com/citations?user=kQZZJtYAAAAJ&hl=en",
  linkedin: "https://www.linkedin.com/in/aliakarma",
  // Fix: ORCID added — important credibility signal for academic visitors
  orcid: "https://orcid.org/0009-0002-6687-9380",
  cv: "/Ali_Akarma_CV.pdf",

  bio: "I build agentic AI systems that know their own limits. My work focuses on the gap between autonomous capability and institutional accountability — designing architectures where AI agents can be stopped, audited, and corrected when they behave unexpectedly. I'm a 3rd-year IT student at the Islamic University of Madinah and have published 15 peer-reviewed papers on AI governance, adversarial robustness, and constrained multi-agent systems.",

  researchVision: `I study how to make autonomous AI systems fail safely: designing governance architectures that prevent unintended actions before they propagate through real-world infrastructure. 

My work addresses the alignment problem in deployed agentic systems — exploring how we can build autonomous pipelines that remain safe and governable when exposed to adversarial inputs, distributional shift, or misaligned incentives. I approach this through the intersection of safety engineering, formal governance frameworks, and empirical failure-mode analysis.`,

  researchInterests: [
    "Agentic AI & Autonomous Systems in High-Stakes Environments",
    "AI Safety & Alignment of Large Language Models",
    "Prompt Injection, Jailbreaks & Adversarial Misuse",
    "Governance, Oversight & Constitutional AI",
    "Secure AI for Cybersecurity & Critical Infrastructure",
    "Digital Twins & Smart City AI",
  ],

  // Scholar metrics (automated via scripts/update_scholar.js)
  scholarMetrics: {
    citations: scholarData.citations,
    hIndex: scholarData.hIndex,
    i10Index: scholarData.i10Index,
    since: 2025,
    lastUpdated: scholarData.lastUpdated,
  },

  education: [
    {
      degree: "B.S. Information Technology",
      institution: "Islamic University of Madinah",
      location: "Saudi Arabia",
      period: "2023 – 2027",
      details: [
        "Merit-based fully funded scholarship (Competitive selection)",
        "Current Cumulative GPA: 4.29 / 5.00",
        "Undergraduate researcher in agentic AI systems and AI governance",
      ],
      thesisInterest: "Safety-aligned multi-agent orchestration under Byzantine constraints.",
      current: true,
    },
  ],

  experience: [
    {
      role: "Undergraduate AI Researcher",
      institution: "Islamic University of Madinah",
      period: "Jan 2025 – Present",
      bullets: [
        "Designed agentic AI systems with explicit safety constraints, restricted action spaces, and policy-aligned decision rules.",
        "Conducted failure-mode and misuse analyses for autonomous systems, focusing on adversarial inputs, unintended behaviors, and oversight gaps.",
        "Explored LLM-based components within agentic pipelines: prompt design, orchestration, and robustness considerations.",
        "Investigated governance mechanisms for preventing unsafe behaviors triggered by untrusted or adversarial data sources.",
        "Analyzed system trustworthiness in scenarios analogous to log analysis, automated triage, and decision support pipelines.",
      ],
    },
  ],

  awards: [
    {
      title: "Merit-Based Fully Funded Bachelor's Scholarship",
      issuer: "Islamic University of Madinah",
      year: 2023,
      description: "Awarded for exceptional academic performance and potential in computer science and information technology.",
    },
    {
      title: "Certificate of Appreciation (Research Excellence)",
      issuer: "ICETAS 2026",
      year: 2026,
      description: "Recognized for high-quality research contribution and presentation on Agentic AI Governance.",
    },
    {
      title: "Mindware: Critical Thinking",
      issuer: "University of Michigan (Coursera)",
      year: 2024,
      description: "Advanced certification in cognitive biases, statistical reasoning, and scientific methodology.",
    },
    {
      title: "Computational Thinking",
      issuer: "University of Michigan (Coursera)",
      year: 2024,
      description: "Formal training in algorithmic problem-solving and abstraction techniques.",
    },
  ],

  volunteer: [
    {
      role: "Volunteer",
      institution: "Masjid Al Nabawi, Madinah",
      period: "2024 & 2025",
      bullets: [
        "Supported public-service operations in a large, high-traffic institutional environment.",
        "Assisted visitors and contributed to orderly, inclusive, and reliable service delivery.",
      ],
    },
  ],
}
