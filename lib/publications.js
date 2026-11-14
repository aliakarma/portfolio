/*
  Helpers on publication records. Safe to import from client components: it
  pulls in only the publication data and the profile. Anything that needs the
  other data files (notes, projects, news) belongs in lib/content.js.
*/
import { profile } from '../data/profile'
import { publications } from '../data/publications'
import { underReviewPublications } from '../data/underReview'

export { publications, underReviewPublications }
export const allPublications = [...publications, ...underReviewPublications]

export const STATUS_LABELS = { published: 'Published', accepted: 'Accepted', under_review: 'Under Review' }
export const TYPE_LABELS = { conference: 'Conference', journal: 'Journal', book_chapter: 'Book Chapter' }

/* Dates are written "Month D, YYYY" (or "Month YYYY"); this is the one place that reads them. */
export const pubTime = (p) => new Date(p.date).getTime()
export const byNewest = (a, b) => pubTime(b) - pubTime(a) || b.id - a.id

/* "Published · PLoS One", "Under Review · IEEE T-ASE": one format everywhere. */
export const statusLabel = (p) => `${STATUS_LABELS[p.status]} · ${p.venueShort}`

/* First author by author order, or flagged `coFirstAuthor` for equal contribution. */
export const isFirstAuthor = (p) => p.authorsStr.startsWith(profile.name) || p.coFirstAuthor === true

/* Stable anchors so other pages can link straight to a paper or a note. */
export const pubAnchor = (id) => `pub-${id}`
export const pubHref = (id) => `/research/#pub-${id}`
export const noteHref = (id) => `/blog/#note-${id}`
