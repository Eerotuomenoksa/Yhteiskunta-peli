#!/usr/bin/env node
// Varmistaa, että data/tietolaatikot.mjs (generoitu ES-moduuli) täsmää data/tietolaatikot.js:ään
// (lähde, klassinen <script>-versio). Ajaa generaattorin muistiin ja vertaa committoituun tiedostoon
// sen sijaan että kirjoittaisi levylle — CI ei siis muokkaa työhakemistoa, vain raportoi eron.
const fs = require("fs");
const path = require("path");
const { TIETOLAATIKOT, TIETOLAATIKKO_KATEGORIAT } = require("../data/tietolaatikot.js");

const expected = `// AUTOMAATTISESTI GENEROITU — ÄLÄ MUOKKAA SUORAAN.
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

const mjsPath = path.join(__dirname, "..", "data", "tietolaatikot.mjs");
const actual = fs.readFileSync(mjsPath, "utf8");

if (actual !== expected) {
  console.error("VIRHE: data/tietolaatikot.mjs ei täsmää data/tietolaatikot.js:ään.");
  console.error("Aja: node tools/build-tietolaatikot-esm.js ja committoi tulos.");
  process.exit(1);
}
console.log("OK: data/tietolaatikot.mjs on ajan tasalla data/tietolaatikot.js:n kanssa.");
