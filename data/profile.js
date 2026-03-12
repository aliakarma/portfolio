// data/profile.js — All personal and academic identity info

export const profile = {
  name: "Ali Akarma",
  title: "AI Researcher",
  tagline: "Agentic AI · AI Safety · Trustworthy ML",
  institution: "Islamic University of Madinah",
  location: "Madinah, Saudi Arabia",
  degree: "B.S. Information Technology (2023–2027)",
  email: "aliakarma974@gmail.com",
  github: "https://github.com/aliakarma",
  scholar: "https://scholar.google.com/citations?user=kQZZJtYAAAAJ&hl=en",
  linkedin: "https://www.linkedin.com/in/aliakarma",
  cv: "/Ali_Akarma_CV.pdf",

  bio: "AI researcher focused on trustworthy and safety-aligned agentic systems, with peer-reviewed publications spanning AI architectures, governance, and real-world deployment contexts. Experienced in designing constrained agent pipelines, analyzing failure modes, and studying robustness in high-stakes environments. Preparing for graduate research in reliable machine learning systems.",

  researchVision: `My research explores the design of trustworthy agentic AI systems capable of autonomously managing complex digital infrastructure while maintaining transparency, accountability, and governance. I investigate architectures combining agent-based intelligence, blockchain monitoring, and digital twins to enable secure and explainable AI-driven decision-making — particularly in critical domains such as smart cities, healthcare, and renewable energy infrastructure.

A central concern of my work is the alignment problem in deployed agentic systems: how can we build autonomous pipelines that remain safe and governable when exposed to adversarial inputs, distributional shift, or misaligned incentives? I approach this through the intersection of safety engineering, formal governance frameworks, and empirical failure-mode analysis.`,

  researchInterests: [
    "Agentic AI & Autonomous Systems in High-Stakes Environments",
    "AI Safety & Alignment of Large Language Models",
    "Prompt Injection, Jailbreaks & Adversarial Misuse",
    "Governance, Oversight & Constitutional AI",
    "Secure AI for Cybersecurity & Critical Infrastructure",
    "Digital Twins & Smart City AI",
  ],

  // Scholar metrics (static — update when data is available)
  scholarMetrics: {
    citations: 16,
    hIndex: 3,
    i10Index: 0,
    since: 2025,
  },

  education: [
    {
      degree: "B.S. Information Technology",
      institution: "Islamic University of Madinah",
      location: "Saudi Arabia",
      period: "2023 – 2027",
      details: [
        "Merit-based fully funded scholarship",
        "Undergraduate researcher in agentic AI systems and AI governance",
      ],
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
    },
    {
      title: "Certificate of Appreciation",
      issuer: "ICBDT 2025",
      year: 2025,
    },
    {
      title: "Mindware: Critical Thinking",
      issuer: "University of Michigan",
      year: 2024,
    },
    {
      title: "Computational Thinking",
      issuer: "University of Michigan",
      year: 2024,
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
