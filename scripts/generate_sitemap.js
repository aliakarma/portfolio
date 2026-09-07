/*
  Generates public/sitemap.xml at build time so <lastmod> always reflects
  the current deploy instead of a hand-edited date.
  Runs automatically via the `build` script in package.json.
*/
const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://aliakarma.codes'

const ROUTES = [
  { path: '/',          changefreq: 'daily',   priority: '1.0' },
  { path: '/research/', changefreq: 'weekly',  priority: '0.95' },
  { path: '/projects/', changefreq: 'weekly',  priority: '0.90' },
  { path: '/blog/',     changefreq: 'weekly',  priority: '0.90' },
  { path: '/news/',     changefreq: 'weekly',  priority: '0.85' },
  { path: '/about/',    changefreq: 'weekly',  priority: '0.85' },
  { path: '/contact/',  changefreq: 'weekly',  priority: '0.80' },
]

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

const out = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.writeFileSync(out, xml)
console.log(`sitemap.xml written (${ROUTES.length} routes, lastmod ${today})`)
