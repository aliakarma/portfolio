/*
  Everything the site derives from the data files: counts, the news feed, the
  research graph, and the links between papers, notes and projects.

  Import this from getStaticProps only. It pulls in every data file, which
  would bloat a page's browser bundle if a component imported it directly.
*/
import { blogPosts } from '../data/blog'
import { projects } from '../data/projects'
import { newsEvents } from '../data/news'
import { researchThemes } from '../data/researchThemes'
import { validateContent } from './validateContent'
import {
  publications, underReviewPublications, allPublications,
  byNewest, statusLabel, pubHref, STATUS_LABELS,
} from './publications'

// A bad data edit stops `npm run dev` / `npm run build` here with a list of what to fix.
validateContent()

const pubById = new Map(allPublications.map(p => [p.id, p]))
export const findPublication = (id) => pubById.get(id) ?? null

/* ─── News: one item per paper, plus the hand-written events ─── */
const newsVerb = (p) =>
  p.status === 'under_review' ? 'Preprint released'
  : p.type === 'book_chapter' ? 'New book chapter'
  : p.status === 'accepted' ? 'Paper accepted'
  : 'New paper'

export function newsItems() {
  const fromPapers = allPublications.map(p => ({
    id: `pub-${p.id}`,
    date: p.date,
    title: `${newsVerb(p)}: ${p.title}`,
    venue: p.venueShort,
    href: pubHref(p.id),
  }))
  const events = newsEvents.map(e => ({
    id: e.id,
    date: e.date,
    title: e.title,
    venue: e.venue ?? null,
    href: e.publicationId != null ? pubHref(e.publicationId) : null,
  }))
  return [...fromPapers, ...events].sort((a, b) => new Date(b.date) - new Date(a.date))
}

/* ─── Counts shown on cards, buttons and headings ─── */
export function siteCounts() {
  return {
    published: publications.length,
    underReview: underReviewPublications.length,
    papers: allPublications.length,
    projects: projects.length,
    notes: blogPosts.length,
    news: newsItems().length,
  }
}

/* Distinct venues of one type, most recent first. Confirmed venues only. */
export const venuesByType = (type) => [
  ...new Set([...publications].sort(byNewest).filter(p => p.type === type).map(p => p.venueShort)),
]

/* Small, serialisable summary of a paper for lists outside the archive. */
export const paperSummary = (p) => ({
  id: p.id, title: p.title, authorsStr: p.authorsStr, tags: p.tags,
  status: p.status, label: statusLabel(p), href: pubHref(p.id),
})

/* ─── Cross-links ─── */
// paper id → note id, so a publication card can link to its research note
export const noteIdsByPaper = () =>
  Object.fromEntries(blogPosts.filter(n => n.publicationId != null).map(n => [n.publicationId, n.id]))

// note id → { label, href } of its paper
export const papersByNote = () => Object.fromEntries(
  blogPosts
    .filter(n => findPublication(n.publicationId))
    .map(n => {
      const p = findPublication(n.publicationId)
      return [n.id, { label: statusLabel(p), href: pubHref(p.id) }]
    })
)

/* Projects with status and paper link taken from the linked publication. */
export const resolvedProjects = () => projects.map(pr => {
  const paper = findPublication(pr.publicationId)
  return {
    ...pr,
    status: paper ? STATUS_LABELS[paper.status] : pr.status,
    paper: paper ? { title: paper.title, href: pubHref(paper.id) } : null,
  }
})

/*
  Research graph. A node is a theme from data/researchThemes.js, sized by how
  many papers carry its tag. Two themes are linked when at least two papers
  carry both tags; the link is thicker the more papers they share.
*/
export function researchGraph() {
  const themed = researchThemes.map(t => ({
    ...t,
    paperIds: allPublications.filter(p => p.tags.includes(t.tag)).map(p => p.id),
  })).filter(t => t.paperIds.length > 0)

  const edges = []
  themed.forEach((a, i) => themed.slice(i + 1).forEach(b => {
    const shared = a.paperIds.filter(id => b.paperIds.includes(id)).length
    if (shared >= 2) edges.push({ source: a.tag, target: b.tag, shared })
  }))

  return {
    nodes: themed.map(t => ({ id: t.tag, group: t.group, description: t.description, count: t.paperIds.length })),
    edges,
    paperCount: allPublications.length,
  }
}
