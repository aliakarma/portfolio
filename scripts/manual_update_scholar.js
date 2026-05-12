#!/usr/bin/env node

/**
 * Manual Scholar Metrics Update Helper
 * 
 * This script helps manually update your Google Scholar metrics when automated
 * fetching fails (which is common due to Google's anti-scraping measures).
 * 
 * Usage:
 *   node scripts/manual_update_scholar.js <citations> <hIndex> <i10Index>
 * 
 * Example:
 *   node scripts/manual_update_scholar.js 45 6 2
 * 
 * To find your metrics, visit: https://scholar.google.com/citations?user=kQZZJtYAAAAJ
 */

const fs = require('fs');
const path = require('path');

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    console.log(`
Manual Google Scholar Metrics Update Helper
============================================

This tool updates your scholar metrics when automated fetching fails.

Usage:
  node scripts/manual_update_scholar.js <citations> <hIndex> <i10Index>

Arguments:
  citations   - Total number of citations (number)
  hIndex      - h-index value (number)  
  i10Index    - i10-index value (number)

Example:
  node scripts/manual_update_scholar.js 45 6 2

Where to find your metrics:
  1. Visit: https://scholar.google.com/citations?user=kQZZJtYAAAAJ
  2. Look for the metrics section showing:
     - "All since 2023" section
     - Citations count (e.g., "45 citations")
     - h-index value (e.g., "h-index: 6")
     - i10-index value (e.g., "i10-index: 2")

After running this command, the scholar.json file will be updated and
you can commit the changes to git.
    `);
    process.exit(0);
  }

  if (args.length !== 3) {
    console.error('Error: Exactly 3 arguments required: citations hIndex i10Index');
    console.error('Run with -h for help');
    process.exit(1);
  }

  const [citations, hIndex, i10Index] = args.map(arg => {
    const num = parseInt(arg, 10);
    if (isNaN(num) || num < 0) {
      throw new Error(`Invalid number: ${arg}`);
    }
    return num;
  });

  const filePath = path.join(process.cwd(), 'data', 'scholar.json');
  
  const data = {
    citations,
    hIndex,
    i10Index,
    lastUpdated: new Date().toISOString(),
    fetchFailed: false
  };

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('✓ Scholar metrics updated successfully!');
    console.log(`  - Citations: ${citations}`);
    console.log(`  - h-index: ${hIndex}`);
    console.log(`  - i10-index: ${i10Index}`);
    console.log(`  - Updated: ${data.lastUpdated}`);
    console.log(`\nFile: ${filePath}`);
    console.log('\nNext steps:');
    console.log('  1. Review the changes: git diff data/scholar.json');
    console.log('  2. Commit the changes: git add data/scholar.json && git commit -m "update: scholar metrics"');
    console.log('  3. Push to GitHub: git push');
  } catch (err) {
    console.error('✗ Error updating scholar metrics:', err.message);
    process.exit(1);
  }
}

main();
