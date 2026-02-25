
const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(process.cwd(), process.argv[2] || 'lighthouse-report.json');
const outPath = jsonPath.replace(/\.json$/i, '.txt');

if (!fs.existsSync(jsonPath)) {
  console.error('File not found:', jsonPath);
  console.error('Run first: npm run lighthouse:json');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const lines = [];

function scoreToLabel(score) {
  if (score === null || score === undefined) return 'N/A';
  const n = Math.round(score * 100);
  if (n >= 90) return `${n} (Good)`;
  if (n >= 50) return `${n} (Needs improvement)`;
  return `${n} (Poor)`;
}

// Header
lines.push('LIGHTHOUSE PERFORMANCE REPORT');
lines.push('============================');
lines.push(`URL: ${report.finalDisplayedUrl || report.configSettings?.locale || 'N/A'}`);
lines.push(`Generated: ${new Date(report.fetchTime || Date.now()).toISOString()}`);
lines.push('');

// Category scores
const categories = report.categories || {};
lines.push('CATEGORY SCORES');
lines.push('---------------');
for (const [id, cat] of Object.entries(categories)) {
  const name = cat.title || id;
  const score = cat.score != null ? Math.round(cat.score * 100) : 'N/A';
  lines.push(`${name}: ${score}`);
}
lines.push('');

// Performance metrics (from performance category audits)
const perf = categories.performance;
if (perf && perf.auditRefs) {
  lines.push('KEY METRICS (Performance)');
  lines.push('-------------------------');
  const auditIds = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'interactive'];
  const audits = report.audits || {};
  for (const aid of auditIds) {
    const a = audits[aid];
    if (!a) continue;
    const title = a.title || aid;
    const display = a.displayValue != null ? a.displayValue : (a.numericValue != null ? String(a.numericValue) : 'N/A');
    lines.push(`${title}: ${display}`);
  }
  lines.push('');
}

// Opportunities & diagnostics (optional short list)
lines.push('NOTES');
lines.push('-----');
lines.push('Full details: open the HTML report in a browser.');
lines.push('To generate JSON: npm run lighthouse:json');
lines.push('To generate this TXT: node scripts/lighthouse-to-txt.js lighthouse-report.json');

const text = lines.join('\n');
fs.writeFileSync(outPath, text, 'utf8');
console.log('Written:', outPath);
