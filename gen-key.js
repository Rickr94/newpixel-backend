// Bikin kode lisensi manual: node gen-key.js 100 "nama-pembeli"
// Hasil: kunci format XXXX-XXXX-XXXX-XXXX + tersimpan di keys.json
const fs = require('fs');
const path = require('path');
const quota = Math.min(10000, Math.max(1, Number(process.argv[2] || 50)));
const note = String(process.argv.slice(3).join(' ') || '').slice(0, 80);
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
let key = '';
for (let i = 0; i < 16; i++) { key += chars[Math.floor(Math.random() * chars.length)]; if (i % 4 === 3 && i < 15) key += '-'; }
const f = path.join(__dirname, 'keys.json');
let db = {};
try { db = JSON.parse(fs.readFileSync(f, 'utf8')); } catch {}
db[key] = { quota, used: 0, note, created: new Date().toISOString().slice(0, 10) };
fs.writeFileSync(f, JSON.stringify(db, null, 1));
console.log('KEY: ' + key);
console.log('QUOTA: ' + quota + 'x | NOTE: ' + note);
console.log('Kirim key ini via WA. Cek: GET /key/check?key=' + encodeURIComponent(key));
