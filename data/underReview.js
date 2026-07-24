// data/underReview.js
// Dedicated file for manuscripts currently under peer review.

export const underReviewPublications = [
  {
    id: 101,
    title: "EAGF: A Four-Pillar Ethical AI Governance Framework for Trustworthy Cybersecurity in 5G Renewable Energy IoT Systems",
    authors: ["Salman Jan, Ali Akarma, Toqeer Ali Syed, Munir Azam Muhammad, Shahid Kamal"],
    authorsStr: "Salman Jan, Ali Akarma, Toqeer Ali Syed, Munir Azam Muhammad, Shahid Kamal",
    venue: "Under Review · Nature Scientific Reports",
    venueShort: "Scientific Reports (Under Review)",
    type: "journal",
    year: 2026,
    status: "under_review",
    statusLabel: "Under Review · Scientific Reports",
    tags: ["AI Governance", "Cybersecurity", "IoT", "AI Safety", "Ethics"],
    doi: null,
    pdf: null,
    code: "https://github.com/aliakarma/eagf",
    dataset: null,
    notebook: null,
    abstract: "AI-driven anomaly detectors in 5G renewable energy IoT and industrial systems lack unified governance: they operate opaquely, exhibit protocol-class bias, and expose training data to inference attacks. This paper presents the Ethical AI Governance Framework (EAGF), which maps four EU AI Act pillars: transparency, fairness, privacy, and accountability to computable engineering metrics that are jointly governed within one training-and-deployment lifecycle: fairness and privacy are co-optimized via a Pareto-guided multi-objective procedure with domain-adaptive fairness loss selection, transparency is structurally controlled through clarity-triggered pruning, and accountability is audited post hoc, with all four scores aggregated into a composite Trust Index (TI). Evaluated across two domains: on a biometric task (10,021 images, ten seeds), EAGF raises TI by +38.97% (0.565 → 0.785), improves recall parity by +15.1%, and enhances privacy by +18.8%; on the real-world Edge-IIoTset intrusion-detection benchmark (157,800 samples, five seeds), EAGF achieves +69.3% TI gain (0.358 → 0.606) and +56.4% FPR parity improvement, with only +0.2 ms forward-pass inference overhead. Joint multi-pillar governance substantially outperforms model-level-only approaches across both domains; the accountability infrastructure contributes a large and explicitly quantified fraction of total TI gains, underscoring that governance readiness requires both algorithmic and operational investments.",
    bibtex: `@article{jan2026eagf,
  title={EAGF: A Four-Pillar Ethical AI Governance Framework for Trustworthy Cybersecurity in 5G Renewable Energy IoT Systems},
  author={Jan, Salman and Akarma, Ali and Syed, Toqeer Ali and Muhammad, Munir Azam and Kamal, Shahid},
  journal={Under Review at Scientific Reports},
  year={2026}
}`,
  },

]
