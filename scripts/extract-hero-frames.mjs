import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const ffmpeg = process.argv[2] || "ffmpeg";
const source = resolve(root, "public/videos/IMG_4218.MP4");
const output = resolve(root, "public/images/hero-sequence");
const fps = 24;

function run(args) {
  const result = spawnSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", "-i", source, ...args], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg exited with ${result.status}`);
}

for (const [variant, filter, quality] of [["desktop", "scale=1440:-2", 74], ["mobile", "crop=ih*9/16:ih,scale=576:-2", 74]]) {
  const directory = resolve(output, variant);
  mkdirSync(directory, { recursive: true });
  run(["-an", "-vf", `fps=${fps},${filter}`, "-c:v", "libwebp", "-quality", String(quality), "-compression_level", "4", resolve(directory, "frame-%04d.webp")]);
  console.log(`Extracted ${variant} frames.`);
}
run(["-frames:v", "1", "-vf", "scale=1440:-2", "-c:v", "libwebp", "-quality", "82", resolve(output, "poster.webp")]);
const frameCount = readdirSync(resolve(output, "desktop")).filter((name) => /^frame-\d{4}\.webp$/.test(name)).length;
const hash = createHash("sha256");
for (const variant of ["desktop", "mobile"]) {
  for (const name of readdirSync(resolve(output, variant)).sort()) hash.update(readFileSync(resolve(output, variant, name)));
}
hash.update(readFileSync(resolve(output, "poster.webp")));
const version = hash.digest("hex").slice(0, 16);
writeFileSync(resolve(root, "app/hero-sequence.json"), JSON.stringify({ frameCount, fps, source: "IMG_4218.MP4", version }, null, 2) + "\n");
console.log(`Hero sequence ready: ${frameCount} frames at ${fps} fps.`);
