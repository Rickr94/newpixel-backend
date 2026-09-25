// Top-up kode lama: node topup-key.js XXXX-XXXX-XXXX-XXXX 50
// Menambah quota key yang sudah ada (tidak menghapus sisa). Untuk pembeli repeat order.
const fs = require('fs');
const path = require('path');
const key = String(process.argv[2] || '').trim().toUpperCase();
const add = Math.min(10000, Math.max(1, Number(process.argv[3] || 50)));
if (!key) { console.log('Pakai: node topup-key.js KODE 50'); process.exit(1); }
const f = path.join(__dirname, 'keys.json');
let db = {};
try { db = JSON.parse(fs.readFileSync(f, 'utf8')); } catch {}
if (!db[key]) { console.log('Key tidak ketemu: ' + key); process.exit(1); }
db[key].quota = (db[key].quota || 0) + add;
fs.writeFileSync(f, JSON.stringify(db, null, 1));
console.log('OK: ' + key + ' + ' + add + 'x');
console.log('QUOTA: ' + db[key].quota + 'x | USED: ' + (db[key].used || 0) + 'x | SISA: ' + (db[key].quota - (db[key].used || 0)) + 'x');
