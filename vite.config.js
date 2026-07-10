import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite-projektin juuri on game/ (siellä on uusi index.html + main.jsx, Vite-buildin sisäänmenopiste).
// game/yhteiskunta.html (CDN + selain-Babel) säilyy koskemattomana rinnalla fallbackina, kunnes
// tämä bundle on todettu vakaaksi (ks. KEHITYSSUUNNITELMA_2026-07.md, kohta 5, riskitaulukko).
export default defineConfig({
  root: "game",
  base: "./",
  plugins: [react()],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
