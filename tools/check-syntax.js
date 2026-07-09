#!/usr/bin/env node
// Tarkistaa, että pelin JSX-lähdekoodi ja yhteiskunta.html:n sisäänrakennettu Babel-skripti
// ovat syntaktisesti eheitä. Ajetaan CI:ssä (.github/workflows/ci.yml) ja voi ajaa myös
// paikallisesti: `node tools/check-syntax.js`
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "yhteiskunta-check-"));
const q = (s) => '"' + String(s).replace(/"/g, '\\"') + '"';

function esbuildCheck(filePath, label) {
  const outFile = path.join(tmpDir, path.basename(filePath) + ".out.js");
  const cmd = "npx --yes esbuild " + q(filePath) + " --outfile=" + q(outFile) + " --bundle=false";
  execSync(cmd, { stdio: "inherit" });
  console.log("OK:", label);
}

function extractHtmlScript(htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const start = html.indexOf('<script type="text/babel"');
  if (start === -1) throw new Error("Babel-scriptiä ei löytynyt tiedostosta " + htmlPath);
  const startTagEnd = html.indexOf(">", start) + 1;
  const end = html.indexOf("</script>", startTagEnd);
  const script = html.slice(startTagEnd, end);
  const outPath = path.join(tmpDir, path.basename(htmlPath) + ".extracted.jsx");
  fs.writeFileSync(outPath, script);
  return outPath;
}

try {
  esbuildCheck(path.join(root, "game", "yhteiskunta.jsx"), "game/yhteiskunta.jsx");
  const extracted = extractHtmlScript(path.join(root, "game", "yhteiskunta.html"));
  esbuildCheck(extracted, "game/yhteiskunta.html (sisäänrakennettu skripti)");
  console.log("\nKaikki syntaksitarkistukset läpäisty.");
} catch (err) {
  console.error("\nSyntaksitarkistus epäonnistui:", err.message);
  process.exit(1);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
