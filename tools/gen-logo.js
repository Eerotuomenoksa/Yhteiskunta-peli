// Generoi "Vuosirenkaat" (Growth Rings) -logon SVG:nä assets/-kansioon.
// Deterministinen (seedattu satunnaisuus) — uudelleenajo antaa aina saman tuloksen,
// joten muutokset näkyvät siistinä diffinä versionhallinnassa.
// Käyttö: node tools/gen-logo.js
const fs = require("fs");
const path = require("path");

// ---- Seedattu PRNG (mulberry32) ----
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(19260817);

// ---- Väripaletti (jaettu sivuston kanssa: kulta #c9a227, luu #e9e2cf, yösininen #0c1828) ----
const NAVY = "#0c1828";
const STOPS = [
  { t: 0, color: [0xa8, 0x5f, 0x1f] },    // okra (vanhin / keskus)
  { t: 0.45, color: [0xc9, 0xa2, 0x27] }, // kulta-ambra (sivuston oma aksenttiväri)
  { t: 1, color: [0xec, 0xe4, 0xd0] },    // vaalea luu (uusin / reuna)
];
function lerp(a, b, t) { return a + (b - a) * t; }
function colorAt(t) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i], b = STOPS[i + 1];
    if (t >= a.t && t <= b.t) {
      const lt = (t - a.t) / (b.t - a.t);
      const c = a.color.map((v, k) => Math.round(lerp(v, b.color[k], lt)));
      return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
    }
  }
  return "#" + STOPS[STOPS.length - 1].color.map((v) => v.toString(16).padStart(2, "0")).join("");
}

const CX = 500, CY = 500;
const R_MIN = 34, R_MAX = 452;
const N_RINGS = 24;
const DOTS_MIN = 7, DOTS_MAX = 72;
const DOT_R_INNER = 4.4, DOT_R_OUTER = 3.0;

function buildRings() {
  let svg = "";
  for (let i = 0; i < N_RINGS; i++) {
    const t = i / (N_RINGS - 1); // 0 (sisin) -> 1 (uloin)
    const radius = lerp(R_MIN, R_MAX, t) + (rand() - 0.5) * 2.2; // hivenen vaihtelua rengassäteessä
    const nDots = Math.round(lerp(DOTS_MIN, DOTS_MAX, Math.pow(t, 0.92)));
    const dotR = lerp(DOT_R_INNER, DOT_R_OUTER, t);
    const color = colorAt(t);
    const guideOpacity = lerp(0.16, 0.34, t);

    // Ohut ohjainympyrä (rata), jota pitkin pisteet asettuvat
    svg += `  <circle cx="${CX}" cy="${CY}" r="${radius.toFixed(2)}" fill="none" stroke="#ece4d0" stroke-opacity="${guideOpacity.toFixed(3)}" stroke-width="1"/>\n`;

    const angleJitterBase = rand() * Math.PI * 2; // koko renkaan pyöritys, jotta pisteet eivät ole aina samassa vaiheessa
    for (let d = 0; d < nDots; d++) {
      const baseAngle = (d / nDots) * Math.PI * 2 + angleJitterBase;
      const angleJitter = (rand() - 0.5) * (Math.PI * 2 / nDots) * 0.5; // pieni epäsäännöllisyys, max puolet pistevälistä
      const radiusJitter = (rand() - 0.5) * (2.5 + t * 3);
      const angle = baseAngle + angleJitter;
      const r = radius + radiusJitter;
      const x = CX + Math.cos(angle) * r;
      const y = CY + Math.sin(angle) * r;
      const opacity = lerp(0.55, 0.95, rand() * 0.3 + 0.7 * t + 0.3 * (1 - t));
      svg += `  <circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${dotR.toFixed(2)}" fill="${color}" fill-opacity="${Math.min(1, opacity).toFixed(2)}"/>\n`;
    }
  }
  return svg;
}

function buildCenter() {
  return (
    `  <circle cx="${CX}" cy="${CY}" r="17" fill="none" stroke="#ece4d0" stroke-opacity="0.55" stroke-width="1.5"/>\n` +
    `  <circle cx="${CX}" cy="${CY}" r="9" fill="${colorAt(0.12)}"/>\n`
  );
}

const ringsMarkup = buildRings();
const centerMarkup = buildCenter();

// ---- 1) Pelkkä merkki (favicon / pieni käyttö, 1:1) ----
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <rect x="0" y="0" width="1000" height="1000" fill="${NAVY}"/>
${ringsMarkup}${centerMarkup}</svg>
`;

// ---- 2) Täysi lockup (merkki + sanamerkki + iskulause, muotokuva) ----
const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1220" width="1000" height="1220">
  <rect x="0" y="0" width="1000" height="1220" fill="${NAVY}"/>
${ringsMarkup}${centerMarkup}
  <text x="500" y="1030" text-anchor="middle" font-family="'IBM Plex Mono',ui-monospace,Consolas,monospace" font-size="54" font-weight="400" letter-spacing="22" fill="#ece4d0">YHTEISKUNTA</text>
  <line x1="400" y1="1072" x2="600" y2="1072" stroke="#c9a227" stroke-width="1.5"/>
  <text x="500" y="1108" text-anchor="middle" font-family="'IBM Plex Mono',ui-monospace,Consolas,monospace" font-size="19" font-weight="400" letter-spacing="8" fill="#93a3ba">KYL&#196;ST&#196; KANSAKUNNAKSI</text>
</svg>
`;

const outDir = path.join(__dirname, "..", "assets");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "logo-mark.svg"), markSvg);
fs.writeFileSync(path.join(outDir, "logo-full.svg"), fullSvg);
console.log("Kirjoitettu:", outDir);
