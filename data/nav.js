// data/nav.js — every page of the site, in menu order.
//
// The navbar, the footer and the "Explore" cards at the end of each page all
// read this list, so a page added here shows up in all three places.
// `countKey` names a value from siteCounts() in lib/content.js; the card
// shows that live number. (scripts/generate_sitemap.js keeps its own route
// list because it runs outside Next.js; add new pages there too.)

export const PAGES = [
  { href: '/', label: 'Home' },
  {
    href: '/research/', label: 'Research', title: 'Publications',
    blurb: 'Every paper with its abstract, BibTeX, code, and data.',
    countKey: 'papers', unit: 'papers',
  },
  {
    href: '/projects/', label: 'Projects', title: 'Research Systems',
    blurb: 'Open-source code and testbeds behind the papers.',
    countKey: 'projects', unit: 'systems',
  },
  {
    href: '/blog/', label: 'Notes', title: 'Research Notes',
    blurb: 'Plain-language summaries of each paper.',
    countKey: 'notes', unit: 'notes',
  },
  {
    href: '/news/', label: 'News', title: 'News',
    blurb: 'Papers, preprints, and milestones by date.',
    countKey: 'news', unit: 'updates',
  },
  { href: '/about/', label: 'About', title: 'About', blurb: 'Background, research experience, and awards.' },
  { href: '/contact/', label: 'Contact', title: 'Contact', blurb: 'Collaboration and graduate-study enquiries.' },
]
