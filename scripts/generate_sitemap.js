/*
  Generates public/sitemap.xml at build time so <lastmod> always reflects
  the current deploy instead of a hand-edited date.
  Runs automatically via the `build` script in package.json.
*/
const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://www.aliakarma.codes'

const ROUTES = [
  { path: '/',          changefreq: 'weekly',  priority: '1.0' },
  { path: '/about/',    changefreq: 'monthly', priority: '0.8' },
  { path: '/research/', changefreq: 'weekly',  priority: '0.9' },
  { path: '/projects/', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog/',     changefreq: 'weekly',  priority: '0.8' },
  { path: '/skills/',   changefreq: 'monthly', priority: '0.6' },
  { path: '/contact/',  changefreq: 'monthly', priority: '0.5' },
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
