// scripts/generate-og.mjs — run with `node scripts/generate-og.mjs`
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#0F1417"/>
  <text x="100" y="100" font-family="'Hanken Grotesk', sans-serif" font-weight="500" font-size="16" letter-spacing="3" fill="#C7C5BE">CHARTERED ACCOUNTANTS &amp; ADVISORS · LONDON</text>
  <g transform="translate(100,310)">
    <text font-family="'Source Serif 4', 'Source Serif Pro', 'Times New Roman', serif" font-weight="300" font-size="220" letter-spacing="-5" fill="#EFEAE0">Staicha</text>
    <circle cx="855" cy="-12" r="18" fill="#C68A78"/>
  </g>
  <text x="100" y="420" font-family="'Source Serif 4', 'Source Serif Pro', serif" font-style="italic" font-weight="300" font-size="44" fill="#EFEAE0">Numbers, with conviction.</text>
  <line x1="100" y1="470" x2="220" y2="470" stroke="#C68A78" stroke-width="1.5"/>
  <text x="100" y="560" font-family="'Hanken Grotesk', sans-serif" font-weight="500" font-size="14" letter-spacing="3" fill="#8C9197">EST. MMXXVI · LONDON EC2</text>
</svg>
`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(join(outDir, "og-image.png"), png);
console.log("og-image.png written");

// Also write a 32x32 favicon
const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="#0F1417"/>
  <text x="8" y="46" font-family="'Source Serif 4', 'Times New Roman', serif" font-weight="300" font-size="44" letter-spacing="-1" fill="#EFEAE0">S</text>
  <circle cx="50" cy="42" r="5" fill="#C68A78"/>
</svg>
`;
const fav32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer();
writeFileSync(join(outDir, "favicon-32.png"), fav32);
console.log("favicon-32.png written");
