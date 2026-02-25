/**
 * Build for production, serve dist, run Lighthouse, then exit.
 * Usage: npm run lighthouse:prod
 * Output: lighthouse-report.html
 */
const { execSync, spawn } = require('child_process');
const path = require('path');
const distPath = path.join(process.cwd(), 'dist', 'fintec-app');
const port = 8080;

console.log('Building for production...');
execSync('ng build --configuration production', { stdio: 'inherit', cwd: process.cwd() });

(async function () {
  let server;
  try {
    server = spawn('npx', ['http-server', distPath, '-p', String(port), '-c-1'], {
      stdio: 'pipe',
      shell: true,
      cwd: process.cwd()
    });
    console.log('Serving dist at http://localhost:' + port + ' ...');
    await new Promise(function (r) { setTimeout(r, 3000); });
    console.log('Running Lighthouse...');
    execSync(
      'npx lighthouse http://localhost:' + port + ' --output=html --output-path=./lighthouse-report.html --chrome-flags="--headless"',
      { stdio: 'inherit', cwd: process.cwd() }
    );
  } finally {
    if (server && server.kill) server.kill();
  }
  console.log('Done. Open lighthouse-report.html');
})().catch(function (err) {
  console.error(err);
  process.exit(1);
});
