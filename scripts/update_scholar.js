const fs = require('fs');
const path = require('path');

const USER_ID = process.env.SCHOLAR_USER_ID || 'kQZZJtYAAAAJ';
const MIRRORS = [
  'https://scholar.google.com',
  'https://scholar.google.co.uk',
  'https://scholar.google.ca',
  'https://scholar.google.com.au',
  'https://scholar.google.co.id'
];

async function fetchFromMirror(mirror) {
  const url = `${mirror}/citations?user=${USER_ID}&hl=en&oi=ao`;
  console.log(`Trying mirror: ${mirror}...`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      }
    });

    if (!response.ok) return null;
    const html = await response.text();

    if (html.includes('Please show you\'re not a robot')) {
      console.warn(`Mirror ${mirror} blocked by robot check.`);
      return null;
    }

    // Improved robust regex
    // Looks for the specific metric class and follows it to the value
    const getMetric = (label) => {
      const regex = new RegExp(`${label}<\\/a><\\/td><td class="gsc_rsb_std">(\\d+)<\\/td>`, 'i');
      const match = html.match(regex);
      return match ? parseInt(match[1]) : null;
    };

    const citations = getMetric('Citations');
    const hIndex = getMetric('h-index');
    const i10Index = getMetric('i10-index');

    if (citations !== null && hIndex !== null) {
      return { citations, hIndex, i10Index: i10Index || 0 };
    }
  } catch (e) {
    console.error(`Error with mirror ${mirror}:`, e.message);
  }
  return null;
}

async function run() {
  let metrics = null;
  for (const mirror of MIRRORS) {
    metrics = await fetchFromMirror(mirror);
    if (metrics) break;
    // Wait a bit before trying next mirror
    await new Promise(r => setTimeout(r, 2000));
  }

  if (metrics) {
    metrics.lastUpdated = new Date().toISOString();
    console.log('Successfully fetched metrics:', metrics);
    const filePath = path.join(process.cwd(), 'data', 'scholar.json');
    fs.writeFileSync(filePath, JSON.stringify(metrics, null, 2));
    console.log(`Saved to ${filePath}`);
  } else {
    console.error('Failed to fetch metrics from all mirrors. Google might be blocking all requests.');
    process.exit(1);
  }
}

run();
