import { mkdir, readdir } from "node:fs/promises";
import sharp from "sharp";
const IN = "raw-images", OUT = "raw-images/thumbs";
await mkdir(OUT, { recursive: true });
const files = (await readdir(IN)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
for (const f of files) {
  try {
    const meta = await sharp(`${IN}/${f}`).metadata();
    await sharp(`${IN}/${f}`).resize(360, 360, { fit: "inside" }).jpeg({ quality: 70 })
      .toFile(`${OUT}/${f.replace(/\.\w+$/, ".jpg")}`);
    console.log(`${f}\t${meta.width}x${meta.height}`);
  } catch (e) { console.error(f, e.message); }
}
