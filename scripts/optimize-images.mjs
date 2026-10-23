import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Hero frames have their own encoder and versioned cache; leave that directory alone.
const directory = new URL("../public/images/", import.meta.url);
const manifestUrl = new URL("./image-optimization.json", import.meta.url);
const check = process.argv.includes("--check");
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
let previous = {};
try {
  previous = JSON.parse(await readFile(manifestUrl, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const manifest = {};
let missing = false;
for (const name of (await readdir(directory)).sort()) {
  if (!/\.(webp|jpe?g)$/i.test(name)) continue;
  const url = new URL(name, directory);
  const input = await readFile(url);
  if (previous[name]?.sha256 === hash(input)) {
    manifest[name] = previous[name];
    continue;
  }
  if (check) {
    console.error(`Image needs optimization: ${name}`);
    missing = true;
    continue;
  }

  const metadata = await sharp(input).metadata();
  const pipeline = sharp(input).rotate().resize({
    width: 1600, height: 1600, fit: "inside", withoutEnlargement: true,
  });
  const candidate = await (/\.webp$/i.test(name)
    ? pipeline.webp({ quality: metadata.hasAlpha ? 85 : 76, alphaQuality: 100, effort: 6 })
    : pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true })
  ).toBuffer();
  // Never replace an asset with a larger encoding.
  const output = candidate.length < input.length ? candidate : input;
  const result = await sharp(output).metadata();
  if (output !== input) await writeFile(url, output);
  manifest[name] = {
    sha256: hash(output), originalBytes: input.length, optimizedBytes: output.length,
    width: result.width, height: result.height,
  };
  console.log(`${name}: ${input.length} -> ${output.length} bytes`);
}

if (missing) process.exitCode = 1;
else {
  if (!check) await writeFile(manifestUrl, JSON.stringify(manifest, null, 2) + "\n");
  const entries = Object.values(manifest);
  const before = entries.reduce((total, entry) => total + entry.originalBytes, 0);
  const after = entries.reduce((total, entry) => total + entry.optimizedBytes, 0);
  console.log(`${entries.length} images verified; ${before} -> ${after} bytes (${before ? ((1 - after / before) * 100).toFixed(1) : 0}% smaller).`);
  console.log(`Manifest: ${fileURLToPath(manifestUrl)}`);
}
