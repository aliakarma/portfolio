/**
 * Google Scholar metrics updater.
 *
 * Single source of truth: the metrics table on the public Google Scholar
 * profile. No secondary bibliographic databases are consulted — they index a
 * different (smaller) slice of the literature, so blending them in produced
 * figures that disagreed with the profile page the site links to.
 *
 * If Scholar cannot be read (it rate-limits datacenter IPs, so this is
 * expected to happen from CI), the script writes nothing and exits non-zero.
 * data/scholar.json keeps whatever it held, and the numbers can be refreshed
 * by hand with scripts/manual_update_scholar.js.
 */

const fs = require('fs');
const path = require('path');

// ─── Configuration ───────────────────────────────────────────────────────────

const SCHOLAR_USER_ID = process.env.SCHOLAR_USER_ID || 'kQZZJtYAAAAJ';

// Regional mirrors serve the same profile. Rotating through them gives a
// blocked request somewhere else to try before we give up.
const SCHOLAR_MIRRORS = [
  'https://scholar.google.com',
  'https://scholar.google.co.uk',
  'https://scholar.google.ca',
  'https://scholar.google.com.au',
  'https://scholar.google.de',
  'https://scholar.google.nl',
  'https://scholar.google.co.in',
  'https://scholar.google.com.br',
];

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
];

const REQUEST_TIMEOUT_MS = 20000;
const DATA_FILE = path.join(process.cwd(), 'data', 'scholar.json');

// ─── Utilities ───────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomUA() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

function delay(minMs, maxMs) {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(r => setTimeout(r, ms));
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal, ...options });
  } finally {
    clearTimeout(tid);
  }
}

function loadCurrentData() {
  try {
    if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch { /* a corrupt cache is the same as no cache */ }
  return null;
}

// ─── Parsing ─────────────────────────────────────────────────────────────────

// The profile's metrics table is:
//
//   |            | All | Since 2021 |
//   | Citations  |  57 |         57 |
//   | h-index    |   5 |          5 |
//   | i10-index  |   2 |          2 |
//
// Read it row by row rather than matching each label against the surrounding
// markup: the label text sits inside an <a> carrying a long title attribute,
// and regexes that spanned that attribute matched the wrong cell whenever
// Google reflowed the HTML.
function parseMetricsTable(html) {
  const table = html.match(/<table[^>]*\bid="gsc_rsb_st"[^>]*>([\s\S]*?)<\/table>/i);
  if (!table) return null;

  const metrics = {};
  const rowRe = /<tr>([\s\S]*?)<\/tr>/gi;
  let row;

  while ((row = rowRe.exec(table[1])) !== null) {
    // [label, all-time value, recent value] — we want the all-time column.
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(c =>
      c[1].replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
    );
    if (cells.length < 2) continue;

    const label = cells[0].toLowerCase();
    const value = parseInt(cells[1].replace(/[^\d]/g, ''), 10);
    if (Number.isNaN(value)) continue;

    if (label.startsWith('citations')) metrics.citations = value;
    else if (label.startsWith('h-index')) metrics.hIndex = value;
    else if (label.startsWith('i10-index')) metrics.i10Index = value;
  }

  return metrics;
}

// Guards against a partially rendered or interstitial page parsing into
// plausible-looking nonsense.
function isSane(m) {
  if (m.citations == null || m.hIndex == null || m.i10Index == null) return false;
  if ([m.citations, m.hIndex, m.i10Index].some(v => v < 0 || v > 1e7)) return false;
  if (m.hIndex > m.citations) return false;
  if (m.i10Index > m.citations) return false;
  return true;
}

function looksBlocked(html) {
  return (
    html.length < 5000 ||
    /not a robot|unusual traffic|\/sorry\/index|recaptcha/i.test(html)
  );
}

// ─── Fetch ───────────────────────────────────────────────────────────────────

async function fetchGoogleScholar() {
  const mirrors = shuffle(SCHOLAR_MIRRORS);
  console.log(`\nReading Google Scholar profile ${SCHOLAR_USER_ID}`);

  for (let i = 0; i < mirrors.length; i++) {
    const mirror = mirrors[i];
    const url = `${mirror}/citations?user=${SCHOLAR_USER_ID}&hl=en`;
    console.log(`  -> ${mirror}`);

    try {
      const res = await fetchWithTimeout(url, {
        headers: {
          'User-Agent': randomUA(),
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
        },
        redirect: 'follow',
      });

      if (!res.ok) {
        console.log(`     x HTTP ${res.status}`);
      } else {
        const html = await res.text();

        if (looksBlocked(html)) {
          console.log('     x blocked (captcha / consent interstitial)');
        } else {
          const metrics = parseMetricsTable(html);

          if (!metrics) {
            console.log('     x metrics table not present');
          } else if (!isSane(metrics)) {
            console.log(`     x implausible values: ${JSON.stringify(metrics)}`);
          } else {
            console.log(`     ok citations=${metrics.citations}, h-index=${metrics.hIndex}, i10-index=${metrics.i10Index}`);
            return metrics;
          }
        }
      }
    } catch (e) {
      console.log(`     x ${e.name === 'AbortError' ? 'timeout' : e.message}`);
    }

    if (i < mirrors.length - 1) await delay(3000, 7000);
  }

  return null;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function run() {
  console.log('Google Scholar metrics update');
  console.log(`Time: ${new Date().toISOString()}`);

  const existing = loadCurrentData();
  if (existing) {
    console.log(`Current: citations=${existing.citations}, h=${existing.hIndex}, i10=${existing.i10Index} (updated ${existing.lastUpdated})`);
  }

  const metrics = await fetchGoogleScholar();

  if (!metrics) {
    console.error('\nGoogle Scholar could not be read from any mirror.');
    console.error('data/scholar.json was left untouched.');
    console.error('Update it by hand with:');
    console.error('  npm run scholar:manual -- <citations> <hIndex> <i10Index>');
    console.error(`Figures are at https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en`);
    process.exit(1);
  }

  const unchanged =
    existing &&
    existing.citations === metrics.citations &&
    existing.hIndex === metrics.hIndex &&
    existing.i10Index === metrics.i10Index;

  // Written even when the figures match, so lastUpdated records when they were
  // last confirmed against Scholar. The site shows that date, and a stale one
  // there should mean "the check stopped running", not "nothing got cited".
  if (unchanged) {
    console.log('\nFigures unchanged — refreshing the confirmation date.');
  } else if (existing && metrics.citations < existing.citations) {
    console.log(`\nCitations decreased (${existing.citations} -> ${metrics.citations}); Scholar is authoritative, writing the live figure.`);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify({
    citations: metrics.citations,
    hIndex: metrics.hIndex,
    i10Index: metrics.i10Index,
    lastUpdated: new Date().toISOString(),
    source: 'google_scholar',
    fetchFailed: false,
  }, null, 2) + '\n');

  console.log('\ndata/scholar.json updated from Google Scholar.');
}

run().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
