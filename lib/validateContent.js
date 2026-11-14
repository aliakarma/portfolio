/*
  Cross-checks the data files and fails the build with a readable list when
  they disagree: a misspelt tag, a note pointing at a paper that does not
  exist, a graphical abstract that was never generated, a duplicate id.

  lib/content.js runs this on import, and every page imports lib/content.js
  in getStaticProps, so `npm run dev` and `npm run build` both stop on a bad
  edit instead of shipping an inconsistent site.
*/
import manifest from '../data/graphicalAbstracts.json'
import { TAGS } from '../data/tags'
import { blogPosts } from '../data/blog'
import { projects } from '../data/projects'
import { newsEvents } from '../data/news'
import { researchThemes } from '../data/researchThemes'
import { publications, underReviewPublications, allPublications, STATUS_LABELS, TYPE_LABELS } from './publications'

const isDate = (d) => typeof d === 'string' && !Number.isNaN(new Date(d).getTime())

export function validateContent() {
  const errors = []
  const err = (where, msg) => errors.push(`${where}: ${msg}`)
  const noDupes = (items, key, where) => {
    const seen = new Set()
    for (const item of items) {
      if (seen.has(item[key])) err(where, `duplicate ${key} ${item[key]}`)
      seen.add(item[key])
    }
  }
  const checkAbstract = (slug, where) => {
    if (slug && !manifest[slug]) err(where, `graphical abstract "${slug}" not in data/graphicalAbstracts.json (run npm run images)`)
  }

  noDupes(allPublications, 'id', 'publications')
  const pubIds = new Set(allPublications.map(p => p.id))
  const checkPaperRef = (id, where) => {
    if (id != null && !pubIds.has(id)) err(where, `publicationId ${id} does not exist`)
  }

  for (const p of allPublications) {
    const at = `publication ${p.id}`
    for (const key of ['title', 'authorsStr', 'venue', 'venueShort', 'abstract', 'bibtex']) {
      if (!p[key]) err(at, `missing ${key}`)
    }
    if (!TYPE_LABELS[p.type]) err(at, `unknown type "${p.type}" (use ${Object.keys(TYPE_LABELS).join(', ')})`)
    if (!STATUS_LABELS[p.status]) err(at, `unknown status "${p.status}" (use ${Object.keys(STATUS_LABELS).join(', ')})`)
    if (!isDate(p.date)) err(at, `date "${p.date}" should look like "June 6, 2026"`)
    if (!p.tags?.length) err(at, 'needs at least one tag')
    for (const tag of p.tags ?? []) {
      if (!(tag in TAGS)) err(at, `tag "${tag}" is not listed in data/tags.js`)
    }
    checkAbstract(p.graphicalAbstract, at)
  }
  for (const p of publications) {
    if (p.status === 'under_review') err(`publication ${p.id}`, 'under-review papers belong in data/underReview.js')
  }
  for (const p of underReviewPublications) {
    if (p.status !== 'under_review') err(`publication ${p.id}`, 'only under_review papers belong in data/underReview.js')
  }

  noDupes(blogPosts, 'id', 'notes')
  noDupes(blogPosts.filter(n => n.publicationId != null), 'publicationId', 'notes')
  for (const n of blogPosts) {
    const at = `note ${n.id}`
    if (!/^\d{4}-\d{2}-\d{2}$/.test(n.date)) err(at, `date "${n.date}" should look like "2026-06-30"`)
    checkPaperRef(n.publicationId, at)
    checkAbstract(n.graphicalAbstract, at)
  }

  noDupes(projects, 'id', 'projects')
  for (const pr of projects) {
    checkPaperRef(pr.publicationId, `project ${pr.id}`)
    if (pr.publicationId == null && !pr.status) err(`project ${pr.id}`, 'needs a status when it has no publicationId')
  }

  noDupes(newsEvents, 'id', 'news')
  for (const e of newsEvents) {
    if (!isDate(e.date)) err(`news ${e.id}`, `date "${e.date}" should look like "June 6, 2026"`)
    checkPaperRef(e.publicationId, `news ${e.id}`)
  }

  for (const t of researchThemes) {
    if (!(t.tag in TAGS)) err(`research theme "${t.tag}"`, 'is not listed in data/tags.js')
  }

  if (errors.length) {
    throw new Error(`Content check failed (${errors.length} problem${errors.length > 1 ? 's' : ''}):\n  - ${errors.join('\n  - ')}`)
  }
}
