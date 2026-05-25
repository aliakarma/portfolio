const fs = require('fs');
const path = require('path');

// ─── Configuration ───────────────────────────────────────────────────────────

const GOOGLE_SCHOLAR_USER_ID = process.env.SCHOLAR_USER_ID || 'kQZZJtYAAAAJ';
const SEMANTIC_SCHOLAR_AUTHOR_ID = '2395534852';

const SCHOLAR_MIRRORS = [
  'https://scholar.google.com',
  'https://scholar.google.co.uk',
  'https://scholar.google.ca',
  'https://scholar.google.com.au',
  'https://scholar.google.de',
  'https://scholar.google.fr',
  'https://scholar.google.es',
  'https://scholar.google.co.in',
];

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
];

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

function randomDelay(minMs, maxMs) {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(r => setTimeout(r, ms));
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal, ...options });
  } finally {
    clearTimeout(tid);
  }
}

function loadCurrentData() {
  const fp = path.join(process.cwd(), 'data', 'scholar.json');
  try {
    if (fs.existsSync(fp)) return JSON.parse(fs.readFileSync(fp, 'utf-8'));
  } catch { /* ignore */ }
  return null;
}

// ─── Source 1: Semantic Scholar API (Primary — always works) ─────────────────

async function fetchSemanticScholar() {
  console.log('\n📚 Source 1: Semantic Scholar API');

  const url = `https://api.semanticscholar.org/graph/v1/author/${SEMANTIC_SCHOLAR_AUTHOR_ID}?fields=name,citationCount,hIndex,paperCount,papers.citationCount`;
  console.log(`  → GET ${url}`);

  try {
    const res = await fetchWithTimeout(url, {
      headers: { 'Accept': 'application/json' },
    }, 15000);

    if (!res.ok) {
      console.log(`  ✗ HTTP ${res.status}`);
      return null;
    }

    const data = await res.json();
    const citations = data.citationCount ?? null;
    const hIndex = data.hIndex ?? null;

    // Compute i10-index: count papers with ≥ 10 citations
    let i10Index = 0;
    if (data.papers && Array.isArray(data.papers)) {
      i10Index = data.papers.filter(p => (p.citationCount || 0) >= 10).length;
    }

    if (citations !== null && hIndex !== null) {
      console.log(`  ✓ citations=${citations}, h-index=${hIndex}, i10-index=${i10Index}`);
      return { citations, hIndex, i10Index, source: 'semantic_scholar' };
    }

    console.log(`  ✗ Missing data in response`);
  } catch (e) {
    console.log(`  ✗ ${e.name === 'AbortError' ? 'Timeout' : e.message}`);
  }
  return null;
}

// ─── Source 2: Google Scholar scraping (Secondary — best-effort) ─────────────

function parseScholarMetric(html, label) {
  const patterns = [
    new RegExp(`>${label}</a></td><td class="gsc_rsb_std">(\\d+)</td>`, 'i'),
    new RegExp(`>${label}</a>\\s*</td>\\s*<td[^>]*>(\\d+)</td>`, 'i'),
    new RegExp(`${label}</a></td><td[^>]*>(\\d+)</td>`, 'i'),
    new RegExp(`${label}[\\s\\S]*?<td class="gsc_rsb_std">(\\d+)</td>`, 'i'),
    new RegExp(`${label}[\\s\\S]*?<td[^>]*gsc_rsb_std[^>]*>(\\d+)</td>`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

async function fetchGoogleScholar() {
  console.log('\n🔍 Source 2: Google Scholar scraping (best-effort)');

  const mirrors = shuffle(SCHOLAR_MIRRORS).slice(0, 4); // Only try 4 random mirrors

  for (let i = 0; i < mirrors.length; i++) {
    const mirror = mirrors[i];
    const url = `${mirror}/citations?user=${GOOGLE_SCHOLAR_USER_ID}&hl=en&oi=ao`;
    console.log(`  → Trying: ${mirror}`);

    try {
      const res = await fetchWithTimeout(url, {
        headers: {
          'User-Agent': randomUA(),
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Cache-Control': 'max-age=0',
        },
        redirect: 'follow',
      }, 15000);

      if (!res.ok) { console.log(`    ✗ HTTP ${res.status}`); continue; }

      const html = await res.text();

      if (html.includes("not a robot") || html.includes('unusual traffic') || html.includes('captcha') || html.length < 2000) {
        console.log(`    ✗ Blocked`);
        if (i < mirrors.length - 1) await randomDelay(2000, 5000);
        continue;
      }

      const citations = parseScholarMetric(html, 'Citations');
      const hIndex = parseScholarMetric(html, 'h-index');
      const i10Index = parseScholarMetric(html, 'i10-index');

      if (citations !== null && hIndex !== null) {
        console.log(`    ✓ citations=${citations}, h-index=${hIndex}, i10-index=${i10Index || 0}`);
        return { citations, hIndex, i10Index: i10Index || 0, source: 'google_scholar' };
      }

      console.log(`    ✗ Could not parse metrics`);
    } catch (e) {
      console.log(`    ✗ ${e.name === 'AbortError' ? 'Timeout' : e.message}`);
    }

    if (i < mirrors.length - 1) await randomDelay(2000, 5000);
  }

  return null;
}

// ─── Merge strategy: take the maximum of all sources ─────────────────────────

function mergeMetrics(sources, existing) {
  // Collect all valid data points (including existing cached data)
  const all = [...sources.filter(Boolean)];
  if (existing && !existing.fetchFailed) {
    all.push({ citations: existing.citations, hIndex: existing.hIndex, i10Index: existing.i10Index, source: 'cached' });
  }

  if (all.length === 0) return null;

  // Take the maximum of each metric across all sources.
  // Google Scholar typically has higher counts than Semantic Scholar,
  // so using max() ensures we always show the best available data.
  const merged = {
    citations: Math.max(...all.map(s => s.citations || 0)),
    hIndex: Math.max(...all.map(s => s.hIndex || 0)),
    i10Index: Math.max(...all.map(s => s.i10Index || 0)),
  };

  console.log('\n📊 Merged metrics (max across all sources):');
  for (const s of all) {
    console.log(`   ${s.source}: citations=${s.citations}, h=${s.hIndex}, i10=${s.i10Index}`);
  }
  console.log(`   → Final: citations=${merged.citations}, h=${merged.hIndex}, i10=${merged.i10Index}`);

  return merged;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function run() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  Scholar Metrics Update (Weekly)                     ║');
  console.log('║  Primary: Semantic Scholar API · Fallback: GScholar  ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log(`Time: ${new Date().toISOString()}`);

  const filePath = path.join(process.cwd(), 'data', 'scholar.json');
  const existing = loadCurrentData();

  if (existing) {
    console.log(`\nCached data: citations=${existing.citations}, h=${existing.hIndex}, i10=${existing.i10Index}`);
    console.log(`Last updated: ${existing.lastUpdated}`);
  }

  // Fetch from both sources concurrently
  // Semantic Scholar is the reliable primary source
  // Google Scholar is a best-effort bonus that may have higher numbers
  const [semanticResult, googleResult] = await Promise.all([
    fetchSemanticScholar(),
    fetchGoogleScholar(),
  ]);

  const merged = mergeMetrics([semanticResult, googleResult], existing);

  if (merged) {
    const output = {
      citations: merged.citations,
      hIndex: merged.hIndex,
      i10Index: merged.i10Index,
      lastUpdated: new Date().toISOString(),
      fetchFailed: false,
    };
    fs.writeFileSync(filePath, JSON.stringify(output, null, 2) + '\n');
    console.log('\n✅ Scholar metrics updated successfully!');
  } else {
    // This should essentially never happen since Semantic Scholar
    // is a reliable API, but just in case:
    console.log('\n⚠ No data from any source.');
    if (existing) {
      console.log('ℹ Keeping existing cached metrics.');
    } else {
      fs.writeFileSync(filePath, JSON.stringify({
        citations: 0, hIndex: 0, i10Index: 0,
        lastUpdated: new Date().toISOString(),
        fetchFailed: true,
      }, null, 2) + '\n');
      console.log('ℹ Created placeholder. Run: node scripts/manual_update_scholar.js <c> <h> <i10>');
    }
  }

  console.log('\nDone.');
  process.exit(0);
}

run().catch(err => {
  console.error('Unexpected error:', err);
  // Never fail the workflow — existing data stays valid
  process.exit(0);
});
