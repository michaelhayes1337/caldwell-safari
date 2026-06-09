// One-off: download original images from the existing Wix CDN for curation.
// Usage: node scripts/fetch-images.mjs
import { mkdir, writeFile } from "node:fs/promises";

const OUT = "raw-images";
const BASE = "https://static.wixstatic.com/media/";

// Unique media IDs gathered from the live site (home, about, prices, galleries).
const ids = [
  "285f53_9e4c577ff3c34938a8245e314e65040a~mv2.png", // logo
  "285f53_e5d99a8fb0f34c06986842cd6fcb11c7~mv2.jpg",
  "285f53_671f6073c04e4a2aadc70d78f7d95291~mv2.jpg",
  "285f53_3b79cab9c1ba472cbf89253241a1f200~mv2.jpg",
  "285f53_21e87a92f464440483f8cad0469c5c59~mv2.jpg",
  "285f53_72ed3121668c469bab3f7b7a5249c101~mv2.webp",
  "285f53_0197229333854e5aafe6c27247be3601~mv2.webp",
  "285f53_40ed891a69864080b4ac27c629b38ed5~mv2.jpg",
  "285f53_6fd5ee28922d4ee3aaed403ecf120253~mv2.jpg",
  "285f53_656ce496e95a42078eda99080672bcfd~mv2.jpg",
  "285f53_b1a52b96b9fa430a8601dd34095c498f~mv2.jpg",
  "285f53_955fb253ed1a4289a7585db870005560~mv2.jpg",
  "285f53_23338b44cc2f4efc819b99bb65a7c30e~mv2.jpg",
  "285f53_21c9e93914644c32b6391ba7523d9305~mv2.jpg",
  "285f53_040d61106e8a4264ad1907f879d11c35~mv2.jpg",
  "285f53_13368e51d49f4a2ca2cf2476fa1a6b0a~mv2.jpg",
  "285f53_d8392630e1b24499a25536973500eb55~mv2.jpg",
  "285f53_6a55e4b696474ddb9dc66fb9f622af52~mv2.jpg",
  "285f53_1ee960edc2604396990f537f6dd19212~mv2.jpg",
  "285f53_dd16bac511344d428b90ba265ccc68c5~mv2.jpg",
];

await mkdir(OUT, { recursive: true });
let ok = 0;
for (const id of ids) {
  const url = BASE + id;
  const name = id.replace("~mv2", "").replace("285f53_", "");
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) { console.error(`FAIL ${res.status}  ${name}`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(`${OUT}/${name}`, buf);
    console.log(`ok  ${name}  (${(buf.length / 1024).toFixed(0)} KB)`);
    ok++;
  } catch (e) {
    console.error(`ERR ${name}: ${e.message}`);
  }
}
console.log(`\nDownloaded ${ok}/${ids.length} → ${OUT}/`);
