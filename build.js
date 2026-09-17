const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

// Copy static files to dist
fs.copyFileSync('index.html', path.join(dist, 'index.html'));
fs.copyFileSync('style.css', path.join(dist, 'style.css'));
fs.copyFileSync('script.js', path.join(dist, 'script.js'));

// Copy assets folder
const assetsDist = path.join(dist, 'assets');
if (!fs.existsSync(assetsDist)) fs.mkdirSync(assetsDist, { recursive: true });
if (fs.existsSync('assets')) {
  for (const file of fs.readdirSync('assets')) {
    fs.copyFileSync(path.join('assets', file), path.join(assetsDist, file));
  }
}
console.log('Build complete: copied static files to dist/');
