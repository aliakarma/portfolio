import scholarData from './scholar.json'

/*
  Every sentence that describes the research lives here, and every page reads
  it from here: hero, about, meta descriptions, structured data, footer.
  Change the wording once and the whole site follows. Counts (papers, notes,
  systems) are never typed in; they are computed from the data files.
*/
export const profile = {
  name: "Ali Akarma",
  title: "AI Researcher",
  // Used in page titles and search snippets.
  headline: "Agentic AI, Trustworthy AI & AI V&V Researcher",
  institution: "Islamic University of Madinah",
  location: "Madinah, Saudi Arabia",
  degree: "B.S. Information Technology (2023–2027)",
  email: "aliakarma974@gmail.com",
  github: "https://github.com/aliakarma",
  scholar: "https://scholar.google.com/citations?user=kQZZJtYAAAAJ&hl=en",
  linkedin: "https://www.linkedin.com/in/aliakarma",
  orcid: "https://orcid.org/0009-0002-6687-9380",
  cv: "/Ali_Akarma_CV.pdf",

  // One sentence for meta descriptions and schema.org "description".
  summary: "AI researcher working on agentic AI, trustworthy AI, AI verification and validation (V&V), and secure AI.",

  // Pull quote on the homepage.
  thesis: "I study what it takes to trust an autonomous AI system: stating what it must and must not do, testing that it does so, and building the controls that stop it when it does not.",

  // Takes live counts so the numbers can never go stale.
  bio: ({ published, underReview }) =>
    `I build and test agentic AI systems that can be checked, secured, and held to account. My recent work covers machine-readable verification and validation (V&V) specifications, governance controls for multi-agent systems, and attacks on and defenses for the machine learning that autonomous systems depend on. I am a final-year Information Technology student at the Islamic University of Madinah and a research intern at KFUPM, with ${published} peer-reviewed publications and ${underReview} more manuscripts under review.`,

  researchVision: `Agentic AI systems now plan, call tools, and act on real infrastructure with little human review. My research asks what evidence we should require before trusting such a system, and how to keep that trust once it is deployed.

I work on this from three directions. Verification and validation: turning high-level requirements into machine-checkable specifications and linking them to the tests that run, as in VNVSpec. Secure AI: measuring how agentic and federated systems leak data or can be manipulated, and testing defenses against those attacks. Accountable autonomy: building human-authorization gates, tamper-evident audit trails, and constrained policies into the agent's control loop rather than adding them afterwards.`,

  // `label` is the full name; `short` is used where space is tight.
  researchInterests: [
    { label: "Agentic AI & Multi-Agent Systems",                        short: "Agentic AI" },
    { label: "Trustworthy & Accountable AI",                            short: "Trustworthy AI" },
    { label: "AI Verification & Validation (V&V)",                      short: "AI V&V" },
    { label: "Secure AI: Prompt Injection, Privacy & Adversarial Attacks", short: "Secure AI" },
    { label: "AI Governance & Human Oversight",                         short: "AI Governance" },
    { label: "Safe Autonomy & Constrained Decision-Making",             short: "Safe Autonomy" },
  ],

  // Rotating line under the name in the homepage hero.
  heroLines: [
    "Verifying agentic AI systems.",
    "Securing autonomous AI pipelines.",
    "Building accountable multi-agent systems.",
    "Testing AI against its requirements.",
  ],

  // "Current research" card in the homepage hero.
  currentFocus: {
    title: "Verifiable Agentic AI",
    subtitle: "AI V&V · Governance controls · Secure agents",
    text: "Extending machine-readable V&V specifications to agentic systems, with typed controls for prompt security, tool authorization, memory leakage, human oversight, and multi-agent coordination.",
  },

  // Collaboration call-to-action (homepage banner and contact page).
  collaboration: "Open to research collaborations and graduate opportunities in agentic AI, AI verification and validation, and secure, trustworthy AI.",

  // "Methods & Expertise" cards on the About page.
  expertise: [
    { title: "Agentic AI Systems", desc: "Multi-agent pipelines built with LangChain, LangGraph, and MCP, designed with restricted action spaces and explicit policy checks." },
    { title: "AI Verification & Validation", desc: "Machine-readable requirements, traceability from requirements to tests, and evidence reports for AI-enabled systems." },
    { title: "Secure & Private ML", desc: "Threat modelling, prompt-injection defenses, and privacy attacks and defenses for federated learning." },
    { title: "Governance & Accountability", desc: "Human-authorization gates, permissioned-blockchain audit trails, and fairness and privacy metrics mapped to regulatory requirements." },
  ],

  // Scholar metrics (automated via scripts/update_scholar.js)
  scholarMetrics: {
    citations: scholarData.citations,
    hIndex: scholarData.hIndex,
    i10Index: scholarData.i10Index,
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
        "Current Cumulative GPA: 4.31 / 5.00",
        "Undergraduate researcher in agentic AI, AI verification and validation, and secure AI",
      ],
      thesisInterest: "Verification and governance of multi-agent AI systems under adversarial conditions.",
      current: true,
    },
  ],

  experience: [
    {
      role: "Research Intern",
      institution: "King Fahd University of Petroleum and Minerals (KFUPM)",
      period: "Jun 2026 – Present",
      bullets: [
        "Developing and evaluating HiVA, a value-aware hierarchical multi-agent RL system for wildfire suppression using Cell2Fire, with robustness testing across 16 distribution-shift conditions, including California↔Saudi transfer, rotated wind, ignition, and asset-layout changes.",
        "Contributing to the agentic extension of VNVspec, a machine-readable AI V&V framework, by developing typed governance controls for prompt security, tool authorization, memory leakage, human oversight, and multi-agent coordination.",
      ],
    },
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
    {
      role: "Summer Intern",
      institution: "Xgrid.co",
      location: "Lahore, Punjab, Pakistan (Hybrid)",
      period: "Jun 2026 – Jul 2026",
      bullets: [
        "Developed a governance-aware autonomous Canary Deployment Simulator in Python for staged, cross-region software rollouts, integrating deployment orchestration, health analysis, rollback, and operational safety controls.",
        "Implemented automated failure detection and rollback workflows, including configuration-drift validation, forced/manual rollback, failure injection, and recovery handling for degraded deployments.",
        "Designed thread-safe deployment coordination with synchronized cluster state, asynchronous abort handling, idempotent rollback protection, and concurrency-safe audit logging.",
        "Built a governance and approval layer capable of blocking unsafe deployment transitions, enforcing risk-based policies, and requiring simulated human approval at critical rollout stages.",
        "Implemented operational resilience features including point-in-time cluster snapshots, region quarantine, staged recovery planning, deterministic event replay, causal audit tracing, and observability metrics.",
        "Developed automated testing and CI/CD quality controls covering unit, integration, stress, formatting, linting, coverage, and release validation workflows.",
        "Applied systematic code review and stress testing to identify and resolve concurrency, rollback consistency, and event-lineage issues in the deployment system.",
      ],
    },
    {
      role: "Research Intern",
      institution: "IEEE EMBS E-JUST SBC",
      period: "May 2026 – Jul 2026",
      bullets: [
        "Engineered biomedical image processing pipelines for automated feature extraction, noise reduction, and enhancement in diagnostic imaging datasets.",
        "Implemented deep learning architectures for image segmentation and classification, optimizing preprocessing workflows to improve model reliability.",
      ],
    },
  ],

  awards: [
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
    {
      title: "Merit-Based Fully Funded Bachelor's Scholarship",
      issuer: "Islamic University of Madinah",
      year: 2023,
      description: "Awarded for exceptional academic performance and potential in computer science and information technology.",
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
