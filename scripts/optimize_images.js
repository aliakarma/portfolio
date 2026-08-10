/*
  Generates the web-ready image variants served from public/.

  Source PNGs live in assets/ (gitignored, never deployed); the encoded
  output is committed so deploys stay fast. Run manually after adding a
  new graphical abstract:

      npm run images

  Encoder settings were chosen by measuring PSNR/SSIM against a lossless
  reference rather than by eye. These are text-dense diagrams — 8pt labels
  on flat fills — which is the content type lossy codecs damage first:

    AVIF q70   23x smaller than the source PNG at SSIM 0.991
    WebP q90   fallback for browsers without AVIF (Safari < 16.4)
    JPEG       rejected — larger AND measurably worse here (37.6 vs 45.0 dB)

  Every source carries a fully-opaque alpha channel that stores nothing,
  so removeAlpha() runs first in each branch and costs a free 25%.
*/
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ROOT = path.join(__dirname, '..')
const ABSTRACT_SRC = path.join(ROOT, 'assets', 'graphical-abstracts')
const ABSTRACT_OUT = path.join(ROOT, 'public', 'graphical-abstracts')
const MANIFEST = path.join(ROOT, 'data', 'graphicalAbstracts.json')

/* Inline render is ~752 CSS px wide (max-h-[420px] on a 16:9 image), so
   1600px covers a 2x device pixel ratio. The full-size variant keeps the
   native resolution for the click-through and stays WebP: a bare <a href>
   gets no content negotiation, so it needs the format with wider support. */
const ABSTRACT_VARIANTS = [
  { suffix: '-1600', width: 1600, fmt: 'avif', opts: { quality: 70, effort: 5 } },
  { suffix: '-1600', width: 1600, fmt: 'webp', opts: { quality: 90, effort: 6 } },
  { suffix: '-full', width: null, fmt: 'webp', opts: { quality: 90, effort: 6 } },
]

const PROFILE_SRC = path.join(ROOT, 'assets', 'Profile.png')
const PROFILE_OUT = path.join(ROOT, 'public')
/* Rendered at 192px (about page) and 40px (navbar); 384 covers 2x on both. */
const PROFILE_VARIANTS = [
  { name: 'profile-384.avif', width: 384, fmt: 'avif', opts: { quality: 72, effort: 5 } },
  { name: 'profile-384.webp', width: 384, fmt: 'webp', opts: { quality: 90, effort: 6 } },
  { name: 'profile-384.png',  width: 384, fmt: 'png',  opts: { compressionLevel: 9, palette: true } },
]

const CONCURRENCY = 4

const slugify = (filename) =>
  path.basename(filename, path.extname(filename))
    .replace(/%20/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`
const mb = (bytes) => `${(bytes / 1048576).toFixed(1)} MB`

/* Runs tasks with bounded concurrency — AVIF is CPU-heavy and spawning
   all of them at once just thrashes. */
async function pool(items, limit, worker) {
  const results = []
  let cursor = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++
        results[i] = await worker(items[i])
      }
    })
  )
  return results
}

async function encode(src, outPath, { width, fmt, opts }) {
  let pipe = sharp(src)
  if (width) pipe = pipe.resize({ width, kernel: 'lanczos3', withoutEnlargement: true })
  const info = await pipe.removeAlpha()[fmt](opts).toFile(outPath)
  return { bytes: info.size, width: info.width, height: info.height }
}

async function buildAbstracts() {
  if (!fs.existsSync(ABSTRACT_SRC)) {
    console.error(`✗ Source directory not found: ${path.relative(ROOT, ABSTRACT_SRC)}`)
    console.error('  Originals are gitignored — restore them there before re-running.')
    process.exitCode = 1
    return null
  }

  const sources = fs.readdirSync(ABSTRACT_SRC).filter((f) => /\.(png|jpe?g)$/i.test(f))
  if (!sources.length) {
    console.error(`✗ No source images in ${path.relative(ROOT, ABSTRACT_SRC)}`)
    process.exitCode = 1
    return null
  }

  fs.mkdirSync(ABSTRACT_OUT, { recursive: true })
  console.log(`\nGraphical abstracts — ${sources.length} source images\n`)

  const manifest = {}
  let totalIn = 0
  let totalOut = 0

  const rows = await pool(sources, CONCURRENCY, async (file) => {
    const src = path.join(ABSTRACT_SRC, file)
    const slug = slugify(file)
    const inBytes = fs.statSync(src).size

    let out = 0
    let displayDims = null

    for (const variant of ABSTRACT_VARIANTS) {
      const outPath = path.join(ABSTRACT_OUT, `${slug}${variant.suffix}.${variant.fmt}`)
      const res = await encode(src, outPath, variant)
      out += res.bytes
      /* Intrinsic size of the inline variant — used for width/height attrs
         so the browser reserves the right box and nothing shifts on load. */
      if (variant.suffix === '-1600' && variant.fmt === 'avif') {
        displayDims = { width: res.width, height: res.height }
      }
    }

    manifest[slug] = displayDims
    totalIn += inBytes
    totalOut += out
    return { slug, inBytes, out }
  })

  for (const r of rows.sort((a, b) => a.slug.localeCompare(b.slug))) {
    console.log(
      `  ${r.slug.padEnd(28)} ${mb(r.inBytes).padStart(8)} → ${kb(r.out).padStart(8)}` +
      `  (${(r.inBytes / r.out).toFixed(0)}x)`
    )
  }

  fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`\n  manifest → ${path.relative(ROOT, MANIFEST)}`)

  return { totalIn, totalOut }
}

async function buildProfile() {
  if (!fs.existsSync(PROFILE_SRC)) {
    console.log('\nProfile — skipped (assets/Profile.png not found)')
    return null
  }

  console.log('\nProfile photo\n')
  const inBytes = fs.statSync(PROFILE_SRC).size
  let out = 0

  for (const v of PROFILE_VARIANTS) {
    const res = await encode(PROFILE_SRC, path.join(PROFILE_OUT, v.name), v)
    out += res.bytes
    console.log(`  ${v.name.padEnd(28)} ${kb(res.bytes).padStart(8)}`)
  }

  console.log(`  ${'total'.padEnd(28)} ${mb(inBytes).padStart(8)} → ${kb(out).padStart(8)}`)
  return { totalIn: inBytes, totalOut: out }
}

;(async () => {
  const started = Date.now()

  const abstracts = await buildAbstracts()
  if (!abstracts) return
  const profile = await buildProfile()

  const totalIn = abstracts.totalIn + (profile?.totalIn ?? 0)
  const totalOut = abstracts.totalOut + (profile?.totalOut ?? 0)

  console.log(
    `\n${mb(totalIn)} → ${mb(totalOut)}  (${(totalIn / totalOut).toFixed(0)}x smaller)` +
    `  in ${((Date.now() - started) / 1000).toFixed(0)}s\n`
  )
})()
