import { readdir, writeFile } from "node:fs/promises";
import sharp from "sharp";
const IN = "raw-images";
const files = (await readdir(IN)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();
const cols = 5, tw = 320, th = 214;
const rows = Math.ceil(files.length / cols);
const W = cols * tw, H = rows * th;
const composites = [];
const map = [];
for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const col = i % cols, row = Math.floor(i / cols);
  const left = col * tw, top = row * th;
  const buf = await sharp(`${IN}/${f}`).resize(tw, th, { fit: "cover" }).jpeg({ quality: 72 }).toBuffer();
  composites.push({ input: buf, left, top });
  const label = `${i}`;
  const svg = Buffer.from(
    `<svg width="${tw}" height="${th}" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="34" height="26" rx="5" fill="#2a2520" opacity="0.85"/>
      <text x="21" y="23" font-family="Arial" font-size="18" fill="#c9a66b" text-anchor="middle" font-weight="bold">${label}</text>
    </svg>`);
  composites.push({ input: svg, left, top });
  map.push(`${i} -> ${f}`);
}
await sharp({ create: { width: W, height: H, channels: 3, background: "#1c1a17" } })
  .composite(composites).jpeg({ quality: 76 }).toFile("raw-images/_contact-sheet.jpg");
console.log(map.join("\n"));
console.log(`\nsheet ${W}x${H}`);
