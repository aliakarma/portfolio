import { profile } from '../data/profile'

const AUTHOR_REGEX = new RegExp(`(${profile.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`)

/* Renders an author string with the site owner's name highlighted */
export default function AuthorHighlight({ authors }) {
  return authors.split(AUTHOR_REGEX).map((part, i) =>
    AUTHOR_REGEX.test(part)
      ? <span key={i} className="text-gold-400 font-semibold">{part}</span>
      : <span key={i}>{part}</span>
  )
}
