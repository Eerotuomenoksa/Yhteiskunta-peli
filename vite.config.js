import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite-projektin juuri on game/ (siellä on uusi index.html + main.jsx, Vite-buildin sisäänmenopiste).
// game/yhteiskunta.html (CDN + selain-Babel) säilyy koskemattomana rinnalla fallbackina niille jotka
// lataavat pelin koneelleen offline-käyttöön (ks. KEHITYSSUUNNITELMA_2026-07.md, kohta 5, riskitaulukko).
//
// outDir on tarkoituksella "../play" (ei "../dist"): "../play" on committoitu gitiin ja GitHub Pages
// (legacy "deploy from branch" -tila, ei erillistä Actions-julkaisua) tarjoilee sen suoraan osoitteesta
// /play/ — tämä on testaajien ensisijainen linkki (ks. KOULUSIMULAATIO.md, 13.7. löydös: CDN-fallback on
// 3,5-4x raskaampi kuin tämä bundle). Aja `npm run build` ja committoi play/-kansio joka kerta kun
// game/yhteiskunta.jsx tai data/tietolaatikot.mjs muuttuu, jotta julkaistu versio ei jää jälkeen.
export default defineConfig({
  root: "game",
  base: "./",
  plugins: [react()],
  build: {
    outDir: "../play",
    emptyOutDir: true,
  },
});
