// data/underReview.js
// Dedicated file for manuscripts currently under peer review.

export const underReviewPublications = [
  {
    id: 101,
    title: "Integrating High-Level Requirements to Low-Level Tests with Machine-Readable V&V Specifications",
    authors: ["Mansur Arief, Nur Ahmad Khatim, Ali Akarma, Ahmad Alfan Alfian Irfan"],
    authorsStr: "Mansur Arief, Nur Ahmad Khatim, Ali Akarma, Ahmad Alfan Alfian Irfan",
    venue: "Under Review · 2027 IEEE/SICE International Symposium on System Integration (SII 2027)",
    venueShort: "IEEE/SICE SII (Under Review)",
    type: "conference",
    year: 2027,
    status: "under_review",
    statusLabel: "Under Review · IEEE/SICE SII 2027",
    tags: ["AI Safety", "AI Governance", "Architecture", "Agentic AI"],
    doi: "https://doi.org/10.48550/arXiv.2607.17686",
    pdf: "https://arxiv.org/pdf/2607.17686",
    code: "https://github.com/ai-vnv/vnvspec",
    dataset: null,
    notebook: null,
    graphicalAbstract: "/graphical-abstracts/VNVSpec.png",
    abstract: "Modern software teams have mature tools for low-level testing, such as pytest, JUnit, and Jest, which make it inexpensive to write unit tests and run them on every commit. Systems engineering, in parallel, has developed rigorous principles for design verification and validation (V&V), which has worked very well across engineering discipline to align user expecations and requirements with developers' deliverables. In practice, however, the two rarely connect, and the link between users' high-level requirements and the low-level tests that machines actually run is maintained by hand, if at all. This gap is increasingly costly for AI-enabled and cyber-physical systems, for which regulators now ask for traceable evidence that high-level requirements are met, while raw test results provide little of the structure such evidence requires. We introduce VNVSpec, an open-source framework that makes V&V specifications machine-readable and executable. With this framework, users state high-level requirements directly or import them from catalogs derived from published standards. Then, the framework checks requirement quality, supports decomposition into module-level requirements with explicit metrics and acceptance criteria, links these requirements to test results through a traceability graph, and compiles the collected evidence into verdicts and audit-ready reports. We evaluate the framework by self-application, in which it is continuously assessed in CI against its own specification of 36 requirements verified by 449 tests, completed within limited time which scales linearly and thus can handle up to 10,000 requirements. We also discuss how the framework extends to testing black-box AI models and AI coding agents. The framework, its full test suite, the catalogs, and the benchmark scripts are available at https://github.com/ai-vnv/vnvspec.",
    bibtex: `@article{arief2026vnvspec,
  title={Integrating High-Level Requirements to Low-Level Tests with Machine-Readable V&V Specifications},
  author={Arief, Mansur and Khatim, Nur Ahmad and Akarma, Ali and Irfan, Ahmad Alfan Alfian},
  journal={arXiv preprint arXiv:2607.17686},
  year={2026},
  doi={10.48550/arXiv.2607.17686},
  note={Under review at the 2027 IEEE/SICE International Symposium on System Integration (SII 2027)}
}`,
  },

]
