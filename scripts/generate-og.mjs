// scripts/generate-og.mjs — generate OG image + favicon
// Downloads the Source Serif 4 + Hanken Grotesk font files at run time so the
// rendered text matches the brand wordmark on any host. Cached locally in
// .cache/ to avoid re-downloading on subsequent runs.

import sharp from "sharp";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const outDir = join(projectRoot, "public");
const cacheDir = join(projectRoot, ".cache", "og-fonts");
mkdirSync(cacheDir, { recursive: true });

async function fetchFont(name, url) {
  const file = join(cacheDir, name);
  if (existsSync(file)) return readFileSync(file);
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(file, buf);
  return buf;
}

async function googleFontTtf(family, weight) {
  // Resolve the @font-face CSS to a .ttf URL via Google Fonts.
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await (await fetch(cssUrl, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
  if (!match) throw new Error(`could not resolve ${family} ${weight} ttf url`);
  return match[1];
}

const serifUrl = await googleFontTtf("Source Serif 4", 300);
const sansUrl = await googleFontTtf("Hanken Grotesk", 500);
const serif = (await fetchFont("source-serif-4-light.ttf", serifUrl)) ?? Buffer.alloc(0);
const sans = (await fetchFont("hanken-grotesk-medium.ttf", sansUrl)) ?? Buffer.alloc(0);
if (!serif.length || !sans.length) throw new Error("font download failed");

const serifB64 = serif.toString("base64");
const sansB64 = sans.toString("base64");

const fontFace = `
  <style>
    @font-face {
      font-family: "SS4";
      font-weight: 300;
      src: url(data:font/ttf;base64,${serifB64}) format("truetype");
    }
    @font-face {
      font-family: "HG";
      font-weight: 500;
      src: url(data:font/ttf;base64,${sansB64}) format("truetype");
    }
  </style>
`;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  ${fontFace}
  <rect width="1200" height="630" fill="#0F1417"/>
  <text x="100" y="100" font-family="HG" font-weight="500" font-size="16" letter-spacing="3" fill="#C7C5BE">CHARTERED ACCOUNTANTS &amp; ADVISORS · LONDON</text>
  <g transform="translate(100,310)">
    <text font-family="SS4" font-weight="300" font-size="220" letter-spacing="-5" fill="#EFEAE0">Staicha</text>
    <circle cx="855" cy="-12" r="18" fill="#C68A78"/>
  </g>
  <text x="100" y="420" font-family="SS4" font-style="italic" font-weight="300" font-size="44" fill="#EFEAE0">Numbers, with conviction.</text>
  <line x1="100" y1="470" x2="220" y2="470" stroke="#C68A78" stroke-width="1.5"/>
  <text x="100" y="560" font-family="HG" font-weight="500" font-size="14" letter-spacing="3" fill="#8C9197">EST. MMXXVI · LONDON EC2</text>
</svg>
`;

const png = await sharp(Buffer.from(ogSvg)).png().toBuffer();
writeFileSync(join(outDir, "og-image.png"), png);
console.log("og-image.png written");

const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  ${fontFace}
  <rect width="64" height="64" fill="#0F1417"/>
  <text x="8" y="46" font-family="SS4" font-weight="300" font-size="44" letter-spacing="-1" fill="#EFEAE0">S</text>
  <circle cx="50" cy="42" r="5" fill="#C68A78"/>
</svg>
`;
const fav32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer();
writeFileSync(join(outDir, "favicon-32.png"), fav32);
console.log("favicon-32.png written");
