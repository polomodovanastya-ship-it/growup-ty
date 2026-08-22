/**
 * Resize and compress images for web. Overwrites files in place.
 * Run: npm run optimize:images
 */
import { readdirSync, statSync, unlinkSync } from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");

type Job = {
  files: string[];
  maxWidth: number;
  quality?: number;
};

function collect(globPath: string): string[] {
  if (globPath.includes("*")) {
    const dir = path.dirname(globPath);
    const pattern = path.basename(globPath);
    const re = new RegExp("^" + pattern.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$");
    return readdirSync(path.join(ROOT, dir))
      .filter((name) => re.test(name))
      .map((name) => path.join(dir, name));
  }
  return [globPath];
}

const jobs: Job[] = [
  { files: collect("src/assets/anastasia.jpg"), maxWidth: 512, quality: 82 },
  { files: collect("src/assets/natalia.jpg"), maxWidth: 512, quality: 82 },
  { files: collect("src/assets/hero-teens.jpg"), maxWidth: 1200, quality: 82 },
  { files: collect("src/assets/who-helps-hero.jpg"), maxWidth: 960, quality: 82 },
  { files: collect("src/assets/three-stages-hero.jpg"), maxWidth: 1200, quality: 82 },
  { files: collect("src/assets/pod-*.jpg"), maxWidth: 512, quality: 80 },
  { files: collect("src/assets/emoji/*.png"), maxWidth: 128 },
  { files: collect("src/assets/logo.png"), maxWidth: 320 },
  { files: collect("public/og-image.png"), maxWidth: 1200 },
  { files: collect("public/favicon.png"), maxWidth: 256 },
];

async function optimize(file: string, maxWidth: number, quality = 82) {
  const abs = path.join(ROOT, file);
  const before = statSync(abs).size;

  const pipeline = sharp(abs).rotate().resize({
    width: maxWidth,
    height: maxWidth,
    fit: "inside",
    withoutEnlargement: true,
  });

  const ext = path.extname(file).toLowerCase();
  const tmp = abs + ".tmp";
  if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline.jpeg({ quality, mozjpeg: true }).toFile(tmp);
  } else if (ext === ".png") {
    await pipeline.png({ compressionLevel: 9, palette: true }).toFile(tmp);
  } else {
    return;
  }

  await sharp(tmp).toFile(abs);
  unlinkSync(tmp);

  const after = statSync(abs).size;
  const saved = before - after;
  const pct = before > 0 ? Math.round((saved / before) * 100) : 0;
  console.log(`${file}: ${fmt(before)} → ${fmt(after)} (−${pct}%)`);
}

function fmt(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

for (const job of jobs) {
  for (const file of job.files) {
    await optimize(file, job.maxWidth, job.quality);
  }
}

console.log("Done.");
