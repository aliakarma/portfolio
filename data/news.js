// data/news.js — milestones that are NOT papers.
//
// Every paper in data/publications.js and data/underReview.js appears in the
// news feed automatically (see newsItems() in lib/content.js). Add only other
// events here: internships, talks, awards, preprint releases.
//
// Fields: id (unique), date ("Month D, YYYY"), title,
//         venue (optional), publicationId (optional: links the item to a paper).

export const newsEvents = [
  {
    id: 'kfupm-internship',
    date: 'June 1, 2026',
    title: 'Started a research internship at King Fahd University of Petroleum and Minerals (KFUPM)',
  },
  {
    id: 'climate-preprint',
    date: 'April 27, 2026',
    title: 'Preprint released: Agentic AI for Climate-Resilient Cities: A PRISMA-Guided Review and Digital Twin Framework',
    venue: 'Preprints.org',
    publicationId: 16,
  },
]
