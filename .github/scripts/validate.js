const fs = require('fs');
const pages = ['auto/index.html','camera/index.html','emoji/index.html','fire/index.html'];
let failed = 0;
for (const p of pages) {
  if (!fs.existsSync(p)) { console.log('MISSING ' + p); failed = 1; continue; }
  const html = fs.readFileSync(p, 'utf-8');
  const m = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) { console.log('NOSCRIPT ' + p); continue; }
  try { new Function(m[1]); console.log('OK ' + p); }
  catch(e) { console.log('FAIL ' + p + ': ' + e.message); failed = 1; }
}
process.exit(failed);
