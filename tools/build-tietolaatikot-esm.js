#!/usr/bin/env node
// Generoi data/tietolaatikot.mjs (ES-moduuli, Viten käyttämä) data/tietolaatikot.js:stä (CJS/klassinen
// <script>-versio, game/yhteiskunta.html:n CDN-fallbackin käyttämä). Näin sisältö on yhdessä paikassa
// (data/tietolaatikot.js) eikä kaksi käsin ylläpidettyä kopiota voi ajautua erilleen — .mjs on aina
// mekaanisesti johdettu, ei koskaan käsin muokattu.
//
// Käyttö: node tools/build-tietolaatikot-esm.js
// CI (tools/check-data-sync.js) varmistaa, että committoitu .mjs täsmää tämän skriptin tuoretta ajoa vasten.
const fs = require("fs");
const path = require("path");
const { TIETOLAATIKOT, TIETOLAATIKKO_KATEGORIAT } = require("../data/tietolaatikot.js");

const outPath = path.join(__dirname, "..", "data", "tietolaatikot.mjs");
const out = `// AUTOMAATTISESTI GENEROITU — ÄLÄ MUOKKAA SUORAAN.
// Lähde: data/tietolaatikot.js. Muokkaa sitä tiedostoa ja aja: node tools/build-tietolaatikot-esm.js
// Tämä ES-moduuli on game/main.jsx:n (Vite-build) käyttämä versio. data/tietolaatikot.js pysyy
// klassisena <script>-yhteensopivana versiona game/yhteiskunta.html:n (CDN-fallback) vuoksi.

export const TIETOLAATIKOT = ${JSON.stringify(TIETOLAATIKOT, null, 2)};

export const TIETOLAATIKKO_KATEGORIAT = ${JSON.stringify(TIETOLAATIKKO_KATEGORIAT, null, 2)};

export function tietolaatikkoKentta(id, kentta, lang) {
  const item = TIETOLAATIKOT.find((t) => t.id === id);
  if (!item) return "";
  const arvo = item[kentta];
  if (!arvo) return "";
  return arvo[lang] !== undefined ? arvo[lang] : arvo.fi;
}
`;
fs.writeFileSync(outPath, out);
console.log("Kirjoitettu:", outPath);
