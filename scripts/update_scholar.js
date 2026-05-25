const fs = require('fs');
const path = require('path');

const USER_ID = process.env.SCHOLAR_USER_ID || 'kQZZJtYAAAAJ';

// Many mirrors to rotate through — reduces chance of all being blocked
const MIRRORS = [
  'https://scholar.google.com',
  'https://scholar.google.co.uk',
  'https://scholar.google.ca',
  'https://scholar.google.com.au',
  'https://scholar.google.co.id',
  'https://scholar.google.de',
  'https://scholar.google.fr',
  'https://scholar.google.es',
  'https://scholar.google.co.in',
  'https://scholar.google.co.jp',
];

// Realistic browser User-Agent strings to rotate
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.5; rv:126.0) Gecko/20100101 Firefox/126.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
];

// Shuffle array (Fisher-Yates) to randomize mirror order each run
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Random delay between min and max milliseconds
function randomDelay(minMs, maxMs) {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
}

// Pick a random User-Agent
function randomUA() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

// Fetch with timeout and abort support
async function fetchWithTimeout(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, ...options });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Extract a metric value from Scholar HTML
function getMetric(html, label) {
  // Google Scholar renders metrics in a table like:
  //   <td>Citations</td><td class="gsc_rsb_std">34</td>
  // We try multiple patterns to handle variations.
  const patterns = [
    new RegExp(`>${label}</a></td><td class="gsc_rsb_std">(\\d+)</td>`, 'i'),
    new RegExp(`>${label}</a>\\s*</td>\\s*<td[^>]*>(\\d+)</td>`, 'i'),
    new RegExp(`${label}</a></td><td[^>]*>(\\d+)</td>`, 'i'),
    new RegExp(`${label}[\\s\\S]*?<td class="gsc_rsb_std">(\\d+)</td>`, 'i'),
    new RegExp(`${label}[\\s\\S]*?<td[^>]*gsc_rsb_std[^>]*>(\\d+)</td>`, 'i'),
    new RegExp(`>${label}<[^>]*>[\\s\\S]*?<td[^>]*>(\\d+)</td>`, 'i'),
  ];

  for (const regex of patterns) {
    const match = html.match(regex);
    if (match) return parseInt(match[1], 10);
  }
  return null;
}

// Try to fetch from a single mirror
async function fetchFromMirror(mirror) {
  const url = `${mirror}/citations?user=${USER_ID}&hl=en&oi=ao`;
  const ua = randomUA();
  console.log(`  → Trying: ${mirror}`);

  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        'User-Agent': ua,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
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

    if (!response.ok) {
      console.log(`    ✗ HTTP ${response.status}`);
      return null;
    }

    const html = await response.text();

    // Check for CAPTCHA / robot detection
    if (
      html.includes("Please show you're not a robot") ||
      html.includes('robot check') ||
      html.includes('unusual traffic') ||
      html.includes('captcha') ||
      html.includes('sorry/index')
    ) {
      console.log(`    ✗ Blocked by CAPTCHA/bot detection`);
      return null;
    }

    // Sanity check: a valid Scholar profile page is usually >5KB
    if (html.length < 2000) {
      console.log(`    ✗ Response too small (${html.length} bytes) — likely an error page`);
      return null;
    }

    // Check that we actually have the user's profile page
    if (!html.includes('gsc_rsb_st') && !html.includes('gsc_prf')) {
      console.log(`    ✗ Response doesn't look like a Scholar profile page`);
      return null;
    }

    const citations = getMetric(html, 'Citations');
    const hIndex = getMetric(html, 'h-index');
    const i10Index = getMetric(html, 'i10-index');

    if (citations !== null && hIndex !== null) {
      console.log(`    ✓ Parsed: citations=${citations}, h-index=${hIndex}, i10-index=${i10Index || 0}`);
      return { citations, hIndex, i10Index: i10Index || 0 };
    }

    console.log(`    ✗ Could not parse metrics (citations=${citations}, h-index=${hIndex})`);
  } catch (e) {
    if (e.name === 'AbortError') {
      console.log(`    ✗ Timeout after 15s`);
    } else {
      console.log(`    ✗ ${e.message}`);
    }
  }
  return null;
}

// Load existing scholar.json
function loadCurrentData() {
  const filePath = path.join(process.cwd(), 'data', 'scholar.json');
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {
    console.warn('Could not load existing scholar.json:', e.message);
  }
  return null;
}

// Validate that new metrics are reasonable compared to existing data
function validateMetrics(newMetrics, existingData) {
  if (!existingData || existingData.fetchFailed) return true;

  // Citations should never decrease significantly (could indicate a parsing error)
  if (existingData.citations > 0 && newMetrics.citations < existingData.citations * 0.5) {
    console.warn(`  ⚠ New citations (${newMetrics.citations}) < 50% of existing (${existingData.citations}) — likely a parsing error`);
    return false;
  }

  // h-index should never decrease
  if (existingData.hIndex > 0 && newMetrics.hIndex < existingData.hIndex) {
    console.warn(`  ⚠ New h-index (${newMetrics.hIndex}) < existing (${existingData.hIndex}) — likely a parsing error`);
    return false;
  }

  return true;
}

async function run() {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  Google Scholar Metrics Update (Weekly)      ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`User ID: ${USER_ID}`);
  console.log(`Time: ${new Date().toISOString()}\n`);

  const filePath = path.join(process.cwd(), 'data', 'scholar.json');
  const existingData = loadCurrentData();

  if (existingData) {
    console.log(`Existing data: citations=${existingData.citations}, h-index=${existingData.hIndex}, i10-index=${existingData.i10Index}`);
    console.log(`Last updated: ${existingData.lastUpdated}\n`);
  }

  // Shuffle mirrors so we don't always hit the same one first
  const mirrors = shuffle(MIRRORS);
  let metrics = null;

  // Attempt 1: Try all mirrors with increasing delays
  console.log('Attempt 1: Trying mirrors...');
  for (let i = 0; i < mirrors.length; i++) {
    metrics = await fetchFromMirror(mirrors[i]);
    if (metrics) break;

    // Random delay between attempts (2-6 seconds) to look more human
    if (i < mirrors.length - 1) {
      const delay = 2000 + Math.floor(Math.random() * 4000);
      console.log(`    Waiting ${(delay / 1000).toFixed(1)}s before next mirror...\n`);
      await new Promise(r => setTimeout(r, delay));
    }
  }

  // Attempt 2: If first pass failed, wait longer and try a few random mirrors again
  if (!metrics) {
    console.log('\nAttempt 2: Retrying after longer delay...');
    await randomDelay(8000, 15000);
    const retryMirrors = shuffle(MIRRORS).slice(0, 3);
    for (let i = 0; i < retryMirrors.length; i++) {
      metrics = await fetchFromMirror(retryMirrors[i]);
      if (metrics) break;
      if (i < retryMirrors.length - 1) {
        await randomDelay(3000, 7000);
      }
    }
  }

  // If we got metrics, validate them
  if (metrics && !validateMetrics(metrics, existingData)) {
    console.log('\n⚠ Metrics failed validation — discarding suspicious data');
    metrics = null;
  }

  // Write results
  if (metrics) {
    const data = {
      citations: metrics.citations,
      hIndex: metrics.hIndex,
      i10Index: metrics.i10Index,
      lastUpdated: new Date().toISOString(),
      fetchFailed: false,
    };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log('\n✅ Scholar metrics updated successfully!');
    console.log(`   Citations: ${data.citations}`);
    console.log(`   h-index:   ${data.hIndex}`);
    console.log(`   i10-index: ${data.i10Index}`);
  } else {
    console.log('\n⚠ Could not fetch new metrics from Google Scholar.');
    if (existingData) {
      // Keep existing metrics intact — do NOT overwrite with zeros
      // Only update the timestamp to show the workflow ran
      console.log('ℹ Keeping existing cached metrics (still valid).');
      console.log(`   Citations: ${existingData.citations}`);
      console.log(`   h-index:   ${existingData.hIndex}`);
      console.log(`   i10-index: ${existingData.i10Index}`);
      // Don't modify the file at all — existing data is still good
      // The metrics on the website remain accurate from the last successful fetch
    } else {
      // No existing data at all — create a minimal placeholder
      const placeholder = {
        citations: 0,
        hIndex: 0,
        i10Index: 0,
        lastUpdated: new Date().toISOString(),
        fetchFailed: true,
      };
      fs.writeFileSync(filePath, JSON.stringify(placeholder, null, 2) + '\n');
      console.log('ℹ Created placeholder scholar.json — please update manually.');
      console.log('   Run: node scripts/manual_update_scholar.js <citations> <hIndex> <i10Index>');
    }
  }

  console.log('\nDone.');
  // Always exit 0 — the workflow should never fail because of Scholar rate limiting
  process.exit(0);
}

run().catch(err => {
  console.error('Unexpected error:', err);
  // Even on unexpected errors, exit 0 to avoid failing the workflow
  // The existing scholar.json data remains valid
  process.exit(0);
});
