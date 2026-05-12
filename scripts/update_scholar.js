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

// Helper function to create a fetch with timeout
async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      ...options
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchFromMirror(mirror) {
  const url = `${mirror}/citations?user=${USER_ID}&hl=en&oi=ao`;
  console.log(`Trying mirror: ${mirror}...`);
  
  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Referer': 'https://scholar.google.com/',
      }
    }, 10000);

    if (!response.ok) {
      console.warn(`Mirror ${mirror} returned status ${response.status}`);
      return null;
    }
    
    const html = await response.text();

    // Check for robot detection or errors
    if (html.includes('Please show you\'re not a robot') || html.includes('robot check') || html.length < 1000) {
      console.warn(`Mirror ${mirror} blocked or returned minimal content (${html.length} bytes).`);
      return null;
    }

    // Parse metrics from HTML - improved regex patterns
    const getMetric = (label) => {
      // Try multiple regex patterns to handle different HTML structures
      const patterns = [
        new RegExp(`${label}<\\/a><\\/td><td class="gsc_rsb_std">(\\d+)<\\/td>`, 'i'),
        new RegExp(`${label}[^<]*<\\/[^>]*>[^<]*<[^>]*>(\\d+)<\\/`, 'i'),
        new RegExp(`>${label}<[^>]*>[^>]*<[^>]*>(\\d+)<`, 'i'),
        new RegExp(`${label}[\\s\\S]*?<td[^>]*>(\\d+)<\\/td>`, 'i'),
      ];
      
      for (const regex of patterns) {
        const match = html.match(regex);
        if (match) return parseInt(match[1]);
      }
      return null;
    };

    const citations = getMetric('Citations');
    const hIndex = getMetric('h-index');
    const i10Index = getMetric('i10-index');

    if (citations !== null && hIndex !== null) {
      console.log(`✓ Successfully parsed metrics from ${mirror}`);
      return { citations, hIndex, i10Index: i10Index || 0 };
    } else {
      console.warn(`Could not parse metrics from ${mirror} - citations: ${citations}, h-index: ${hIndex}`);
    }
  } catch (e) {
    if (e.name === 'AbortError') {
      console.error(`Timeout fetching from ${mirror}`);
    } else {
      console.error(`Error with mirror ${mirror}:`, e.message);
    }
  }
  return null;
}

async function loadCurrentData() {
  const filePath = path.join(process.cwd(), 'data', 'scholar.json');
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Could not load current scholar data:', e.message);
  }
  return null;
}

async function run() {
  console.log('Starting Google Scholar metrics update...');
  console.log(`User ID: ${USER_ID}`);
  let metrics = null;
  
  for (const mirror of MIRRORS) {
    metrics = await fetchFromMirror(mirror);
    if (metrics) break;
    // Wait before trying next mirror
    await new Promise(r => setTimeout(r, 1000));
  }

  const filePath = path.join(process.cwd(), 'data', 'scholar.json');
  
  if (metrics) {
    metrics.lastUpdated = new Date().toISOString();
    metrics.fetchFailed = false;
    console.log('✓ Successfully fetched metrics:', metrics);
    fs.writeFileSync(filePath, JSON.stringify(metrics, null, 2));
    console.log(`✓ Saved to ${filePath}`);
  } else {
    const currentData = await loadCurrentData();
    if (currentData) {
      console.warn('⚠ Failed to fetch new metrics. Using existing data and updating timestamp.');
      currentData.lastUpdated = new Date().toISOString();
      currentData.fetchFailed = true;
      fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
      console.log('✓ Updated existing data with new timestamp');
      console.log('ℹ Note: Google Scholar is actively blocking automated requests. This is expected.');
      console.log('ℹ To manually update metrics, edit data/scholar.json directly.');
    } else {
      // Provide default data if nothing exists
      const defaultData = {
        citations: 0,
        hIndex: 0,
        i10Index: 0,
        lastUpdated: new Date().toISOString(),
        fetchFailed: true
      };
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
      console.warn('⚠ Created default scholar data file.');
      console.log('ℹ Please manually update data/scholar.json with your metrics.');
    }
  }
}

run().catch(err => {
  console.error('Unexpected error in scholar update:', err);
  process.exit(1);
});
