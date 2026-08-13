const fs = require('fs');
const path = require('path');
const pkgPath = path.join(__dirname, '..', 'gen', 'db', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.engines = { node: '^22' };
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('Patched gen/db/package.json engines:', pkg.engines.node);
